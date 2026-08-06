import { motion } from 'framer-motion';
import { ArrowDown, Shield, CheckCircle2, ExternalLink, Globe, Smartphone, Mail, MessageSquare, Monitor, Clock } from 'lucide-react';

const ARCHITECTURE_FLOW = [
  { icon: '📤', label: 'Input', sublabel: 'Communication Received', detail: 'Video · Audio · Text · Image · URL', color: 'from-blue-500/10 to-transparent' },
  { icon: '🔍', label: 'Detection Engine', sublabel: 'Multimodal AI Analysis', detail: 'Deepfake · Voice Clone · Phishing · NLP', color: 'from-violet-500/10 to-transparent' },
  { icon: '🧠', label: 'AI Models', sublabel: '7 Specialized Models', detail: 'Face · Voice · Document · URL · Language', color: 'from-fuchsia-500/10 to-transparent' },
  { icon: '🗄', label: 'Verification Registry', sublabel: 'PKI & Hash Lookup', detail: 'Digital Signatures · SEBI Registry', color: 'from-emerald-500/10 to-transparent' },
  { icon: '📊', label: 'Trust Score Engine', sublabel: 'Composite Scoring (XAI)', detail: '6-Factor Weighted Aggregation', color: 'from-amber-500/10 to-transparent' },
  { icon: '✅', label: 'Recommendation', sublabel: 'Actionable Output', detail: 'Verdict · Signals · Next Steps', color: 'from-red-500/10 to-transparent' },
];

const FUTURE_INTEGRATIONS = [
  { icon: Globe, title: 'SEBI APIs', description: 'Direct connectivity for real-time intermediary data validation', status: 'Pending Approval', statusColor: 'bg-amber-100 text-amber-700 border-amber-200' },
  { icon: Globe, title: 'NSE / BSE Feeds', description: 'Automated ingestion of corporate actions, circulars, announcements', status: 'In Discussion', statusColor: 'bg-blue-100 text-blue-700 border-blue-200' },
  { icon: Monitor, title: 'Browser Extension', description: 'Real-time page-level fraud detection for users browsing financial sites', status: 'Planned Q4 2026', statusColor: 'bg-violet-100 text-violet-700 border-violet-200' },
  { icon: Smartphone, title: 'Mobile SDK', description: 'In-app integration enabling brokers to verify messages at reception point', status: 'Planned Q1 2027', statusColor: 'bg-violet-100 text-violet-700 border-violet-200' },
  { icon: Mail, title: 'Email Gateway Plugin', description: 'Server-side email pre-scanning with TrustLens AI before delivery', status: 'Planned 2027', statusColor: 'bg-slate-100 text-slate-600 border-slate-300' },
  { icon: MessageSquare, title: 'WhatsApp Business API', description: 'Incoming message pre-screening for brokers using WhatsApp Business', status: 'Concept Stage', statusColor: 'bg-gray-100 text-gray-600 border-gray-300' },
];

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-5"><Clock size={12} className="text-slate-500" /><span className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest">System Design</span></div>
          <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-3">System Architecture</h2>
          <p className="text-[16px] text-slate-500 max-w-2xl mx-auto">How data flows through TrustLens AI — from input through analysis to recommendation. Future integrations are shown as planned roadmap items.</p>
        </motion.div>

        {/* Architecture Flow */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-3xl mx-auto mb-16">
          <div className="relative space-y-1">
            {ARCHITECTURE_FLOW.map((stage, idx) => (
              <motion.div key={stage.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className={`flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r ${stage.color} border border-slate-200`}>
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-2xl shadow-sm flex-shrink-0">{stage.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-[#0F172A]">{stage.label}</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-white/60 rounded-md text-slate-500">{idx + 1}</span>
                  </div>
                  <p className="text-[13px] font-medium text-slate-600 mt-0.5">{stage.sublabel}</p>
                  <p className="text-[11.5px] text-slate-400 mt-0.5">{stage.detail}</p>
                </div>
                {idx < ARCHITECTURE_FLOW.length - 1 && (
                  <ArrowDown size={20} className="text-slate-300 flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Prototype note */}
          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
            <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-[13px] text-slate-500 leading-relaxed">
              <strong>Current State:</strong> This prototype simulates the entire pipeline client-side using hardcoded scenarios. In production, each stage would connect to dedicated microservices, GPU clusters for deepfake analysis, and live SEBI PKI infrastructure.
            </p>
          </div>
        </motion.div>

        {/* Future Integrations */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-50 border border-violet-200 rounded-full mb-4"><Shield size={12} className="text-violet-600" /><span className="text-[11px] font-semibold text-violet-700 uppercase tracking-widest">Future Scope</span></div>
            <h3 className="text-2xl font-bold text-[#0F172A]">Planned Integrations</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">The following integrations represent planned capabilities pending regulatory approvals and technical partnerships.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {FUTURE_INTEGRATIONS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="group bg-white border-2 border-slate-200 rounded-2xl p-6 hover:border-violet-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-250"
              >
                <div className="w-11 h-11 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-100 group-hover:scale-110 transition-all duration-250">
                  <item.icon size={20} className="text-violet-600" />
                </div>
                <h4 className="text-[15px] font-bold text-[#0F172A] mb-2 group-hover:text-violet-700 transition-colors">{item.title}</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4 min-h-[42px]">{item.description}</p>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[11px] font-semibold ${item.statusColor}`}>
                  <ExternalLink size={10} />{item.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
