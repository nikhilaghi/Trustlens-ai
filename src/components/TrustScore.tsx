import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, Shield, Building2, Globe, FileText, ChevronDown } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/mockData';

const ENTITIES = [
  { name: 'Zerodha Broking Ltd', regNum: 'INZ000031633', type: 'SEBI-Registered Stock Broker', scenarioIdx: 2 },
  { name: 'Unknown Entity (Impersonated)', regNum: 'NOT REGISTERED', type: 'Impersonated CEO', scenarioIdx: 0 },
  { name: 'Reliance Fintech Spoof', regNum: 'NO VALID REGISTRATION', type: 'Fake IPO Promoter', scenarioIdx: 1 },
];

function getScoreColor(s: number) {
  return s >= 70 ? '#16A34A' : s >= 40 ? '#F59E0B' : '#DC2626';
}

function getStyle(s: number) {
  return s >= 70 ? { bg: 'bg-emerald-50', text: 'text-emerald-700' } : s >= 40 ? { bg: 'bg-amber-50', text: 'text-amber-700' } : { bg: 'bg-red-50', text: 'text-red-700' };
}

function StatusIcon({ status }: { status: string }) {
  if (
    [
      'valid',
      'found',
      'confirmed',
      'safe',
      'verified',
      'excellent',
      'trusted',
      'clean'
    ].includes(status)
  ) {
    return <CheckCircle2 size={14} className="text-emerald-500" />;
  }

  if (
    [
      'failed',
      'not_found',
      'missing',
      'malicious',
      'suspicious',
      'risky',
      'unverified'
    ].includes(status)
  ) {
    return <AlertTriangle size={14} className="text-red-500" />;
  }

  return <Info size={14} className="text-slate-400" />;
}

function CircularGauge({ score }: { score: number }) {
  const r = 98;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const c = getScoreColor(score);
  return (
    <div style={{ width: 280 }} className="mx-auto">
      <svg width={280} height={280} viewBox="0 0 280 280"><circle cx={125} cy={125} r={r} fill="none" stroke="#F1F5F9" strokeWidth="14" /><motion.circle cx={125} cy={125} r={r} fill="none" stroke={c} strokeWidth="14" strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} /></svg>
      <div className="relative -mt-[230px] flex flex-col items-center">
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.8 }}
  className="flex flex-col items-center"
>
  <div className="flex items-end">
    <span className="text-[60px] font-extrabold leading-none">
      {score}
    </span>

    <span className="text-[18px] text-slate-400 font-bold ml-1 mb-1">
      /100
    </span>
  </div>

  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
    Trust Score
  </p>
</motion.div>
      </div>
    </div>
  );
}

