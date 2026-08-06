import { motion } from 'framer-motion';
import { PLATFORM_CAPABILITIES } from '../data/mockData';

export default function PlatformOverview() {
  return (
    <section id="overview" className="py-20 px-6 lg:px-8 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full" />
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Platform Capabilities</span>
          </div>
          <h2 className="text-3xl lg:text-[34px] font-bold text-[#0F172A] mb-4">How TrustLens AI Works</h2>
          <p className="text-[16px] text-slate-500 max-w-2xl mx-auto">
            The platform is designed with multiple specialized capabilities — each addressing a specific aspect of
            fraud detection and verification for India's securities ecosystem.
          </p>
        </motion.div>

        {/* Capability Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PLATFORM_CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              className={`bg-white border border-slate-200 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                cap.scope || cap.types ? 'md:col-span-2 xl:col-span-1' : ''
              }`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="text-3xl flex-shrink-0">{cap.icon}</div>
                <div>
                  <h3 className="text-[17px] font-bold text-[#0F172A]">{cap.title}</h3>
                  <p className="text-[12.5px] font-medium text-[#2563EB] mt-0.5">{cap.subtitle}</p>
                </div>
              </div>

              <p className="text-[13.5px] text-slate-600 leading-relaxed mb-5">{cap.description}</p>

              {/* Features list */}
              {cap.features && (
                <ul className="space-y-2 mb-4">
                  {cap.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[12.5px] text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Fraud types list */}
              {cap.types && (
                <div className="space-y-2">
                  {cap.types.map((t) => (
                    <div key={t.name} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl group hover:bg-blue-50/60 transition-colors">
                      <span className="text-[12.5px] font-medium text-slate-700">{t.name}</span>
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                          t.severity === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : t.severity === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {t.severity}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Future scope */}
              {cap.scope && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-violet-100 text-violet-700 rounded-md">Future Scope</span>
                  </div>
                  {cap.scope.map((item) => (
                    <div key={item.integration} className="flex items-start gap-3 p-3 bg-gradient-to-r from-violet-50/40 to-transparent border border-violet-100/50 rounded-xl">
                      <div className="flex-shrink-0 mt-0.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === 'Pending Approval' ? 'bg-amber-400' :
                            item.status === 'In Discussion' ? 'bg-blue-400' :
                            item.status === 'Planned' ? 'bg-violet-400' :
                            'bg-gray-300'
                          }`}
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[12.5px] font-bold text-[#0F172A]">{item.integration}</span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            item.status === 'Pending Approval' ? 'bg-amber-100 text-amber-700' :
                            item.status === 'In Discussion' ? 'bg-blue-100 text-blue-700' :
                            item.status === 'Planned' ? 'bg-violet-100 text-violet-700' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
