// ============================================================
// TrustLens AI — Prototype Demo Data
// ============================================================
// All data shown is SAMPLE / DEMO content for prototype demonstration.
// No real communications or institutions are represented.
// ============================================================

export const DEMO_SCENARIOS = [
  {
    id: 'deepfake-ceo',
    label: 'Deepfake CEO Video — Emergency Fund Transfer',
    category: 'Synthetic Media Fraud',
    difficulty: 'Advanced',
    riskLevel: 'High Risk',
    riskScore: 87,
    confidenceScore: 96,
    typeIndicator: '🎭 Deepfake',
    previewText:
      '[VIDEO MESSAGE — Duration: 2:14]\n\nFrom: "Rahul Sharma, CEO, Axis Capital"\nSubject: URGENT — Immediate Wire Transfer Required\n\nHello team, reaching out urgently from Singapore. We have a time-sensitive acquisition deal that requires an immediate wire transfer of ₹4.2 crore to the account below before market close today.\n\nDue to compliance reasons, please keep this confidential...',
    fullContent: `[VIDEO MESSAGE — Simulated Demo Content]
═════════════════════════════════════════
DURATION:    2 min 14 sec
FORMAT:      MP4 (H.264)
RESOLUTION:  1080x1920 (portrait)
METADATA:    Injected (demo)
───────────────────────────────────────────

SENDER DISPLAY:     "Rahul Sharma, CEO"
COMPANY CLAIMED:    Axis Capital
TIME SENT:          July 14, 2026 at 09:18 IST
URGENCY LEVEL:      CRITICAL
═════════════════════════════════════════

"Hello team,

I'm reaching out urgently from Singapore. 
We have a time-sensitive acquisition deal that
requires an immediate wire transfer of ₹4.2 crore
to the following account BEFORE MARKET CLOSE today.

⚠ Due to compliance reasons, please keep this
  confidential and do NOT discuss with colleagues.
  
  The transfer must be completed within 2 hours.

BANK:         HDFC Bank
ACCOUNT NO:   50100XXXXXXXX (masked)
IFSC CODE:    HDFC0001234
ACC HOLDER:   Global Tech Ventures Pvt Ltd

This is authorized at the highest level.
Please proceed immediately and confirm via WhatsApp.

— Rahul Sharma
  Chief Executive Officer
  Axis Capital"`,

    detectionSignals: [
      {
        id: 1,
        signalType: 'critical',
        category: 'Face Biometrics',
        title: 'Facial Movement Anomalies Detected',
        description:
          'GAN-based deepfake artifacts identified in facial micro-expressions. Eye blink pattern irregularity score: 78/100. Lip sync alignment deviation: 12ms.',
        confidence: 91,
      },
      {
        id: 2,
        signalType: 'critical',
        category: 'Voice Analysis',
        title: 'Voice Cloning Artifacts Found',
        description:
          'Audio spectrum analysis indicates synthetic voice origin. Voice biometric mismatch against claimed identity\'s known voiceprint. Spectral inconsistency in high-frequency range.',
        confidence: 94,
      },
      {
        id: 3,
        signalType: 'critical',
        category: 'Metadata Forensics',
        title: 'Metadata Inconsistency Detected',
        description:
          'Video creation timestamp shows file created 6 days ago. EXIF data indicates editing software used: "DeepEdit Pro v4". Timestamps manipulated.',
        confidence: 88,
      },
      {
        id: 4,
        signalType: 'warning',
        category: 'NLP - Language Analysis',
        title: 'Scam Language Patterns Matched',
        description:
          '14 semantic fraud indicators detected including: urgency markers (5), secrecy requests (3), authority impersonation (2), unusual payment instruction format (4).',
        confidence: 97,
      },
      {
        id: 5,
        signalType: 'warning',
        category: 'Registry Lookup',
        title: 'Verification Registry: No Match',
        description:
          'Communication hash not found in SEBI Verification Registry. No digitally signed record exists for this communication ID.',
        confidence: 100,
      },
      {
        id: 6,
        signalType: 'critical',
        category: 'Behavioral Red Flag',
        title: 'Urgency + Secrecy Pattern',
        description:
          'Classic social engineering pattern: high urgency request combined with confidentiality demand and direct bank transfer instruction via unofficial channel.',
        confidence: 99,
      },
    ],

    recommendation: {
      verdict: 'DO NOT PROCEED WITH PAYMENT',
      actions: [
        'Do NOT transfer any funds based on this communication.',
        'Verify the alleged sender through official company contact channels listed on their verified website.',
        'Contact your compliance officer immediately.',
        'Preserve the original video file as evidence for potential investigation.',
        'Report to SEBI SCORES portal if you received this message directly.',
        'Optionally report to Cyber Crime Portal (cybercrime.gov.in) as a potential fraud attempt.',
      ],
      escalationNote:
        'This simulated result demonstrates how TrustLens AI would flag a deepfake CEO fraud scenario. In production, additional verification steps would be available.',
    },

    trustBreakdown: {
      overallScore: 13,
      components: [
        { label: 'Digital Signature', status: 'missing', weight: 20, score: 0, note: 'No signature present' },
        { label: 'Registry Match', status: 'not_found', weight: 25, score: 0, note: 'Not in registry' },
        { label: 'Communication Authenticity', status: 'failed', weight: 20, score: 1, note: 'Synthetic content' },
        { label: 'Domain Reputation', status: 'unknown', weight: 15, score: 8, note: 'Not applicable' },
        { label: 'Language Analysis', status: 'risky', weight: 15, score: 2, note: 'Fraud patterns' },
        { label: 'Sender Verification', status: 'failed', weight: 5, score: 2, note: 'Impersonation detected' },
      ],
    },
  },

  {
    id: 'fake-ipo-whatsapp',
    label: 'Fake IPO WhatsApp Forward — "Reliance Fintech"',
    category: 'Investment Fraud',
    difficulty: 'Intermediate',
    riskLevel: 'Critical Risk',
    riskScore: 94,
    confidenceScore: 98,
    typeIndicator: '📱 Investment Scam',
    previewText:
      '📈 EXCLUSIVE IPO ALERT 🚨\n\n*RELIANCE FINTECH IPO — LIMITED SLOTS*\n\nDear Valued Investor,\n\nWe are pleased to inform you about an exclusive pre-IPO opportunity...',
    fullContent: `╔════════════════════════════════════════════╗
║     WHATSAPP FORWARD (Simulated Demo)       ║
║     Forward Chain Depth: 847 forwards        ║
╚════════════════════════════════════════════╝

📈 EXCLUSIVE IPO ALERT 🚨

★ RELIANCE FINTECH IPO — LIMITED SLOTS ★

Dear Valued Investor,

We are pleased to inform you about an EXCLUSIVE
pre-IPO opportunity in Reliance Fintech Ltd.

This offering is available ONLY to select investors
before the public issue opens.

┌─────────────────────────────────────────────┐
│ INVESTMENT DETAILS                          │
├─────────────────────────────────────────────┤
│ • Minimum Investment:     ₹50,000           │
│ • Expected Listing Gain:   120–180% ✨       │
│ • Apply Before:            6 PM TODAY ⏰     │
│ • Allocation Basis:        First come first │
└─────────────────────────────────────────────┘

🔗 Apply NOW: www.reliance-fintech-ipo.co.in
📞 Call: +91-9XXXXXXXXX

✅ This offer is SEBI registered!
   Certificate No: SEBI/XXX/2026 ⚡️

⚠️ Limited slots only! Act now before it's gone!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Message forwarded 847 times]`,

    detectionSignals: [
      {
        id: 1,
        signalType: 'critical',
        category: 'Domain Intelligence',
        title: 'Suspicious Domain Detected',
        description:
          'Domain reliance-fintech-ipo.co.in was registered 6 days ago. Not affiliated with Reliance Industries Ltd. Uses similar-sounding name for brand spoofing.',
        confidence: 100,
      },
      {
        id: 2,
        signalType: 'critical',
        category: 'Regulatory Validation',
        title: 'Fake SEBI Certificate Number',
        description:
          'Certificate number "SEBI/XXX/2026" does not match any issued certificate format in SEBI database. Format invalid. No registration match.',
        confidence: 99,
      },
      {
        id: 3,
        signalType: 'critical',
        category: 'Network Analysis',
        title: 'WhatsApp Forward Chain Detected',
        description:
          'Message shows 847 forwarding hops. Exponential spread pattern consistent with viral scam campaigns. Forward chain visualization available.',
        confidence: 96,
      },
      {
        id: 4,
        signalType: 'warning',
        category: 'NLP - Financial Claims',
        title: 'Guaranteed Returns Claim',
        description:
          '"Expected Listing Gain: 120–180%" constitutes guaranteed return promise. Explicitly prohibited under SEBI(ICA) Regulations, 2019 Clause 7A.',
        confidence: 95,
      },
      {
        id: 5,
        signalType: 'warning',
        category: 'Urgency Tactics',
        title: 'Time Pressure Indicators',
        description:
          'Multiple urgency triggers: "TODAY", "Before market close", "Limited slots", "Act now". Classic psychological manipulation technique.',
        confidence: 92,
      },
      {
        id: 6,
        signalType: 'warning',
        category: 'Brand Impersonation',
        title: 'Unauthorized Brand Usage',
        description:
          'Uses "Reliance" name without authorization. DRHP filing check: No document filed with SEBI for "Reliance Fintech Ltd" IPO.',
        confidence: 98,
      },
    ],

    recommendation: {
      verdict: 'DO NOT INVEST — CONFIRMED SCAM PATTERN',
      actions: [
        'Do NOT transfer funds or share personal details.',
        'Verify ALL IPO offerings on SEBI official website (sebi.gov.in).',
        'Check NSE/BSE IPO pages for legitimate current issues.',
        'Report to SEBI SCORES immediately: scores.sebi.gov.in',
        'Warn family members who may have received this forward.',
        'Contact ACTUAL broker/advisory firm to verify if they communicated.',
      ],
      escalationNote:
        'This is a SIMULATED demonstration using a constructed example. The domain, phone number, and company name are fictional for demo purposes only.',
    },

    trustBreakdown: {
      overallScore: 6,
      components: [
        { label: 'Digital Signature', status: 'missing', weight: 20, score: 0, note: 'No signature' },
        { label: 'Registry Match', status: 'not_found', weight: 25, score: 0, note: 'Fake cert no.' },
        { label: 'Communication Authenticity', status: 'failed', weight: 20, score: 0, note: 'Spoofed brand' },
        { label: 'Domain Reputation', status: 'malicious', weight: 15, score: 0, note: 'New/suspicious' },
        { label: 'Language Analysis', status: 'risky', weight: 15, score: 4, note: 'Guaranteed returns' },
        { label: 'Sender Verification', status: 'failed', weight: 5, score: 2, note: 'Unregistered' },
      ],
    },
  },

  {
    id: 'verified-broker-email',
    label: 'Verified Broker Email — Monthly Portfolio Statement',
    category: 'Legitimate Communication',
    difficulty: 'Verification Test',
    riskLevel: 'Low Risk',
    riskScore: 9,
    confidenceScore: 99,
    typeIndicator: '✅ Verified',
    previewText:
      'From: noreply@zerodha.com\nSubject: Your Monthly Portfolio Statement — June 2026\nDKIM: PASS | SPF: PASS | DMARC: PASS\n[Digitally signed communication]',
    fullContent: `╔═════════════════════════════════════════════════╗
║     EMAIL (Simulated Verified Content)         ║
╚═════════════════════════════════════════════════╝

FROM:         noreply@zerodha.com
TO:           investor@example.com
SUBJECT:      Monthly Portfolio Statement — June 2026
DATE SENT:    July 1, 2026 at 09:00 IST

── EMAIL AUTHENTICATION ──────────────────────────
DKIM Signature:    ✓ PASS (s=202406; d=zerodha.com)
SPF Check:         ✓ PASS (ip=203.50.22.xxxx)
DMARC Policy:      ✓ PASS (p=reject)
TLS Connection:    ✓ TLS 1.3 Encrypted
──────────────────────────────────────────────────

Dear Investor,

Please find attached your consolidated portfolio
statement for June 2026.

┌──────────────────────────────────────────────┐
│         PORTFOLIO SUMMARY                    │
├──────────────────────────────────────────────┤
│ Total Holdings Value:      ₹12,45,820.00     │
│ Monthly P&L:               +₹34,210 (+2.82%) │
│ XIRR (1 Year):             18.4%             │
│ Active Holdings:           23 securities     │
└──────────────────────────────────────────────┘

This is an automated statement generated by
Zerodha Broking Ltd systems.

For queries, contact support@zerodha.com
or call our helpline: 080-40402020

── DIGITAL SIGNATURE ──────────────────────────
Verification URL:  trustlens.sebi.gov.in/verify/
                  ZRD-2026-0701-44521
Hash: SHA256: a3f2...9c4d [VERIFIED ✓]

────────────────────────────────────────────────
Zerodha Broking Ltd | SEBI Reg: INZ000031633
NSE Member: 90112 | BSE Member: 6390
Registered Office:
153/154, 4th Cross, Dollars Colony,
Bengaluru – 560094, India`,

    detectionSignals: [
      {
        id: 1,
        signalType: 'success',
        category: 'Email Authentication',
        title: 'DKIM/SPF/DMARC All Passed',
        description:
          'Complete email authentication chain verified. DKIM signed by zerodha.com key, SPF authorized sending IP matches DMARC policy enforced.',
        confidence: 99,
      },
      {
        id: 2,
        signalType: 'success',
        category: 'Registry Validation',
        title: 'SEBI Broker Registration Confirmed',
        description:
          'Registration number INZ000031633 verified active in SEBI Intermediary Database. Certificate valid until March 2029.',
        confidence: 100,
      },
      {
        id: 3,
        signalType: 'success',
        category: 'Digital Signature',
        title: 'Digital Signature Valid',
        description:
          'SHA-256 hash matched exactly against SEBI Verification Registry entry ZRD-2026-0701-44521. Signature algorithm: ECDSA P-256. Certificate chain valid.',
        confidence: 100,
      },
      {
        id: 4,
        signalType: 'success',
        category: 'Domain Intelligence',
        title: 'Established Legitimate Domain',
        description:
          'Domain zerodha.com registered since August 2010. SSL certificate from DigiCert valid until December 2026. DNSSEC enabled. Clean reputation history.',
        confidence: 100,
      },
      {
        id: 5,
        signalType: 'success',
        category: 'Content Analysis',
        title: 'No Risk Patterns Detected',
        description:
          'NLP analysis passed all safety checks. No urgency language, no suspicious links, no attachment of uncharacteristic type. Professional tone consistent with legitimate broker communication.',
        confidence: 99,
      },
      {
        id: 6,
        signalType: 'info',
        category: 'General',
        title: 'Standard Broker Communication',
        description:
          'This represents a typical monthly portfolio statement from a SEBI-registered stock broker. Format, content, and authentication align with industry best practices.',
        confidence: 95,
      },
    ],

    recommendation: {
      verdict: 'SAFE TO PROCEED — VERIFIED COMMUNICATION',
      actions: [
        'This communication appears fully authentic and safe to act upon.',
        'The digital signature has been cryptographically verified.',
        'Portfolio information can be trusted for record-keeping purposes.',
        'For future verification, always use TrustLens AI or the official registry URL provided.',
      ],
      escalationNote:
        'This simulation demonstrates verification of a properly authenticated, digitally-signed broker email. The content shown is fabricated for demonstration purposes.',
    },

    trustBreakdown: {
      overallScore: 93,
      components: [
        { label: 'Digital Signature', status: 'valid', weight: 20, score: 20, note: 'Verified' },
        { label: 'Registry Match', status: 'found', weight: 25, score: 25, note: 'Active reg.' },
        { label: 'Communication Authenticity', status: 'confirmed', weight: 20, score: 19, note: 'All auth checks pass' },
        { label: 'Domain Reputation', status: 'excellent', weight: 15, score: 15, note: 'Est. 2010, clean' },
        { label: 'Language Analysis', status: 'safe', weight: 15, score: 10, note: 'No red flags' },
        { label: 'Sender Verification', status: 'verified', weight: 5, score: 4, note: 'Known entity' },
      ],
    },
  },

  {
    id: 'fake-advisory-website',
    label: 'Fake Advisory Website — "Sharma Capital Advisory"',
    category: 'Investment Fraud',
    difficulty: 'Basic Detection',
    riskLevel: 'High Risk',
    riskScore: 81,
    confidenceScore: 92,
    typeIndicator: '🌐 Fake Website',
    previewText:
      'Website: sharma-capital-advisory.in\nClaimed Services: SEBI Registered Investment Advisory\n⚠ Red Flags: Unregistered entity, fake testimonials, guaranteed returns promises',
    fullContent: `╔═════════════════════════════════════════════════╗
║     WEBSITE CONTENT (Simulated Demo)          ║
║     URL: sharma-capital-advisory.in            ║
╚═════════════════════════════════════════════════╝

━━━ SHARMA CAPITAL ADVISORY ━━━

★★★ INDIA'S #1 ADVISORY SERVICE ★★★
SEBI REGISTERED | 15+ YEARS EXPERIENCE

"Double your money in just 3 months!"
— Our Guarantee to You!

┌─────────────────────────────────────────────┐
│ OUR SERVICES                                │
├─────────────────────────────────────────────┤
│ ✦ Stock Tips                     ₹999/mo    │
│ ✦ Option Calls                   ₹2999/mo   │
│ ✦ Portfolio Management    ₹49,999/quart    │
│ ✦ Insider News Alerts              FREE    │
│ ✦ Guaranteed Returns Service   ₹99,999     │
└─────────────────────────────────────────────┘

━━ WHAT OUR CLIENTS SAY ━━
⭐⭐⭐⭐⭐ Rakesh ji — "Made ₹10L in 2 months!"
⭐⭐⭐⭐⭐ Priya — "Best advisory ever!"
⭐⭐⭐⭐⭐ Amit — "Life changing tips!"

REGISTER NOW → [WhatsApp Button]
Limited slots! Offer expires tonight.

── WEBSITE TECHNICAL INFO ─────────────────────
SSL Certificate:  Self-signed (UNTRUSTED)
Domain Created:    July 8, 2026 (5 days ago)
Registrar:         CheapDomain Inc. (overseas)
Server Location:   Unknown (VPN/proxy likely)`,

    detectionSignals: [
      {
        id: 1,
        signalType: 'critical',
        category: 'Regulatory Compliance',
        title: 'No Valid SEBI Registration',
        description:
          'Claims "SEBI Registered" but no matching registration found in SEBI IA/RA database. Registration numbers displayed do not exist in system.',
        confidence: 99,
      },
      {
        id: 2,
        signalType: 'critical',
        category: 'Security Indicators',
        title: 'Self-Signed SSL Certificate',
        description:
          'Website uses self-signed SSL certificate. Certificate issuer: "Test CA". Browsers would show security warning. Indicates unprofessional setup.',
        confidence: 100,
      },
      {
        id: 3,
        signalType: 'critical',
        category: 'Financial Promises',
        title: 'Guaranteed Returns Promise',
        description:
          'Multiple explicit return guarantees found: "Double your money", "Guaranteed Returns Service". Direct violation of SEBI Investment Adviser regulations.',
        confidence: 97,
      },
      {
        id: 4,
        signalType: 'warning',
        category: 'Testimonial Analysis',
        title: 'Suspected Fabricated Testimonials',
        description:
          'Generic names ("Rakesh ji", "Priya", "Amit") with unrealistic returns. Review timestamps cluster unnaturally. Typical fake testimonial pattern.',
        confidence: 89,
      },
      {
        id: 5,
        signalType: 'warning',
        category: 'Domain Analysis',
        title: 'Recently Registered Suspicious Domain',
        description:
          'Domain registered 5 days ago. Overseas registrar. Likely disposable domain ready to abandon after collecting payments. Whois privacy enabled.',
        confidence: 95,
      },
      {
        id: 6,
        signalType: 'info',
        category: 'Pattern Recognition',
        title: 'Classic Advisory Scam Template',
        description:
          'Matches known investment advisory fraud template: excessive emojis, urgent call-to-action, multiple pricing tiers, "limited time" pressure, WhatsApp contact only.',
        confidence: 94,
      },
    ],

    recommendation: {
      verdict: 'AVOID ENTIRELY — CONFIRMED FAKE ADVISORY',
      actions: [
        'Do NOT engage with this website or make any payments.',
        'Verify any advisor at: sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&isSearched=true',
        'If you have already paid, contact your bank for chargeback/dispute.',
        'File complaint on SEBI SCORES portal.',
        'Screenshot evidence preservation recommended.',
      ],
      escalationNote:
        'Simulated example for demonstration. Company name and website URL are fictional constructs representing common scam patterns observed in Indian financial fraud landscape.',
    },

    trustBreakdown: {
      overallScore: 11,
      components: [
        { label: 'Digital Signature', status: 'missing', weight: 20, score: 0, note: 'None present' },
        { label: 'Registry Match', status: 'not_found', weight: 25, score: 0, note: 'Not registered' },
        { label: 'Communication Authenticity', status: 'failed', weight: 20, score: 1, note: 'Fake claims' },
        { label: 'Domain Reputation', status: 'malicious', weight: 15, score: 2, note: 'New, risky TLD' },
        { label: 'Language Analysis', status: 'risky', weight: 15, score: 5, note: 'Gross violations' },
        { label: 'Sender Verification', status: 'failed', weight: 5, score: 3, note: 'Unknown entity' },
      ],
    },
  },

  {
    id: 'sample-investor-sms',
    label: 'Sample Investor SMS — Suspicious Update Request',
    category: 'Phishing Attempt',
    difficulty: 'Targeted Attack',
    riskLevel: 'Medium-High Risk',
    riskScore: 68,
    confidenceScore: 88,
    typeIndicator: '💬 SMS Phishing',
    previewText:
      'Your demat account requires immediate KYC update. Click link within 24 hours to avoid suspension. NSDL: https://nsdl-update.info/kyc?ref=XXXXX',
    fullContent: `╔════════════════════════════════════════════╗
║        SMS (Simulated Demo Content)          ║
╚════════════════════════════════════════════╝

From: NSDL-UPI (simulated sender)
Date:  July 14, 2026, 08:32 AM

━━ MESSAGE BODY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 IMPORTANT: YOUR ACCOUNT ACTION REQUIRED 🚨

Dear Investor,

Your demat account linked with PAN ABCDE1234F
has been flagged for KYC non-compliance.

Account Status: SUSPENDED (partial)

You must update your details within 24 HOURS
to avoid FULL account suspension.

👉 Update here: https://nsdl-update.info/kyc
                     ?ref=A1B2C3D4E5F6

- OR -

Reply YES to receive call from executive.
Charges may apply.

NSDL Depository Ltd.
Do not reply to this SMS.`,

    detectionSignals: [
      {
        id: 1,
        signalType: 'warning',
        category: 'URL Analysis',
        title: 'Non-Governmental URL Used',
        description:
          'URL nsdl-update.info uses .info TLD (commonly associated with spam/scams). Actual NSDL domains end with .gov.in or .co.in.',
        confidence: 85,
      },
      {
        id: 2,
        signalType: 'warning',
        category: 'Impersonation',
        title: 'Organization Name Misused',
        description:
          'Uses "NSDL" branding but sender ID and URL are not from actual NSDL infrastructure. Brand spoofing indicator.',
        confidence: 90,
      },
      {
        id: 3,
        signalType: 'warning',
        category: 'Social Engineering',
        title: 'Threat-Based Urgency',
        description:
          'Uses account suspension threat to create panic. 24-hour deadline creates artificial urgency. Classic phishing tactic.',
        confidence: 92,
      },
      {
        id: 4,
        signalType: 'info',
        category: 'Data Handling',
        title: 'PAN Information Exposure',
        description:
          'SMS includes partial PAN reference. While commonly included in legitimate communications, combined with other signals increases suspicion.',
        confidence: 75,
      },
      {
        id: 5,
        signalType: 'info',
        category: 'General',
        title: 'Moderate Confidence — Recommend Caution',
        description:
          'While several indicators are concerning, definitive proof of malicious intent is lower than previous examples. Classification leans towards "proceed with caution" rather than absolute rejection.',
        confidence: 80,
      },
    ],

    recommendation: {
      verdict: 'PROCEED WITH EXTREME CAUTION — LIKELY PHISHING',
      actions: [
        'Do NOT click the provided URL link.',
        'Visit NSDL official website directly (nsdl.co.in) and navigate to KYC section manually.',
        'Call NSDL customer care using number from their official website (NOT from this SMS).',
        'Forward SMS to 7726 (telecom scam reporting).',
        'Notify your DP (depository participant) about receiving suspicious SMS.',
      ],
      escalationNote:
        'SMS phishing is increasingly sophisticated. Always access financial websites through typed URLs or saved bookmarks, never through links in messages.',
    },

    trustBreakdown: {
      overallScore: 31,
      components: [
        { label: 'Digital Signature', status: 'na', weight: 20, score: 10, note: 'SMS format' },
        { label: 'Registry Match', status: 'unknown', weight: 25, score: 10, note: 'Cannot verify' },
        { label: 'Communication Authenticity', status: 'suspicious', weight: 20, score: 3, note: 'Spoofing signs' },
        { label: 'Domain Reputation', status: 'poor', weight: 15, score: 2, note: '.info TLD' },
        { label: 'Language Analysis', status: 'moderate_risk', weight: 15, score: 4, note: 'Urgency tactics' },
        { label: 'Sender Verification', status: 'unverified', weight: 5, score: 2, note: 'Cannot validate' },
      ],
    },
  },
];

