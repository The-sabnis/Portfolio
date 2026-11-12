import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Download } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact', id: 'contact' },
];

function performScroll(target) {
  if (target === '__top__') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const element = document.getElementById(target);
  if (element) {
    const topOffset = 70;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - topOffset,
      behavior: 'smooth',
    });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pendingScrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const triggerOffset = Math.min(260, window.innerHeight * 0.35);
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;

      // Sort sections by actual DOM viewport position so scroll-spy never depends on navLinks order
      const sections = navLinks
        .map((l) => document.getElementById(l.id))
        .filter(Boolean)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

      if (sections.length === 0) return;

      if (atBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let current = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= triggerOffset) {
          current = section.id;
        }
      }
      setActiveSection(current);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lock background scroll only while mobile menu is open, then run any pending scroll after unlocking
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (pendingScrollRef.current) {
        const target = pendingScrollRef.current;
        pendingScrollRef.current = null;
        requestAnimationFrame(() => performScroll(target));
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    if (mobileMenuOpen) {
      pendingScrollRef.current = id;
      setMobileMenuOpen(false);
    } else {
      performScroll(id);
    }
  };

  const scrollToTop = () => {
    if (mobileMenuOpen) {
      pendingScrollRef.current = '__top__';
      setMobileMenuOpen(false);
    } else {
      performScroll('__top__');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'py-2.5 bg-[#000000]/80 backdrop-blur-2xl saturate-180 border-b border-white/[0.08]'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Apple Brand Identity */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-left focus:outline-none cursor-pointer"
            aria-label="Go to top"
          >
            <span className="text-[15px] sm:text-base font-semibold tracking-tight text-white group-hover:text-slate-200 transition-colors">
              {personalInfo.name}
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#2997ff] shadow-[0_0_8px_#2997ff]" />
            <span className="hidden lg:inline-block text-[11px] font-mono uppercase tracking-wider text-[#86868b] pl-2 border-l border-white/10">
              SQL & Database Engineer
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-[#86868b] hover:text-[#f5f5f7] hover:bg-white/[0.04]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* CTA Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={personalInfo.resumeUrl}
              download={personalInfo.resumeFilename}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <span>Resume</span>
              <Download size={12} className="text-[#2997ff] group-hover:translate-y-0.5 transition-transform" />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-[#0071e3] hover:bg-[#0077ed] transition-all duration-200 shadow-[0_2px_14px_rgba(0,113,227,0.4)] cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-full text-slate-300 bg-white/[0.05] border border-white/10 focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu (rendered outside <header> so backdrop-blur on <header> never traps position: fixed) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 pt-[68px] pb-8 bg-[#000000]/95 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86868b] px-3 mb-2">
                Navigation
              </span>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`text-left text-lg font-semibold px-4 py-3 rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? 'text-white bg-white/[0.08] border border-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={personalInfo.resumeUrl}
                  download={personalInfo.resumeFilename}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-slate-200 bg-white/[0.06] border border-white/10"
                >
                  <Download size={14} className="text-[#2997ff]" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollTo('contact')}
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white bg-[#0071e3] cursor-pointer"
                >
                  Get in Touch
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
