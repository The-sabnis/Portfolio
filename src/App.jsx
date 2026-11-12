import { useEffect } from 'react';
import Navbar from './components/sections/Navbar';
import HeroSection from './components/sections/HeroSection';
import StatsRow from './components/sections/StatsRow';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

export default function App() {
  // Smooth scroll and meta setup
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-100 font-sans selection:bg-[#2997ff]/30 selection:text-white antialiased overflow-x-clip">
      {/* Ambient background illumination */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(41,151,255,0.06),transparent_70%)] blur-[100px]" />
        <div className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.03),transparent_70%)] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.03),transparent_70%)] blur-[100px]" />
      </div>

      {/* Primary Navigation */}
      <Navbar />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        <HeroSection />
        <StatsRow />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