export const VERIFICATION_EXAMPLES = [
  {
    id: 'sebi-circular-sample',
    label: 'Sample SEBI Circular',
    type: 'Regulatory Document',
    urlOrId: 'commid:SEBI-2026-0714-84321',
    expectedStatus: 'authentic',
    metadata: {
      signedBy: 'Securities and Exchange Board of India',
      issuerCode: 'SEBI/HO/MIRSD',
      issueDate: 'July 14, 2026',
      communicationId: 'SEBI-2026-0714-84321',
      subject: 'Circular on Enhanced KYC Requirements for Retail Investors',
      documentCategory: 'Regulatory Circular',
      referenceNumber: 'SEBI/HO/MIRSD/2026/0098',
    },
    signatureDetails: {
      algorithm: 'ECDSA P-256',
      hashAlgorithm: 'SHA-256',
      hashValue: 'a3f2c8d4e1b7f9a0c5d8e2f4b6a1c3d7e5f8b9a2d4c6e8f0a1b3d5e7f9c2b4',
      signatureValid: true,
      certChain: ['India Root CA 2020', 'SEBI Issuing CA 2024'],
      expiryStatus: 'VALID until Dec 2030',
      trustAnchor: 'SEBI PKI Infrastructure',
    },
    registryMatch: true,
    registryTimestamp: '2026-07-14T08:30:00+05:30',
    displayLabel: '(Prototype Example)',
  },
  {
    id: 'broker-statement-sample',
    label: 'Sample Broker Statement',
    type: 'Intermediary Document',
    urlOrId: 'commid:ZRD-2026-0701-44521',
    expectedStatus: 'authentic',
    metadata: {
      signedBy: 'Zerodha Broking Ltd',
      issuerCode: 'INZ000031633',
      issueDate: 'July 1, 2026',
      communicationId: 'ZRD-2026-0701-44521',
      subject: 'Monthly Portfolio Statement — June 2026',
      documentCategory: 'Broker Communication',
      referenceNumber: 'ZRD-MS-JUN2026-A44521',
    },
    signatureDetails: {
      algorithm: 'RSA-2048',
      hashAlgorithm: 'SHA-256',
      hashValue: 'b4e7a1d3c5f8e2b9a0d4c7f1e6a3b5d8f0e2c4a7b9d1f3e5c8a0b2d4f7e9c1a3',
      signatureValid: true,
      certChain: ['India Root CA 2020', 'Intermediary CA 2024', 'Zerodha Cert 2025'],
      expiryStatus: 'VALID until Aug 2027',
      trustAnchor: 'SEBI Intermediary PKI',
    },
    registryMatch: true,
    registryTimestamp: '2026-07-01T09:05:00+05:30',
    displayLabel: '(Prototype Example)',
  },
  {
    id: 'mf-notice-sample',
    label: 'Example Mutual Fund Notice',
    type: 'Fund Communication',
    urlOrId: 'commid:HDF-MF-2026-0620-N1234',
    expectedStatus: 'authentic',
    metadata: {
      signedBy: 'HDFC Mutual Fund',
      issuerCode: 'AMFI-registered',
      issueDate: 'June 20, 2026',
      communicationId: 'HDF-MF-2026-0620-N1234',
      subject: 'Notice: Change in Fund Manager — HDFC Equity Opportunities Fund',
      documentCategory: 'AMC Notice',
      referenceNumber: 'MFN/2026/HEOF/0620/N1234',
    },
    signatureDetails: {
      algorithm: 'ECDSA P-256',
      hashAlgorithm: 'SHA-256',
      hashValue: 'c5d8f0a2e4b7c1d3f6a9e0b5c8d2f4a7e0b3c6d9f2a5e8b1c4d7f0a3e6b9c2d5f8',
      signatureValid: true,
      certChain: ['India Root CA 2020', 'AMFI CA 2025'],
      expiryStatus: 'VALID until Mar 2028',
      trustAnchor: 'AMFI PKI Infrastructure',
    },
    registryMatch: true,
    registryTimestamp: '2026-06-20T11:15:00+05:30',
    displayLabel: '(Prototype Example)',
  },
  {
    id: 'fake-investment-site',
    label: 'Fake Website Example',
    type: 'Unverified Source',
    urlOrId: 'https://sharma-capital-advisory.in/invest',
    expectedStatus: 'unverified',
    reasonForFailure: 'Communication does not exist in any official verification registry',
    additionalFindings: [
      'Domain registered: 8 days ago',
      'No SEBI registration found',
      'Self-signed SSL certificate',
      'Overseas registrar, privacy-enabled WHOIS',
      'Multiple fraudulent indicators detected in content analysis',
    ],
    displayLabel: '(Prototype Example)',
  },
];

