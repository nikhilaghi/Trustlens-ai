import { Shield, ExternalLink } from 'lucide-react';

const FOOTER_LINKS: Record<
  string,
  { name: string; url: string }[]
> = {
  Platform: [
    { name: 'Detection Engine', url: '#detection-engine' },
    { name: 'Verification Registry', url: '#verification-registry' },
    { name: 'Trust Score Engine', url: '#trust-score' },
    { name: 'Analysis History', url: '#analysis-history' },
    { name: 'System Architecture', url: '#architecture' },
  ],

  Resources: [
    { name: 'SEBI Official Portal', url: 'https://www.sebi.gov.in' },
    { name: 'NSE India', url: 'https://www.nseindia.com' },
    { name: 'BSE Limited', url: 'https://www.bseindia.com' },
    { name: 'SCORES Grievances', url: 'https://scores.sebi.gov.in' },
    { name: 'AMFI India', url: 'https://www.amfiindia.com' },
    { name: 'RBI SACHET', url: 'https://sachet.rbi.org.in' },
  ],

  Project: [
    { name: 'About This Prototype', url: '#' },
    { name: 'TechSprint Submission', url: '#' },
    { name: 'Global FinTech Fest', url: 'https://www.globalfintechfest.com' },
    { name: 'Documentation (Mock)', url: '#' },
    { name: 'Technical Paper (Draft)', url: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-slate-800">
      {/* CTA Banner */}
      <div className="border-b border-slate-800/60">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Interested in TrustLens AI?</h3>
            <p className="text-[14px] text-slate-400 max-w-md">This prototype demonstrates the concept for SEBI TechSprint 2026. For collaboration inquiries or technical discussions.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a
  href="https://www.globalfintechfest.com/gff-hackathons/sebi-techsprint"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1D4ED8] transition-colors"
>
  <ExternalLink size={15} />
  View Submission Details
</a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 pt-12 pb-8">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 mb-6 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-white" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-white">TrustLens AI</span>
                <p className="text-[9.5px] text-slate-500 mt-0.5">Verify Trust</p>
              </div>
            </div>
            <p className="text-[13px] text-slate-400 leading-relaxed max-w-sm mb-5">
              AI-powered fraud detection and communication verification for India&apos;s securities markets. Protecting investors through transparent, explainable AI.
            </p>

            {/* Meta Info */}
            <ul className="space-y-2.5">
              {[
                { label: 'Built for:', value: 'SEBI Securities Market TechSprint 2026' },
                { label: 'Also submitted to:', value: 'Global FinTech Fest 2026' },
                { label: 'Version:', value: 'Prototype v3.1-demo - July 2026' },
              ].map(({ label, value }) => (
                <li key={label} className="flex items-center gap-2">
                  <Shield size={10} className="text-slate-500" />
                  <span className="text-[11.5px] text-slate-500">{label}</span>
                  <span className="text-[12px] text-slate-300">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
<a
  href={link.url}
  target={category === "Resources" ? "_blank" : undefined}
  rel={category === "Resources" ? "noopener noreferrer" : undefined}
  className="text-[13px] text-slate-400 hover:text-white hover:underline underline-offset-4 transition-colors inline-flex items-center gap-1 group"
>
  {link.name}
  {category === "Resources" && (
    <ExternalLink
      size={10}
      className="opacity-0 group-hover:opacity-50 transition-opacity"
    />
  )}
</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-slate-800">
          {['ISO 27001 Ready', 'DPDP Act 2023 Compliant', 'CERT-In Guidelines', 'Explainable AI', 'PKI Infrastructure'].map(
            (badge) => (
              <span key={badge} className="inline-flex items-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] font-semibold text-slate-400">
                {badge}
              </span>
            )
          )}
        </div>

        {/* Disclaimer */}
        <div className="space-y-5">
          <div className="p-5 bg-white/[0.02] border border-white/10 rounded-xl">
            <p className="text-[13px] text-slate-300 leading-relaxed">
              <strong className="text-white">Disclaimer:</strong> This prototype demonstrates the proposed workflow of{' '}
              <strong className="text-blue-400">TrustLens AI</strong> using realistic sample communications for demonstration purposes.
              All scenarios, analysis results, verification outputs, trust scores, and detection signals are{' '}
              <em>fabricated</em> to illustrate how the system would function in a production environment.
              No real SEBI, NSE, BSE, broker, AMC data is represented.
              Live institutional integrations are planned for future development following regulatory approval.
            </p>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px]">
            <div className="text-slate-500 space-x-4">
              <span>&copy; 2026 TrustLens AI</span>
              <span className="text-slate-700">&middot;</span>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">Privacy (Placeholder)</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">Terms (Placeholder)</a>
            </div>
            <span className="text-slate-600 font-mono">Prototype - Not Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
