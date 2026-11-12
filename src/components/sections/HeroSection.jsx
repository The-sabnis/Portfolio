import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  personalInfo,
  heroTypewriterStrings,
  heroTechPills,
} from '../../data/portfolioData';
import ShinyText from '../ui/ShinyText';

function TypewriterDisplay({ strings }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % strings.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [strings]);

  return (
    <div className="h-9 overflow-hidden relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base md:text-lg text-[#a1a1a6] font-medium tracking-tight flex items-center gap-2.5 px-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff] shadow-[0_0_8px_rgba(41,151,255,0.7)] flex-shrink-0" />
          <span>{strings[index]}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function HeroSection() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#000000] text-center">
      {/* Subtle Video Atmosphere */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-25 z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
          type="video/mp4"
        />
      </video>

      {/* Atmospheric Vignette & Radial Spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#000000]/70 via-transparent to-[#000000] z-0" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(41,151,255,0.12),transparent_70%)] blur-[80px] z-0" />

      {/* Top Precision Horizon Line */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-[1]" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Apple Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono mb-8 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#30d158] shadow-[0_0_8px_#30d158] animate-pulse" />
          <span className="text-[#f5f5f7] font-medium tracking-tight">{personalInfo.status}</span>
          <span className="text-[#6e6e73]">·</span>
          <span className="text-[#86868b]">{personalInfo.remoteStatus}</span>
        </motion.div>

        {/* Monumental Apple Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.035em] text-[#f5f5f7] leading-[1.06] mb-6 max-w-4xl"
        >
          Query faster<br />
          with{' '}
          <ShinyText
            baseColor="#2997ff"
            shineColor="#ffffff"
            speed={3.5}
            spread={105}
          >
            Sarvesh.
          </ShinyText>
        </motion.h1>

        {/* Professional Role Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl md:text-2xl font-normal text-[#86868b] mb-4 tracking-[-0.015em] max-w-2xl"
        >
          {personalInfo.title}
        </motion.p>

        {/* Value Proposition Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <TypewriterDisplay strings={heroTypewriterStrings} />
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-10"
        >
          {/* Primary CTA: Apple Signature Blue */}
          <button
            onClick={() => scrollTo('contact')}
            className="px-7 py-3 rounded-full font-semibold text-xs sm:text-sm text-white bg-[#0071e3] hover:bg-[#0077ed] transition-all duration-200 shadow-[0_2px_16px_rgba(0,113,227,0.35)] hover:shadow-[0_4px_24px_rgba(0,113,227,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Hire Me
          </button>

          {/* Secondary CTA: Apple Frosted Glass */}
          <button
            onClick={() => scrollTo('experience')}
            className="group flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#f5f5f7] bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Discover Experience</span>
            <ArrowRight
              size={14}
              className="text-[#2997ff] group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </motion.div>

        {/* Subtle Horizontal Divider */}
        <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Core Specialties Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 max-w-2xl"
        >
          <span className="text-[11px] font-mono text-[#6e6e73] mr-1 uppercase tracking-wider">
            Specialties:
          </span>
          {heroTechPills.map((pill) => (
            <span
              key={pill}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.03] border border-white/[0.06] text-[#a1a1a6] hover:text-[#f5f5f7] hover:border-white/15 transition-all duration-200"
            >
              {pill}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="relative z-10 mt-14 flex flex-col items-center">
        <button
          onClick={() => scrollTo('about')}
          className="group flex flex-col items-center gap-1.5 text-[#6e6e73] hover:text-[#a1a1a6] transition-colors duration-200 focus:outline-none cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6e6e73] group-hover:text-[#a1a1a6] transition-colors">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-[#86868b]" />
          </motion.div>
        </button>
      </div>
    </section>
  );
}