export const ANALYSIS_HISTORY = [
  {
    id: 'ANALYSIS-001',
    timestamp: 'July 14, 2026 — 09:48 AM',
    scenarioName: 'Deepfake CEO Video',
    category: 'Synthetic Media Fraud',
    result: 'HIGH RISK',
    riskScore: 87,
    confidence: 96,
    recommendation: 'Payment Blocked — Escalated',
  },
  {
    id: 'ANALYSIS-002',
    timestamp: 'July 14, 2026 — 09:35 AM',
    scenarioName: 'Fake IPO WhatsApp Forward',
    category: 'Investment Fraud',
    result: 'CRITICAL RISK',
    riskScore: 94,
    confidence: 98,
    recommendation: 'Scam Alert — Report Generated',
  },
  {
    id: 'ANALYSIS-003',
    timestamp: 'July 14, 2026 — 09:18 AM',
    scenarioName: 'Verified Broker Email',
    category: 'Legitimate Communication',
    result: 'TRUSTED',
    riskScore: 9,
    confidence: 99,
    recommendation: 'Safe to Process',
  },
  {
    id: 'ANALYSIS-004',
    timestamp: 'July 13, 2026 — 04:22 PM',
    scenarioName: 'Fake Advisory Website',
    category: 'Investment Fraud',
    result: 'HIGH RISK',
    riskScore: 81,
    confidence: 92,
    recommendation: 'Block & Report Recommended',
  },
  {
    id: 'ANALYSIS-005',
    timestamp: 'July 13, 2026 — 02:15 PM',
    scenarioName: 'Sample Investor SMS',
    category: 'Phishing Attempt',
    result: 'CAUTION REQUIRED',
    riskScore: 68,
    confidence: 88,
    recommendation: 'Manual Verification Needed',
  },
];

