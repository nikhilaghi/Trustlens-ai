import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  ChevronDown,
  Video,
  Mic,
  Image,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { DEMO_SCENARIOS, ANALYSIS_PIPELINE_STEPS } from '../data/mockData';

type Signal = {
  id: number;
  signalType: 'critical' | 'warning' | 'success' | 'info';
  category: string;
  title: string;
  description: string;
  confidence: number;
};

type AIResult = {
  score: number;
  confidence: number;
  riskLevel: string;
  verdict: string;
  summary: string;
  signals: Signal[];
  recommendation: string[];
};

const SIGNAL_STYLES: Record<Signal['signalType'], { bg: string; border: string; iconBg: string; iconColor: string; icon: typeof CheckCircle2 }> = {
  critical: { bg: 'bg-red-50', border: 'border-red-100', iconBg: 'bg-red-100', iconColor: 'text-red-600', icon: XCircle },
  warning: { bg: 'bg-amber-50', border: 'border-amber-100', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', icon: AlertTriangle },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-100', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', icon: CheckCircle2 },
  info: { bg: 'bg-blue-50', border: 'border-blue-100', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', icon: Info },
};

function RiskBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'Critical' } :
    score >= 60 ? { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', label: 'High Risk' } :
    score >= 30 ? { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: 'Medium' } :
    { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'Low' };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-[13px] ${color.bg} ${color.text} ${color.border}`}>
      Score: <span className="text-[16px]">{score}</span>/100 — {color.label}
    </span>
  );
}

function SignalCard({ signal }: { signal: Signal }) {
  const style = SIGNAL_STYLES[signal.signalType];
  const IconComponent = style.icon;

  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className={`flex gap-3 p-4 rounded-xl border ${style.bg} ${style.border}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${style.iconBg}`}>
        <IconComponent size={16} className={style.iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-[13px] font-bold text-slate-800">{signal.title}</h4>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/70 text-slate-600 whitespace-nowrap ml-2">
            {signal.confidence}% conf.
          </span>
        </div>
        <p className="text-[12.5px] text-slate-600 leading-relaxed">{signal.description}</p>
        <span className="inline-block mt-2 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">{signal.category}</span>
      </div>
    </motion.div>
  );
}

function PipelineAnimation({ running, currentStep }: { running: boolean; currentStep: number }) {
  return (
    <AnimatePresence mode="wait">
      {!running ? null : (
        <motion.div key="pipeline" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="bg-gradient-to-br from-[#0F172A] to-slate-800 rounded-2xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Loader2 size={16} className="text-blue-400 animate-spin" />
              <span className="text-[13px] font-bold text-white">AI Analysis Pipeline</span>
            </div>
            <span className="text-[11px] text-slate-400">Step {Math.min(currentStep + 1, ANALYSIS_PIPELINE_STEPS.length)} / {ANALYSIS_PIPELINE_STEPS.length}</span>
          </div>
          <div className="space-y-2.5 mb-4">
            {ANALYSIS_PIPELINE_STEPS.map((step, idx) => {
              const isComplete = idx <= currentStep - 1;
              const isCurrent = idx === currentStep;
              return (
                <motion.div key={step.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: isComplete || isCurrent ? 1 : 0.35, x: 0 }} transition={{ delay: idx * 0.04 }} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isComplete ? 'bg-emerald-500/10 border border-emerald-500/20' : isCurrent ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-slate-800/40 border border-slate-700/20'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isComplete ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500' : 'bg-slate-700'}`}>
                    {isComplete ? <CheckCircle2 size={14} className="text-white" /> : isCurrent ? <Loader2 size={14} className="text-white animate-spin" /> : <span className="text-sm">{step.icon}</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[12.5px] font-medium ${isComplete ? 'text-emerald-300' : isCurrent ? 'text-white' : 'text-slate-500'}`}>{step.label}</span>
                    <p className={`text-[11px] ${isComplete ? 'text-emerald-400/60' : 'text-slate-600'}`}>{step.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-400" animate={{ width: `${((currentStep + 1) / ANALYSIS_PIPELINE_STEPS.length) * 100}%` }} transition={{ duration: 0.25 }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DetectionEngine() {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);
  const [inputText, setInputText] = useState('');
  const [uploads, setUploads] = useState({ video: false, audio: false, image: false });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentPipelineStep, setCurrentPipelineStep] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [error, setError] = useState('');

  const scenario = DEMO_SCENARIOS[selectedScenarioIdx];
  const content = inputText.trim() || scenario.fullContent;

  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIdx(idx);
    setInputText('');
    setShowResult(false);
    setAiResult(null);
    setError('');
    setDropdownOpen(false);
  };

  const handleAnalyze = async () => {
    if (isAnalyzing) return;
    setShowResult(false);
    setAiResult(null);
    setError('');
    setIsAnalyzing(true);
    setCurrentPipelineStep(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentPipelineStep(Math.min(step, ANALYSIS_PIPELINE_STEPS.length - 1));
    }, 450);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.details || data?.error || 'AI analysis failed');

      setAiResult(data);
      setCurrentPipelineStep(ANALYSIS_PIPELINE_STEPS.length - 1);
      await new Promise(resolve => setTimeout(resolve, 350));
      setShowResult(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not connect to the AI backend.');
    } finally {
      clearInterval(interval);
      setIsAnalyzing(false);
      setCurrentPipelineStep(-1);
    }
  };

  const result = aiResult;
  const score = result?.score ?? 0;
  const riskLevel = result?.riskLevel ?? 'UNKNOWN';

  return (
    <section id="detection" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full mb-5">
            <Play size={12} className="text-orange-600" />
            <span className="text-[11px] font-semibold text-orange-700 uppercase tracking-widest">Interactive Demo</span>
          </div>
          <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-3">Detection Engine</h2>
          <p className="text-[16px] text-slate-500 max-w-2xl">
            Explore how TrustLens AI analyzes suspicious communications using realistic demo scenarios. Select a scenario and run an AI analysis to see explainable risk results.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-5 gap-7">
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Demo Scenario</label>
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full flex items-center justify-between px-4 py-3.5 bg-white border border-slate-200 rounded-xl text-left hover:border-slate-300 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base flex-shrink-0">{scenario.typeIndicator}</span>
                    <div className="min-w-0"><p className="text-[13px] font-semibold text-slate-800 truncate">{scenario.label}</p><p className="text-[11px] text-slate-400 truncate">{scenario.category}</p></div>
                  </div>
                  <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }} className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden">
                      {DEMO_SCENARIOS.map((s, i) => (
                        <button key={s.id} onClick={() => handleScenarioChange(i)} className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors ${i === selectedScenarioIdx ? 'bg-blue-50' : ''} ${i < DEMO_SCENARIOS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                          <span>{s.typeIndicator}</span><div className="min-w-0"><p className="text-[13px] font-semibold text-slate-800 truncate">{s.label}</p><p className="text-[11px] text-slate-400">{s.category}</p></div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Communication Content (Demo)</label>
              <textarea value={inputText || scenario.fullContent} onChange={e => setInputText(e.target.value)} className="w-full min-h-[280px] resize-y bg-white border border-slate-200 rounded-xl p-4 text-[12.5px] leading-relaxed text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100" />
            </div>

            <div className="bg-slate-50/60 border border-slate-200 rounded-2xl p-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Optional Evidence</label>
              <div className="grid grid-cols-3 gap-3">
                {([['video', 'Video', Video], ['audio', 'Audio', Mic], ['image', 'Image', Image]] as const).map(([key, label, Icon]) => (
                  <label key={key} className="cursor-pointer flex flex-col items-center gap-2 px-3 py-4 bg-white border border-dashed border-slate-200 rounded-xl hover:border-blue-300 transition-colors">
                    <input type="file" className="hidden" accept={key === 'video' ? 'video/*' : key === 'audio' ? 'audio/*' : 'image/*'} onChange={() => setUploads(prev => ({ ...prev, [key]: true }))} />
                    <Icon size={18} className={uploads[key] ? 'text-[#2563EB]' : 'text-slate-400'} />
                    <span className={`text-[11px] font-semibold text-center ${uploads[key] ? 'text-[#2563EB]' : 'text-slate-400'}`}>{uploads[key] ? '✓ Added' : label}</span>
                  </label>
                ))}
              </div>
            </div>

            <motion.button onClick={handleAnalyze} disabled={isAnalyzing} className={`w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-[14px] shadow-lg transition-all duration-200 ${isAnalyzing ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#0F172A] text-white hover:bg-[#1E293B] hover:-translate-y-0.5 hover:shadow-xl'}`} whileHover={!isAnalyzing ? { scale: 1.01 } : undefined} whileTap={!isAnalyzing ? { scale: 0.99 } : undefined}>
              {isAnalyzing ? <><Loader2 size={17} className="animate-spin" /> Analyzing with Gemini...</> : <><Play size={17} /> Run AI Analysis</>}
            </motion.button>
            {error && <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-[12px] leading-relaxed"><strong>AI backend error:</strong> {error}</div>}
          </div>

          <div className="xl:col-span-3 space-y-5 min-h-[500px]">
            <PipelineAnimation running={isAnalyzing} currentStep={currentPipelineStep} />

            {!isAnalyzing && !showResult && (
              <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-14 flex flex-col items-center justify-center text-center min-h-[350px]">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mb-5 shadow-sm"><Shield size={26} className="text-slate-300" /></div>
                <h3 className="text-[17px] font-bold text-slate-600 mb-2">Ready for AI Analysis</h3>
                <p className="text-[13px] text-slate-400 max-w-sm">Select a demo scenario and run AI analysis to evaluate the communication with Gemini and see distinct explainable risk signals.</p>
              </div>
            )}

            <AnimatePresence>
              {showResult && result && (
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-5">
                  <div className={`${score >= 70 ? 'bg-red-50 border-red-200' : score >= 30 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'} border-2 rounded-2xl p-6`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2"><span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-black/5 rounded-md">AI Result</span></div>
                        <h3 className="text-xl font-bold text-[#0F172A]">{scenario.label}</h3>
                        <p className="text-[13px] text-slate-500 mt-1">{scenario.category} · Gemini AI Analysis</p>
                      </div>
                      <RiskBadge score={score} />
                    </div>
                    <p className="text-[13px] text-slate-600 leading-relaxed mb-5">{result.summary}</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[{ label: 'AI Confidence', value: `${result.confidence}%` }, { label: 'Verdict', value: result.verdict, highlight: true }, { label: 'Risk Level', value: riskLevel }].map(({ label, value, highlight }) => (
                        <div key={label} className="bg-white/70 rounded-xl p-3 border border-white/50">
                          <div className="text-[10.5px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">{label}</div>
                          <div className={`text-[14px] font-bold ${highlight ? 'text-[#0F172A]' : 'text-slate-700'}`}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-5"><Info size={16} className="text-[#2563EB]" /><h4 className="text-[14px] font-bold text-[#0F172A]">Explainable AI — Detection Signals</h4><span className="ml-auto text-[10px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md">Live AI Output</span></div>
                    <div className="space-y-3">{result.signals.map(signal => <SignalCard key={signal.id} signal={signal} />)}</div>
                  </div>

                  <div className="bg-[#0F172A] rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2"><Shield size={16} className="text-amber-400" /><h4 className="text-[14px] font-bold text-white">AI Recommendation</h4></div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-white/10 text-slate-400 rounded-md">Gemini Guidance</span>
                    </div>
                    <ul className="space-y-3 mb-5">{result.recommendation.map((action, actionIdx) => (<motion.li key={actionIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + actionIdx * 0.08 }} className="flex items-start gap-3"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" /><span className="text-[13px] text-slate-200 leading-relaxed">{action}</span></motion.li>))}</ul>
                    <div className="pt-4 border-t border-white/10"><p className="text-[11.5px] text-slate-500 italic leading-relaxed">AI-generated assessment. External registry, identity and cryptographic checks are separate TrustLens components and are not implied by this language analysis.</p></div>
                    <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap gap-3">
                      <a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[12px] text-blue-400 hover:text-blue-300 hover:underline underline-offset-4 transition-all font-medium"><ExternalLink size={12} />Report to SEBI SCORES (External)</a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}