export default function TrustScore() {
  const [idx, setIdx] = useState(2);
  const [open, setOpen] = useState(false);
  const entity = ENTITIES[idx];
  const scenario = DEMO_SCENARIOS[entity.scenarioIdx];
  const bd = scenario.trustBreakdown;
  const color = getScoreColor(bd.overallScore);
  const st = getStyle(bd.overallScore);

  return (
    <section id="trust-score" className="py-20 px-6 lg:px-8 bg-white border-t border-slate-100">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 border border-violet-200 rounded-full mb-5"><Info size={12} className="text-violet-600" /><span className="text-[11px] font-semibold text-violet-700 uppercase tracking-widest">Explainable AI</span></div>
          <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-3">Trust Score Engine</h2>
          <p className="text-[16px] text-slate-500 max-w-2xl">Composite trust assessment aggregating multiple verification signals into a single explainable score (0–100). Each component is transparently displayed.</p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-sm">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-3.5 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300">
              <div className="flex items-center gap-3 min-w-0"><Building2 size={17} className="text-slate-400" /><div className="text-left"><p className="text-[14px] font-bold text-slate-800 truncate">{entity.name}</p><p className="text-[11.5px] text-slate-400">{entity.type} · Reg: {entity.regNum}</p></div></div>
              <ChevronDown size={17} className={`text-slate-400 ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>{open && (<motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full mt-2 left-0 right-0 bg-white border-2 border-slate-200 rounded-xl shadow-xl z-30 overflow-hidden">{ENTITIES.map((e, i) => (<button key={e.name} onClick={() => { setIdx(i); setOpen(false); }} className={`w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-violet-50 ${i === idx ? 'bg-violet-50' : ''} ${i < ENTITIES.length - 1 ? 'border-b border-slate-100' : ''}`}><span className="text-base">{DEMO_SCENARIOS[e.scenarioIdx].typeIndicator}</span><div><p className="text-[13px] font-semibold text-slate-800">{e.name}</p><p className="text-[11px] text-slate-400">{e.type}</p></div></button>))}</motion.div>)}</AnimatePresence>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-7">
          {/* Gauge */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8 flex flex-col items-center">
            <h4 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-6 self-start">Trust Score (Demo)</h4>
            <CircularGauge score={bd.overallScore} />
            <div
  className={`mt-26 px-5 py-2.5 rounded-full text-[13px] font-bold shadow-sm ${st.bg} ${st.text}`}
>
              {bd.overallScore >= 70 ? 'High Trust — Verified Communication' : bd.overallScore >= 40 ? 'Medium-Low Trust — Verify Manually' : 'Critical Risk — Do Not Trust'}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-100 w-full grid grid-cols-3 gap-3 text-center">
              {[{ l: 'Type', v: entity.type }, { l: 'Reg No.', v: entity.regNum }, {
l: 'Assessment',
v:
bd.overallScore >= 70
? 'Trusted'
: bd.overallScore >= 40
? 'Review'
: 'High Risk'
}].map(({ l, v }) => (<div
key={l}
className="rounded-xl bg-slate-50 border border-slate-100 py-3 px-2"
><div className="text-[10px] text-slate-900 uppercase tracking-wider mb-0.5">{l}</div><div className="text-[12px] font-bold text-slate-700">{v}</div></div>))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5"><Info size={15} className="text-[#2563EB]" /><h4 className="text-[14px] font-bold text-[#0F172A]">Score Component Breakdown (XAI)</h4><span className="ml-auto text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md">Simulated Output</span></div>
              <div className="space-y-4">{bd.components.map((comp, ci) => {
                const pct = Math.round((comp.score / comp.weight) * 100);

const status = comp.status.toLowerCase();

let cc = '#16A34A';

if (
  [
    'failed',
    'not_found',
    'missing',
    'malicious',
    'suspicious',
    'risky',
    'unverified'
  ].includes(status)
) {
  cc = '#DC2626';
}
else if (
  [
    'warning',
    'review',
    'unknown'
  ].includes(status)
) {
  cc = '#F59E0B';
}
else {
  cc = '#16A34A';
}


                return (
                  <div key={comp.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2 min-w-0 flex-1"><StatusIcon status={comp.status} /><span className="text-[13px] font-semibold text-slate-700 truncate">{comp.label}</span></div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3"><span className="text-[12.5px] font-bold text-slate-600">{comp.score}/{comp.weight}</span><span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md`} style={{ backgroundColor: cc + '18', color: cc }}>{comp.status.replace(/_/g, ' ')}</span></div>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full" style={{ backgroundColor: cc }} initial={{ width: 0 }} whileInView={{ width: pct + '%' }} viewport={{ once: true }} transition={{ duration: 0.9, delay: ci * 0.08 }} />
                    </div>
                    <p className="text-[11.5px] text-slate-400 ml-1 mt-1 italic">{comp.note}</p>
                  </div>
                );
              })}</div>

              <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[14px] font-bold text-slate-700">Composite Trust Score (Demo)</span>
                <div className="flex items-center gap-1.5"><span className="text-[28px] font-extrabold" style={{ color }}>{bd.overallScore}</span><span className="text-[15px] text-slate-400 font-bold">/100</span></div>
              </div>
            </div>

            {/* XAI Explanation */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-4"><Shield size={16} className="text-blue-400" /><h4 className="text-[14px] font-bold">Explainable AI Summary</h4><span className="ml-auto text-[10px] font-semibold px-2 py-0.5 bg-white/10 text-slate-400 rounded-md">XAI</span></div>
              <p className="text-[13.5px] text-slate-300 leading-relaxed">
                {bd.overallScore >= 70
                  ? `This analyzed communication achieves a strong Trust Score of ${bd.overallScore}/100. Key factors include verified digital signature matching SEBI PKI infrastructure, successful hash verification against the official registry, clean domain reputation history, and absence of NLP-detected fraud patterns.`
                  : bd.overallScore >= 40
                  ? `This communication exhibits concerning characteristics (${bd.overallScore}/100). Verification gaps exist including missing digital signature validation and registry lookup failure with fraud-like NLP patterns detected. Recommend additional manual verification.`
                  : `The communication scores extremely low (${bd.overallScore}/100). Multiple red flags: missing digital signature verification, registry lookup failure, synthetic content indicators, and fraud-like linguistic patterns.`}
              </p>
            </div>

            {/* Quick signals */}
            <div className="grid grid-cols-3 gap-4">
              {[{ icon: Building2, label: 'Registry', val: bd.components[0].status === 'not_found' ? 'Not Found' : 'Found', clr: bd.components[0].status === 'not_found' ? 'text-red-600' : 'text-emerald-600' }, { icon: FileText, label: 'Digital Sig', val: bd.components[1].status === 'missing' ? 'Missing' : 'Valid', clr: bd.components[1].status === 'missing' ? 'text-red-600' : 'text-emerald-600' }, { icon: Globe, label: 'Domain', val: bd.components[3].status === 'malicious' ? 'Suspicious' : bd.components[3].status === 'excellent' ? 'Trusted' : 'Check', clr: bd.components[3].status === 'malicious' ? 'text-red-600' : bd.components[3].status === 'excellent' ? 'text-emerald-600' : 'text-amber-600' }].map(({ icon: Icon, label, val, clr }) => (
                <div key={label} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center text-center gap-2">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`} style={{ backgroundColor: clr.includes('red') ? '#FEF2F2' : clr.includes('emerald') ? '#F0FDF4' : '#FFFBEB' }}><Icon size={18} className={clr} /></div>
                  <span className="text-[12px] font-semibold text-slate-700">{label}</span>
                  <span className={`text-[12px] font-bold ${clr}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
