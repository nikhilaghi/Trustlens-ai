import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const apiKeys = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
].filter(Boolean);

const MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';

if (!apiKeys.length) {
  console.error('❌ No Gemini API keys found in .env');
  process.exit(1);
}

console.log(`🔑 Loaded ${apiKeys.length} Gemini API key(s)`);
console.log(`🤖 Gemini model: ${MODEL}`);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'TrustLens AI Backend', model: MODEL });
});

const responseSchema = {
  type: 'OBJECT',
  properties: {
    score: {
      type: 'INTEGER',
      description: 'Fraud risk score from 0 to 100. 0 is lowest risk and 100 is highest risk.',
    },
    confidence: {
      type: 'INTEGER',
      description: 'Model confidence from 0 to 100 for the risk assessment.',
    },
    riskLevel: {
      type: 'STRING',
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    },
    verdict: {
      type: 'STRING',
      enum: ['PROCEED', 'VERIFY FURTHER', 'DO NOT ACT'],
    },
    summary: {
      type: 'STRING',
      description: 'One concise explanation of why the message received this assessment.',
    },
    signals: {
      type: 'ARRAY',
      minItems: 3,
      maxItems: 5,
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          description: { type: 'STRING' },
          category: { type: 'STRING' },
          severity: { type: 'STRING', enum: ['critical', 'warning', 'success', 'info'] },
          confidence: { type: 'INTEGER' },
        },
        required: ['title', 'description', 'category', 'severity', 'confidence'],
      },
    },
    recommendation: {
      type: 'ARRAY',
      minItems: 2,
      maxItems: 5,
      items: { type: 'STRING' },
    },
  },
  required: ['score', 'confidence', 'riskLevel', 'verdict', 'summary', 'signals', 'recommendation'],
};

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, Number(n) || 0));
}

function normaliseResult(raw) {
  const score = clamp(raw.score, 0, 100);
  const confidence = clamp(raw.confidence, 0, 100);
  const riskLevel = String(raw.riskLevel || 'MEDIUM').toUpperCase();

  const verdictMap = {
    LOW: 'PROCEED',
    MEDIUM: 'VERIFY FURTHER',
    HIGH: 'DO NOT ACT',
    CRITICAL: 'DO NOT ACT',
  };

  const signals = Array.isArray(raw.signals) ? raw.signals.slice(0, 5).map((s, i) => ({
    id: i + 1,
    signalType: ['critical', 'warning', 'success', 'info'].includes(s.severity) ? s.severity : (riskLevel === 'CRITICAL' || riskLevel === 'HIGH' ? 'critical' : 'warning'),
    category: String(s.category || 'AI Risk Analysis'),
    title: String(s.title || 'Risk indicator detected'),
    description: String(s.description || 'The AI identified a potentially relevant risk indicator in the submitted communication.'),
    confidence: clamp(s.confidence, 0, 100),
  })) : [];

  return {
    score,
    confidence,
    riskLevel,
    verdict: ['PROCEED', 'VERIFY FURTHER', 'DO NOT ACT'].includes(raw.verdict) ? raw.verdict : verdictMap[riskLevel],
    summary: String(raw.summary || 'The AI identified risk indicators in the submitted communication.'),
    signals,
    recommendation: Array.isArray(raw.recommendation) ? raw.recommendation.slice(0, 5).map(String) : [],
  };
}

function buildPrompt(message) {
  return `You are the fraud-analysis intelligence layer for TrustLens AI, a prototype designed to help investors identify suspicious financial communications.

Analyze ONLY the submitted communication. Do not claim that you performed a live SEBI, NSE, BSE, domain-registration, certificate, biometric, cryptographic, or external database lookup unless the evidence is explicitly present in the text itself. Treat claims inside the message as claims, not verified facts.

Return a structured risk assessment. The score represents FRAUD RISK, not trustworthiness: 0 = very low risk, 100 = extremely high risk.

Use these guidelines:
- LOW: ordinary communication with little evidence of fraud.
- MEDIUM: some suspicious elements; user should verify independently.
- HIGH: multiple strong fraud indicators.
- CRITICAL: severe combination of impersonation, payment pressure, credential theft, guaranteed returns, fake regulatory claims, suspicious links, or similar indicators.
- Confidence should reflect how strongly the text supports the assessment, not certainty that a real-world crime occurred.
- Produce 3 to 5 DISTINCT signals. Never repeat the same idea.
- Keep each signal concise and evidence-based.
- Recommendations must be practical and conservative.

Communication to analyze:
---
${message}
---`;
}

async function callGemini(apiKey, message) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const body = {
    contents: [{ role: 'user', parts: [{ text: buildPrompt(message) }] }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const err = new Error(data?.error?.message || `Gemini API error ${response.status}`);
    err.status = response.status;
    throw err;
  }

  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
  if (!text) throw new Error('Gemini returned an empty response.');

  return JSON.parse(text);
}

app.post('/api/analyze', async (req, res) => {
  try {
    const message = String(req.body?.message || '').trim();

    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    let lastError = null;

    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const raw = await callGemini(apiKeys[i], message);
        const result = normaliseResult(raw);

        console.log(`✅ Gemini analysis succeeded with key ${i + 1}: ${result.riskLevel} / ${result.score}`);
        return res.json(result);
      } catch (error) {
        lastError = error;
        console.error(`⚠️ Gemini key ${i + 1} failed: ${error.message}`);

        // Rotate through keys for quota/rate-limit/auth/model errors.
        if (![400, 401, 403, 404, 429, 500, 503].includes(error.status)) break;
      }
    }

    return res.status(502).json({
      error: 'AI analysis failed',
      details: lastError?.message || 'Unknown Gemini API error',
    });
  } catch (error) {
    console.error('❌ Analysis route error:', error);
    return res.status(500).json({ error: 'AI analysis failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 TrustLens backend running on http://localhost:${PORT}`);
});
