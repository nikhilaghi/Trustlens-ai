import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Search, Shield, Eye, Sparkles } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

const FEATURE_CARDS = [
  {
    emoji: '🛡️',
    title: 'Detection Engine',
    description:
      'Multimodal AI analyzes video, audio, images, and text to detect deepfakes, voice clones, and fraud patterns in real-time.',
    features: ['Deepfake Detection', 'Voice Analysis', 'Document Scanning'],
    ctaSection: 'detection',
  },
  {
    emoji: '🗂️',
    title: 'Verification Registry',
    description:
      'Cryptographically validates communications against SEBI-verified digital signatures and registered intermediary records.',
    features: ['Digital Signature', 'Hash Verification', 'PKI Validation'],
    ctaSection: 'verification',
  },
  {
    emoji: '📊',
    title: 'Trust Score System',
    description:
      'Composite explainable score (0–100) aggregating registration status, authentication, language analysis, and domain intelligence.',
    features: ['6-Factor Scoring', 'XAI Reasoning', 'Real-Time'],
    ctaSection: 'trust-score',
  },
];

const PIPELINE_STAGES = [
  { icon: '📤', label: 'Input' },
  { icon: '🔍', label: 'Analyze' },
  { icon: '🧠', label: 'AI Models' },
  { icon: '🗄', label: 'Registry' },
  { icon: '📊', label: 'Score' },
  { icon: '✅', label: 'Report' },
];

function AnimatedPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveStage((s) => (s + 1) % PIPELINE_STAGES.length), 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="bg-gradient-to-br from-slate-900 via-[#1a2744] to-[#0F172A] rounded-2xl p-12 border border-slate-700/50 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 border border-blue-400/20 rounded-full mb-4">
            <Sparkles size={12} className="text-blue-400" />
            <span className="text-[11px] font-semibold text-blue-300">Simulated Pipeline (Demo)</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">AI Detection Pipeline</h3>
          <p className="text-[12px] text-slate-400">Conceptual visualization — not live processing</p>
        </div>

        {/* Pipeline stages */}
        <div className="flex items-center justify-between gap-2 mb-6">
          {PIPELINE_STAGES.map((stage, idx) => (
            <motion.div
              key={stage.label}
              animate={{
                scale: activeStage === idx ? [1, 1.08, 1] : 1,
                opacity: activeStage === idx ? 1 : 0.45,
              }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm transition-all duration-300 ${
                  activeStage === idx
                    ? 'bg-blue-500/20 border border-blue-400/50 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800/50 border border-slate-700/50'
                }`}
              >
                {stage.icon}
              </div>
              <span className={`text-[9px] font-medium mt-1.5 transition-colors ${activeStage === idx ? 'text-blue-400' : 'text-slate-500'}`}>
                {stage.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 p-3 bg-slate-800/60 rounded-xl border border-slate-700/40">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-slate-400">Current Stage</span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">{PIPELINE_STAGES[activeStage].label}</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full"
              animate={{ width: `${((activeStage + 1) / PIPELINE_STAGES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Hero({ onNavigate }: HeroProps) {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  };

  return (
    <section id="home" className="relative pt-[88px] pb-16 px-6 lg:px-8 overflow-hidden bg-white min-h-screen flex items-center">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-blue-50/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-tr from-indigo-50/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-screen-2xl mx-auto w-full relative">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-7 order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F172A] rounded-full">
                <Shield size={14} className="text-[#2563EB]" />
                <span className="text-[12px] font-bold text-white tracking-wide">SEBI TechSprint 2026 Prototype</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-[#0F172A] leading-[1.06] tracking-tight"
            >
              Don't Just Detect
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-[#2563EB]">Scams.</span>{' '}
                Verify Trust.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-[17px] text-slate-500 leading-relaxed max-w-xl">
              TrustLens AI combines{' '}
              <span className="font-semibold text-slate-600">AI-powered fraud detection</span> with{' '}
              <span className="font-semibold text-slate-600">cryptographic verification</span>{' '}
              for India's securities markets — protecting investors through transparent, explainable AI.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('detection')}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0F172A] text-white text-[14px] font-bold rounded-xl hover:bg-[#1E293B] shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Play size={16} />
                Start Demo Analysis
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('verification')}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-[#0F172A] text-[14px] font-bold rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
              >
                <Search size={16} />
                Explore Verification Registry
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
              {[{ icon: Eye, label: 'Explainable AI' }, { icon: Shield, label: 'Transparent Results' }, { icon: Sparkles, label: 'Multi-Signal Analysis' }].map(
                ({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon size={13} className="text-[#2563EB]" />
                    <span className="text-[12.5px] font-medium text-slate-500">{label}</span>
                  </div>
                )
              )}
            </motion.div>
          </div>

          {/* Right — Pipeline Visual */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <AnimatedPipeline />
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mt-16 pt-16 border-t border-slate-100"
        >
          <div className="grid md:grid-cols-3 gap-5">
            {FEATURE_CARDS.map((card) => (
              <motion.button
                key={card.title}
                onClick={() => onNavigate(card.ctaSection)}
                whileHover={{ y: -5, boxShadow: '0 12px 36px rgba(0,0,0,0.08)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group bg-white border border-slate-200 rounded-2xl p-6 text-left hover:border-[#BFDBFE] transition-all duration-250"
              >
                <div className="text-3xl mb-4">{card.emoji}</div>
                <h3 className="text-[16px] font-bold text-[#0F172A] mb-2 group-hover:text-[#2563EB] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{card.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.features.map((f) => (
                    <span key={f} className="text-[11px] font-medium px-2.5 py-1 bg-slate-50 text-slate-500 rounded-md group-hover:bg-[#EFF6FF] group-hover:text-[#2563EB] transition-colors">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-[12.5px] font-bold text-[#2563EB] group-hover:gap-2.5 transition-all">
                  Try Demo <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
