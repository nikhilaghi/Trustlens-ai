import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, XCircle, AlertTriangle, Clock, Eye, ExternalLink } from 'lucide-react';
import { ANALYSIS_HISTORY } from '../data/mockData';

type FilterOption = 'All' | 'High Risk' | 'Trusted' | 'Caution';

const FILTER_OPTIONS: FilterOption[] = ['All', 'High Risk', 'Trusted', 'Caution'];

function ResultBadge({ result }: { result: string }) {
  if (result.includes('TRUSTED') || result.includes('Safe')) return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[11.5px] font-bold text-emerald-700"><CheckCircle2 size={12} />{result}</span>;
  if (result.includes('CRITICAL') || result.includes('HIGH RISK') || result.includes('BLOCKED')) return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 rounded-lg text-[11.5px] font-bold text-red-700"><XCircle size={12} />{result}</span>;
  return <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-[11.5px] font-bold text-amber-700"><AlertTriangle size={12} />{result}</span>;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-red-100 text-red-700' : score >= 60 ? 'bg-orange-100 text-orange-700' : score >= 30 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700';
  return <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[12px] font-bold ${color}`}>{score}/100</span>;
}

export default function AnalysisHistory() {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = ANALYSIS_HISTORY.filter(item => {
    const matchFilter = filter === 'All' ||
      (filter === 'High Risk' && item.result.includes('RISK')) ||
      (filter === 'Trusted' && item.result === 'TRUSTED') ||
      (filter === 'Caution' && item.result === 'CAUTION REQUIRED');
    const matchSearch = !searchQuery || item.scenarioName.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section id="history" className="py-20 px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-200/60 border border-slate-300 rounded-full mb-5"><Clock size={12} className="text-slate-500" /><span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">Demo History</span></div>
              <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-2">Demo Analysis History</h2>
              <p className="text-[16px] text-slate-500 max-w-xl">Record of all demo analyses performed using TrustLens AI prototype scenarios. Each entry shows a simulated analysis result.</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"><ExternalLink size={14} /> Export CSV</button>
              <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-400 shadow-sm">{filtered.length} demo runs</div>
            </div>
          </div>
        </motion.div>

        {/* Search + Filters */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search scenario name or category..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] placeholder:text-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20" />
          </div>
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            {FILTER_OPTIONS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all ${filter === f ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>{f}</button>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50/80 border-b border-slate-200">
            <div className="col-span-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Timestamp</div>
            <div className="col-span-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Scenario Name</div>
            <div className="col-span-2 hidden md:block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</div>
            <div className="col-span-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Result</div>
            <div className="col-span-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right pr-2">Risk Score</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            <AnimatePresence>
              {filtered.map((item) => {
                const isExpanded = expandedRow === item.id;
                return (
                  <motion.div key={item.id}>
                    <button
                      onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                      className="w-full grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors text-left"
                    >
                      <div className="col-span-3 flex items-center gap-2"><Clock size={13} className="text-slate-300 flex-shrink-0" /><div><div className="text-[12.5px] font-semibold text-slate-700">{item.timestamp.split(' — ')[1]}</div><div className="text-[11px] text-slate-400">{item.timestamp.split(' — ')[0]}</div></div></div>
                      <div className="col-span-3 flex items-center min-w-0"><span className="text-[13px] font-medium text-slate-800 truncate">{item.scenarioName}</span></div>
                      <div className="col-span-2 hidden md:flex items-center"><span className="text-[12.5px] text-slate-500 truncate">{item.category}</span></div>
                      <div className="col-span-2 flex items-center"><ResultBadge result={item.result} /></div>
                      <div className="col-span-2 flex items-center justify-end pr-2"><ScoreBadge score={item.riskScore} /></div>
                    </button>

                    {/* Expanded Row */}
                    <AnimatePresence>{isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="px-6 py-5 bg-slate-50/80 border-t border-slate-100">
                          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {[{ l: 'Analysis ID', v: item.id }, { l: 'Category', v: item.category }, { l: 'Confidence', v: `${item.confidence}%` }, { l: 'Recommendation', v: item.recommendation }].map(({ l, v }) => (
                              <div key={l}><div className="text-[10.5px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">{l}</div><div className="text-[13px] font-semibold text-slate-800">{v}</div></div>
                            ))}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200">
                            <button className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#2563EB]" onClick={(e) => e.preventDefault()}><Eye size={13} />View Full Demo Report</button>
                            <button className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[#2563EB]" onClick={(e) => e.preventDefault()}><ExternalLink size={13} />Re-run This Scenario</button>
                          </div>
                        </div>
                      </motion.div>
                    )}</AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[12px] text-slate-400">Showing {filtered.length} of {ANALYSIS_HISTORY.length} demo analyses · All data is simulated for prototype demonstration</span>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-slate-400 font-mono">v3.1-demo</span>
            </div>
          </div>
        </motion.div>

        {/* Info Note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-6 p-5 bg-blue-50/60 border border-blue-200/60 rounded-2xl flex items-start gap-3">
          <AlertTriangle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-[13px] text-blue-700 leading-relaxed">
            <strong>Demo Analysis History:</strong> All entries shown above represent sample scenarios processed by the TrustLens AI prototype engine. In a production deployment, this table would display actual analysis results from real-time usage. The scenarios used are intentionally constructed to demonstrate different fraud patterns and verification outcomes.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