const ANALYSIS_PIPELINE_STEPS = [
  { id: 1, label: 'Uploading Evidence', icon: '📤', detail: 'Secure transmission to analysis environment' },
  { id: 2, label: 'Extracting Metadata', icon: '🔍', detail: 'EXIF, headers, timestamps, digital signatures' },
  { id: 3, label: 'Scanning Deepfake Artifacts', icon: '👤', detail: 'GAN artifacts, facial inconsistencies, synthetic media detection' },
  { id: 4, label: 'Running Voice Analysis', icon: '🎙', detail: 'Voice cloning detection, spectral analysis, speaker verification' },
  { id: 5, label: 'Analyzing Language & Semantics', icon: '📝', detail: 'NLP fraud pattern recognition, sentiment analysis, context evaluation' },
  { id: 6, label: 'Detecting Phishing Indicators', icon: '🎣', detail: 'URL analysis, domain intelligence, credential harvesting detection' },
  { id: 7, label: 'Querying Verification Registry', icon: '🗄', detail: 'SEBI Registry lookup, digital signature verification, hash matching' },
  { id: 8, label: 'Computing Composite Trust Score', icon: '📊', detail: 'Multi-signal aggregation, weighted scoring, explainable output' },
  { id: 9, label: 'Generating Explainable Report', icon: '📋', detail: 'Signal breakdown, reasoning chain, actionable recommendations' },
  { id: 10, label: 'Creating Recommendation Package', icon: '✅', detail: 'Verdict, next steps, escalation paths, evidence bundle' },
];

