import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, QrCode, CheckCircle2, XCircle, Shield, Hash, Fingerprint, Calendar, Building2, Lock, Loader2, Globe, AlertTriangle, Info } from 'lucide-react';
import { VERIFICATION_EXAMPLES } from '../data/mockData';

export default function VerificationRegistry() {
  const [inputUrl, setInputUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<typeof VERIFICATION_EXAMPLES[0] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const verify = (url?: string) => {
    if (isVerifying) return;
    setIsVerifying(true);
    setResult(null);
    setTimeout(() => {
      const u = url || inputUrl;
      const found = VERIFICATION_EXAMPLES.find(ex => ex.urlOrId === u || ex.id === u);
      setResult(found || VERIFICATION_EXAMPLES.find(ex => ex.expectedStatus === 'unverified') || null);
      setIsVerifying(false);
    }, 1400);
  };

  const clickExample = (ex: typeof VERIFICATION_EXAMPLES[0]) => {
    setInputUrl(ex.urlOrId);
    setActiveId(ex.id);
    verify(ex.urlOrId);
  };

  return (
    <section id="verification" className="py-20 px-6 lg:px-8 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-5"><Shield size={12} className="text-emerald-600" /><span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-widest">Verification Module</span></div>
          <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-3">Verification Registry</h2>
          <p className="text-[16px] text-slate-500 max-w-2xl">Authenticates digitally signed communications from SEBI, exchanges, and registered intermediaries using cryptographic verification. All examples below are simulated for prototype demonstration.</p>
        </motion.div>

        <div className="grid xl:grid-cols-5 gap-7">
          {/* Left */}
          <div className="xl:col-span-2 space-y-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Enter Communication ID or URL (Demo)</label>
              <div className="relative mb-3"><Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={inputUrl} onChange={e => setInputUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && verify()} placeholder="commid:SEBI-2026-..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB]" /></div>
              <div className="flex gap-2">
                <button onClick={() => verify()} disabled={isVerifying || !inputUrl} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[13px] ${isVerifying || !inputUrl ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'}`}>{isVerifying ? <><Loader2 size={15} className="animate-spin" /> Verifying...</> : <><Search size={15} /> Verify</>}</button>
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl"><QrCode size={15} /> Scan QR</button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Sample Examples (Demo)</label>
              <div className="space-y-2">{VERIFICATION_EXAMPLES.map((ex) => (
                <button key={ex.id} onClick={() => clickExample(ex)} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${activeId === ex.id ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${ex.expectedStatus === 'authentic' ? 'bg-emerald-50' : 'bg-red-50'}`}>{ex.expectedStatus === 'authentic' ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-red-600" />}</div>
                  <div className="flex-1 min-w-0 text-left"><p className="text-[13px] font-semibold text-slate-800 truncate">{ex.label}</p><p className="text-[10.5px] text-slate-400 truncate font-mono">{ex.urlOrId.substring(0, 32)}...</p></div>
                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ex.expectedStatus === 'authentic' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{ex.expectedStatus === 'authentic' ? 'Authentic (Demo)' : 'Unverified'}</span>
                </button>
              ))}</div>

              <div className="mt-4 pt-4 border-t border-slate-100"><Info size={14} className="inline text-blue-400 mr-1.5" /><span className="text-[11.5px] text-slate-400">All results use simulated data. In production these would query SEBI PKI infrastructure.</span></div>
            </div>
          </div>

          {/* Right */}
          <div className="xl:col-span-3">
            <AnimatePresence mode="wait">
              {isVerifying ? (<motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white border border-slate-200 rounded-2xl p-14 flex flex-col items-center justify-center min-h-[450px]"><div className="relative w-20 h-20 mb-6"><div className="absolute inset-0 border-2 border-slate-100 rounded-full" /><motion.div className="absolute inset-0 border-2 border-[#2563EB] border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2 }} style={{}} /><Lock size={22} className="absolute inset-0 m-auto text-[#2563EB]" /></div><h3 className="text-[17px] font-bold text-slate-700">Querying Registry (Demo)</h3><p className="text-[13px] text-slate-400 mt-2 max-w-xs text-center">Simulated query — Not connected to live systems</p></motion.div>) : !result ? (<div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-14 flex flex-col items-center justify-center min-h-[450px] text-center"><div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center mb-5"><Globe size={26} className="text-slate-300" /></div><h3 className="text-[17px] font-bold text-slate-600 mb-2">Select Example to Verify</h3><p className="text-[13px] text-slate-400 max-w-sm">Click any sample communication to see verification result.</p></div>) : result?.expectedStatus === 'authentic' && result.metadata ? (
                <motion.div key="a" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/25"><CheckCircle2 size={28} className="text-white" /></motion.div>
                      <div><span className="text-[10.5px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md inline-block mb-2">Verified (Prototype)</span><h3 className="text-xl font-bold">{result.label}</h3><p className="text-[13px] text-slate-500">{result.metadata.subject}</p><p className="text-[11px] text-emerald-600 font-medium mt-1">{result.displayLabel}</p></div>
                    </div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-6">
                    <h4 className="text-[13px] font-bold text-[#0F172A] mb-4">Details (Simulated)</h4>
                    <div className="grid sm:grid-cols-2 gap-4">{[
                      { icon: Building2, label: 'Signed By', value: result.metadata.signedBy },
                      { icon: Calendar, label: 'Date', value: result.metadata.issueDate },
                      { icon: Hash, label: 'Comm ID', value: result.metadata.communicationId, mono: true },
                      { icon: Fingerprint, label: 'Signature', value: result.signatureDetails?.signatureValid ? 'Valid' : 'Invalid' },
                      { icon: Shield, label: 'Hash', value: result.signatureDetails?.hashAlgorithm + ': Verified' },
                      { icon: Lock, label: 'Anchor', value: result.signatureDetails?.trustAnchor || '' },
                    ].map(({ icon: Icon, label, value, mono }) => (<div key={label} className="p-4 bg-slate-50 rounded-xl"><Icon size={12} className="text-slate-400 mb-1 block" /><div className="text-[10.5px] text-slate-400 uppercase tracking-wider font-semibold">{label}</div><div className={`text-[13px] font-semibold ${mono ? 'font-mono text-[11.5px]' : ''}`}>{value}</div></div>))}</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-5">
                    <h4 className="text-[13px] font-bold text-[#0F172A] mb-3">Checkpoint Status</h4>
                    <div className="flex flex-wrap gap-2">{['Digital Sig Valid', 'SHA-256 Match', 'Cert Trusted', 'Registry Found', 'Cert Valid', 'Issuer Confirmed'].map(c => (<span key={c} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-[12px] font-semibold text-emerald-700 flex items-center gap-1"><CheckCircle2 size={13} />{c}</span>))}</div>
                  </div>
                </motion.div>
              ) : result?.expectedStatus === 'unverified' ? (
                <motion.div key="u" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg"><XCircle size={28} className="text-white" /></div>
                      <div><span className="text-[10.5px] font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-md inline-block mb-2">Not Found</span><h3 className="text-xl font-bold">{result.label}</h3><p className="text-[13px] text-red-700 font-medium">{result.reasonForFailure || 'Could not verify.'}</p><p className="text-[11px] text-red-500 mt-1">{result.displayLabel}</p></div>
                    </div>
                  </div>
                  {(result.additionalFindings || []).map((f, i) => (<div key={i} className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3"><AlertTriangle size={14} className="text-amber-500 flex-shrink-0" /><span className="text-[13px] text-slate-700">{f}</span></div>))}
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5"><Shield size={18} className="text-amber-600 inline-block mr-2" /><span className="text-[13px] font-bold text-amber-800">Proceed with extreme caution.</span> This entity is not found in any official registry. Do not share personal or financial information through this portal.</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
