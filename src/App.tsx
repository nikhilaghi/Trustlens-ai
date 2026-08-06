import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PlatformOverview from './components/PlatformOverview';
import DetectionEngine from './components/DetectionEngine';
import VerificationRegistry from './components/VerificationRegistry';
import TrustScore from './components/TrustScore';
import AnalysisHistory from './components/AnalysisHistory';
import SystemArchitecture from './components/SystemArchitecture';
import Footer from './components/Footer';

const SECTION_IDS = ['home', 'overview', 'detection', 'verification', 'trust-score', 'history', 'architecture'] as const;
type SectionId = typeof SECTION_IDS[number];

const NAV_MAP: Record<string, string> = {
  home: 'home',
  overview: 'overview',
  detection: 'detection',
  verification: 'verification',
  'trust-score': 'trust-score',
  history: 'history',
  architecture: 'architecture',
};

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Use individual refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const detectionRef = useRef<HTMLDivElement>(null);
  const verificationRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  const refsMap: Record<SectionId, React.RefObject<HTMLDivElement | null>> = {
    home: homeRef,
    overview: overviewRef,
    detection: detectionRef,
    verification: verificationRef,
    'trust-score': trustRef,
    history: historyRef,
    architecture: archRef,
  };

  const navigateTo = (id: string) => {
    const sid = id as SectionId;
    setActiveSection(sid);
    const el = refsMap[sid]?.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      let current: SectionId = 'home';
      for (const id of SECTION_IDS) {
        const el = refsMap[id]?.current;
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= 130) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Navigation activeSection={NAV_MAP[activeSection] || 'home'} onNavigate={navigateTo} />

      <div style={{ height: 68 }} />

      <main>
        <div ref={homeRef}>
          <Hero onNavigate={navigateTo} />
        </div>

        <div ref={overviewRef} id="overview">
          <PlatformOverview />
        </div>

        <div ref={detectionRef} id="detection">
          <DetectionEngine />
        </div>

        <div ref={verificationRef} id="verification">
          <VerificationRegistry />
        </div>

        <div ref={trustRef} id="trust-score">
          <TrustScore />
        </div>

        <div ref={historyRef} id="history">
          <AnalysisHistory />
        </div>

        <div ref={archRef} id="architecture">
          <SystemArchitecture />
        </div>
      </main>

      <Footer />

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          pointerEvents: showScrollTop ? ('auto' as const) : ('none' as const),
        }}
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-11 h-11 bg-[#0F172A] text-white rounded-xl shadow-lg flex items-center justify-center z-40 hover:bg-[#1E293B]"
        title="Back to top"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 11V3m0 0L3 7m4-4l4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.button>
    </div>
  );
}