export { ANALYSIS_PIPELINE_STEPS };

export const PLATFORM_CAPABILITIES = [
  {
    icon: '🛡',
    title: 'Detection Engine',
    subtitle: 'Multimodal AI Analysis',
    description:
      'Analyzes video, audio, images, text, URLs, and documents using specialized AI models for each modality. Detects deepfakes, voice clones, phishing templates, and fraud language patterns.',
    features: [
      'Deepfake video detection',
      'Voice cloning identification',
      'Document forgery scanning',
      'Image manipulation detection',
      'Phishing URL intelligence',
      'Fraud language analysis',
    ],
  },
  {
    icon: '🗂',
    title: 'Verification Registry',
    subtitle: 'Cryptographic Authentication',
    description:
      'Cross-references communications against a registry of digitally signed records from SEBI, exchanges, depositories, and registered intermediaries using cryptographic verification.',
    features: [
      'Digital signature validation',
      'SHA-256 hash verification',
      'PKI certificate chain checking',
      'SEBI intermediary lookup',
      'Communication timestamping',
      'Issuer identity confirmation',
    ],
  },
  {
    icon: '🧠',
    title: 'Explainable AI (XAI)',
    subtitle: 'Transparent Decision-Making',
    description:
      'Every classification includes a complete reasoning chain showing which signals contributed to the decision and why. Understand the "why" behind every verdict.',
    features: [
      'Per-signal confidence scores',
      'Visual signal dashboard',
      'Weighted scoring transparency',
      'Audit trail generation',
      'Compliance-ready reports',
      'Regulatory explanation mode',
    ],
  },
  {
    icon: '📊',
    title: 'Trust Score System',
    subtitle: 'Composite Assessment',
    description:
      'Aggregates multiple verification signals into a single easy-to-understand trust score (0-100) with detailed component breakdown showing what contributed to the final assessment.',
    features: [
      '6-factor scoring model',
      'Real-time score calculation',
      'Historical trend tracking',
      'Benchmark comparison',
      'Custom threshold configuration',
      'Automated alert triggering',
    ],
  },
  {
    icon: '⚠️',
    title: 'Supported Fraud Types',
    subtitle: 'Comprehensive Coverage',
    description:
      'Designed to detect the most prevalent fraud types targeting Indian retail and institutional investors across digital channels.',
    types: [
      { name: 'CEO/CFO Deepfake Video', severity: 'High' },
      { name: 'Voice Clone Impersonation', severity: 'High' },
      { name: 'Fake IPO / Pre-IPO Offers', severity: 'Critical' },
      { name: 'Investment Advisory Scams', severity: 'Critical' },
      { name: 'Broker Impersonation Email', severity: 'High' },
      { name: 'KYC / Account Phishing', severity: 'Medium' },
      { name: 'Stock Tip Fraud (WhatsApp)', severity: 'High' },
      { name: 'Ponzi / Guaranteed Return Schemes', severity: 'Critical' },
      { name: 'Malicious Trading Apps', severity: 'High' },
      { name: 'Certificate / License Forgery', severity: 'Medium' },
    ],
  },
  {
    icon: '🔮',
    title: 'Future Integrations',
    subtitle: 'Planned Expansions',
    description:
      'The following integrations represent planned capabilities once regulatory approvals and technical partnerships are established. Shown here for roadmap visibility.',
    scope: [
      { integration: 'SEBI APIs', status: 'Pending Approval', detail: 'Direct API connectivity to SEBI databases' },
      { integration: 'NSE Feed Integration', status: 'In Discussion', detail: 'Real-time corporate action data feed' },
      { integration: 'BSE Announcements', status: 'In Discussion', detail: 'Automated circular ingestion pipeline' },
      { integration: 'Browser Extension', status: 'Planned', detail: 'Real-time page-level fraud detection' },
      { integration: 'Mobile SDK', status: 'Planned', detail: 'In-app message verification for brokers' },
      { integration: 'Email Gateway Plugin', status: 'Planned', detail: 'Enterprise email server integration' },
      { integration: 'WhatsApp Business API', status: 'Concept Stage', detail: 'Incoming message pre-screening' },
    ],
  },
];
