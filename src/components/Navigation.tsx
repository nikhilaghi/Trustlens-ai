import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'overview', label: 'Platform Overview' },
  { id: 'detection', label: 'Detection Engine' },
  { id: 'verification', label: 'Verification Registry' },
  { id: 'trust-score', label: 'Trust Score' },
  { id: 'history', label: 'Analysis History' },
  { id: 'architecture', label: 'System Architecture' },
];

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-[40px] h-[40px] bg-[#0F172A] rounded-xl flex items-center justify-center shadow-md">
              <Shield size={18} className="text-white" />
              <div className="absolute -top-[3px] -right-[3px] w-[10px] h-[10px] bg-[#2563EB] rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[15px] font-bold text-[#0F172A] tracking-tight">TrustLens AI</span>
              <span className="text-[9px] text-slate-400 font-medium tracking-wide uppercase hidden sm:block">Verify Trust</span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-[#2563EB]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/80'
                }`}
              >
                <span className="relative z-10">
  {item.label}
</span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-[#EFF6FF] rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right Side Badges */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Prototype Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-lg">
              <div className="w-[6px] h-[6px] rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-amber-700 tracking-wide">TechSprint Prototype</span>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-slate-100/80 transition-colors text-slate-600"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-0.5 max-h-[70vh] overflow-y-auto">
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#EFF6FF] text-[#2563EB]'
                      : 'text-slate-600 hover:bg-slate-50'
                  } ${i < NAV_ITEMS.length - 1 ? '' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
