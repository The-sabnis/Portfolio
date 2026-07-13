import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, RoundedBox, Sphere, Cylinder } from '@react-three/drei';
import { motion, useScroll, useTransform, animate, useInView } from 'framer-motion';
import {
  Database, Play, Sun, Moon,
  CheckCircle2, ArrowRight, Code, ExternalLink, Mail, Phone, MapPin, Layout, Activity, Cpu, Award
} from 'lucide-react';

// ==========================================
// 1. 3D VISUALS
// ==========================================

function SoftDatabase({ isDark }) {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
  });

  const materialProps = { roughness: 0.2, metalness: 0.1, clearcoat: 0.3 };

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <Cylinder args={[1.5, 1.5, 0.6, 32]} position={[0, 1.2, 0]}>
        <meshPhysicalMaterial color={isDark ? "#8B5CF6" : "#A78BFA"} {...materialProps} />
      </Cylinder>
      <Cylinder args={[1.5, 1.5, 0.6, 32]} position={[0, 0.4, 0]}>
        <meshPhysicalMaterial color={isDark ? "#00D4C8" : "#2DD4BF"} {...materialProps} />
      </Cylinder>
      <Cylinder args={[1.5, 1.5, 0.6, 32]} position={[0, -0.4, 0]}>
        <meshPhysicalMaterial color={isDark ? "#F5A623" : "#FBBF24"} {...materialProps} />
      </Cylinder>
      <Float speed={3} rotationIntensity={2} floatIntensity={3} position={[-2, 2, 1]}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.2}>
          <meshPhysicalMaterial color="#ff7eb3" {...materialProps} />
        </RoundedBox>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2} position={[2.5, 1.5, 0]}>
        <Sphere args={[0.5, 32, 32]}>
          <meshPhysicalMaterial color="#7df9ff" {...materialProps} />
        </Sphere>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5} position={[-1.5, -1, 1.5]}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.15}>
          <meshPhysicalMaterial color="#a78bfa" {...materialProps} />
        </RoundedBox>
      </Float>
    </group>
  );
}

// ==========================================
// 2. UI COMPONENTS
// ==========================================

function AnimatedCounter({ from, to, suffix = "", label, isDark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate: (val) => setValue(Math.floor(val))
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return (
    <div className={`p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-2 transition-transform duration-300 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div ref={ref} className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-2">
        {value}{suffix}
      </div>
      <div className={`text-sm font-semibold tracking-wider uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
    </div>
  );
}

function TypewriterText({ strings }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % strings.length), 3000);
    return () => clearInterval(interval);
  }, [strings]);

  return (
    <div className="h-8 overflow-hidden relative">
      <motion.div
        key={index}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl md:text-2xl font-medium text-purple-400"
      >
        {strings[index]}
      </motion.div>
    </div>
  );
}

function TerminalWindow({ isDark }) {
  const lines = [
    "> Connecting to SQL Server...",
    "> Analyzing data structures...",
    "> Initializing ETL pipelines...",
    "> Candidate Found: Sarvesh Sabnis",
    "> Status: Available For Hire"
  ];
  return (
    <div className={`rounded-xl overflow-hidden mt-8 max-w-lg border ${isDark ? 'bg-slate-900/80 border-cyan-500/30' : 'bg-slate-50 border-slate-200'}`}>
      <div className={`px-4 py-2 flex gap-2 border-b ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>
      <div className="p-6 font-mono text-sm md:text-base space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.8 + 0.5 }}
            className={
              i === 3 ? "text-cyan-500 font-bold" :
              i === 4 ? "text-green-500 font-bold" :
              isDark ? "text-slate-400" : "text-slate-500"
            }
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-cyan-500 ml-1"
        />
      </div>
    </div>
  );
}

function FlipCard({ title, icon, items, isDark }) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className="relative h-64 w-full cursor-pointer group"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div
          className={`absolute w-full h-full rounded-2xl border flex flex-col items-center justify-center p-6 transition-colors ${isDark ? 'bg-slate-900/60 border-slate-700 group-hover:border-cyan-500/50' : 'bg-white border-slate-200 group-hover:border-cyan-400'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${isDark ? 'bg-cyan-500/10 text-cyan-400' : 'bg-cyan-50 text-cyan-600'}`}>{icon}</div>
          <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h3>
          <div className="mt-4 text-xs text-cyan-500 tracking-widest uppercase">Hover to reveal</div>
        </div>
        {/* Back */}
        <div
          className={`absolute w-full h-full rounded-2xl border p-6 flex flex-col justify-center ${isDark ? 'bg-slate-900/80 border-purple-500/30' : 'bg-white border-purple-200'}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-lg font-bold text-purple-400 mb-4 border-b border-slate-200/10 pb-2">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className={`text-sm flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ==========================================
// 3. FULLSCREEN EXPAND → CONTRACT EXPERIENCE CONSOLE
// ==========================================

function ExpandingExperienceConsole({ isDark, jobs }) {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Starts fullscreen (scale 1), contracts to 0.78 as you scroll in,
  // stays contracted while you read, fades out at the end
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.9], [1, 0.78, 0.78, 0.68]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.78, 0.95], [0, 1, 1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.2], [0, 20]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <div id="experience" ref={targetRef} className="relative h-[320vh] w-full">
      {/* Sticky wrapper — fills the viewport while pinned */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden">

        {/* Section title fades in above the console */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="text-center pt-6 pb-3 z-10 relative w-full"
        >
          <p className="text-sm font-bold text-purple-400 tracking-widest uppercase mb-1">Career Journey</p>
          <h3 className="text-4xl font-bold text-white tracking-tight">Professional Experience</h3>
        </motion.div>

        {/* The console panel — starts edge-to-edge, then shrinks with rounded corners */}
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
            height: 'calc(100vh - 80px)',
            transformOrigin: 'top center',
          }}
          className={`w-full flex flex-col border shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-[#0d1117] border-slate-800'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Console title bar */}
          <div className={`flex items-center px-4 py-3 border-b flex-shrink-0 ${isDark ? 'border-slate-800 bg-[#161b22]' : 'border-slate-100 bg-slate-50'}`}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className={`mx-auto text-xs font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              sql_console — SarveshSabnis.ExecutionHistory
            </div>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 p-6 md:p-10 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: isDark ? '#334155 transparent' : '#cbd5e1 transparent' }}>
            <div className={`font-mono text-sm sm:text-base mb-10 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
              <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>SELECT</span> Role, Company, Description <br />
              <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>FROM</span> career_experience <br />
              <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>WHERE</span> Candidate = <span className={isDark ? 'text-yellow-400' : 'text-amber-600'}>'Sarvesh Sabnis'</span> <br />
              <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>ORDER BY</span> StartDate <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>DESC</span>;
              <br /><br />
              <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>-- Executing query (0.024s)...</span><br />
              <span className="text-green-500">{'>'} 3 rows returned. Rendering dataset:</span>
            </div>

            <div className={`space-y-12 relative border-l ml-4 md:ml-6 pl-8 md:pl-10 font-sans ${isDark ? 'border-slate-700' : 'border-slate-300'}`}>
              {jobs.map((exp, i) => (
                <div key={i} className="relative">
                  <div className={`absolute w-4 h-4 border-2 border-cyan-500 rounded-full -left-[41px] md:-left-[49px] top-1 ${isDark ? 'bg-slate-900' : 'bg-white'}`} />
                  <span className={`inline-block px-3 py-1 rounded-full border text-xs font-bold tracking-wider mb-3 ${isDark ? 'bg-purple-500/10 border-purple-500/30 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'}`}>
                    {exp.date}
                  </span>
                  <h4 className={`text-xl md:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{exp.title}</h4>
                  <div className="text-sm font-semibold text-cyan-500 mb-4">{exp.company}</div>
                  <p className={`leading-relaxed text-sm md:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

// ==========================================
// 4. MAIN APP
// ==========================================

export default function PortfolioApp() {
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  const theme = {
    bg: isDark ? 'bg-[#181a20]' : 'bg-[#f1f5f9]',
    textMain: isDark ? 'text-white' : 'text-slate-900',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
    cardBg: isDark ? 'bg-[#22252e]' : 'bg-white',
    cardBorder: isDark ? 'border-slate-800' : 'border-slate-200',
    accent: isDark ? 'text-purple-400' : 'text-purple-600',
    btnPrimary: 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white',
    btnSecondary: isDark
      ? 'bg-[#22252e] hover:bg-[#2d313c] text-white border border-slate-700'
      : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 shadow-sm',
  };

  const jobsData = [
    {
      date: "June 2024 – Present",
      title: "Software Engineer - SQL",
      company: "Mograsys Technologies Ltd. | Margao",
      desc: "Collaborated with analysts to translate data requirements into scalable SQL-based data models. Designed schemas, staging tables, and dimensional models. Built and optimized ETL pipelines from OLTP systems, implemented rigorous data quality checks, and automated workflows using SQL Server Jobs."
    },
    {
      date: "Dec 2023 – June 2024",
      title: "Intern Software Developer",
      company: "Mograsys Technologies Ltd. | Margao",
      desc: "Prepared analytics-ready datasets to enable dashboards and self-serve reporting. Troubleshot production data issues independently. Worked with SQL, Angular, and Jenkins, focusing on frontend development using CSS and continuous integration practices."
    },
    {
      date: "Aug 2022 – Oct 2022",
      title: "Intern Frontend Developer",
      company: "Onstro | Verna Goa",
      desc: "Developed a recipe-finding application (FOODWISE) and a robust time-tracking system (HUBSTAFF). Designed wireframes, engineered responsive cross-device UIs, and generated automated salary slips based on employee check-in data."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${theme.bg} ${theme.textMain}`}>

      {/* Subtle mouse glow — dark mode only, very low opacity */}
      {isDark && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-50"
          animate={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.04), transparent 40%)`
          }}
        />
      )}

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${isDark ? 'border-white/5 bg-[#181a20]/80' : 'border-black/5 bg-[#f1f5f9]/80'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            Sarvesh<span className="text-[#8B5CF6]">.</span>
          </div>
          <div className="flex items-center gap-8">
            <div className={`hidden md:flex gap-6 text-sm font-medium ${theme.textMuted}`}>
              <button onClick={() => scrollToSection('experience')} className="hover:text-[#8B5CF6] transition-colors">Experience</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-[#8B5CF6] transition-colors">Projects</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-[#8B5CF6] transition-colors">Skills</button>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-200 text-slate-600'}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a
              href="/Sarvesh_Sabnis_Resume.pdf"
              download
              className="hidden md:block px-5 py-2 text-sm font-semibold rounded-full border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white transition-all"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      {/* ── 3D CANVAS BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={isDark ? 0.4 : 0.8} />
          <directionalLight position={[10, 10, 5]} intensity={isDark ? 1 : 1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -5]} intensity={isDark ? 0.5 : 1} color="#8B5CF6" />
          <Environment preset="city" />
          <SoftDatabase isDark={isDark} />
          <ContactShadows position={[0, -2, 0]} opacity={isDark ? 0.4 : 0.2} scale={10} blur={2} far={4} />
        </Canvas>
      </div>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-500 text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> Available for hire
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
                Query faster <br />
                with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#00D4C8]">Sarvesh.</span>
              </h1>
              <h2 className={`text-xl md:text-2xl font-bold mb-2 ${theme.textMuted}`}>Computer Engineer | SQL Developer | Data Analyst</h2>
              <TypewriterText strings={["Transforming Raw Data into Business Insights", "Building Scalable Data Solutions", "Turning Complex Data into Decisions"]} />

              <TerminalWindow isDark={isDark} />

              <div className="flex flex-wrap items-center gap-4 mt-10">
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`px-8 py-4 rounded-full font-bold transition-transform hover:-translate-y-1 ${theme.btnPrimary}`}
                >
                  Hire Me
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={`px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-transform hover:-translate-y-1 ${theme.btnSecondary}`}
                >
                  <ArrowRight size={18} className={theme.accent} /> Discover More
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-12">
                {['MS SQL', 'MySQL', 'T-SQL', 'Python', 'Angular', 'Tableau', 'Excel', 'Figma'].map(tech => (
                  <span
                    key={tech}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${isDark ? 'bg-slate-800/60 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-600'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right side chips */}
            <div className="relative h-[400px] w-full lg:h-[600px] flex flex-col justify-between items-end pointer-events-none py-12">
              <div className={`p-4 text-right pointer-events-auto backdrop-blur-md rounded-xl border ${isDark ? 'border-purple-500/20 bg-slate-900/40' : 'border-purple-200 bg-white/70'}`}>
                <div className={`font-bold text-lg flex items-center gap-2 justify-end ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
                  <MapPin className="w-5 h-5" /> Goa, India
                </div>
                <div className={`text-sm mt-1 ${theme.textMuted}`}>Open to Remote Opportunities</div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`p-3 rounded-2xl backdrop-blur-xl border flex items-center gap-3 shadow-xl ${isDark ? 'bg-[#2a2d3a]/80 border-white/5' : 'bg-white/90 border-slate-200'}`}
              >
                <div className="w-8 h-8 rounded-full bg-[#00D4C8] flex items-center justify-center">
                  <Database size={14} color="#fff" />
                </div>
                <div className={`w-12 h-2 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── KPI SECTION ── */}
        <section className="py-12 px-6 md:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatedCounter from={0} to={1} suffix="+" label="Years Experience" isDark={isDark} />
            <AnimatedCounter from={0} to={4} suffix="+" label="Languages Known" isDark={isDark} />
            <AnimatedCounter from={0} to={8} suffix=".21" label="B.E. CGPA" isDark={isDark} />
            <AnimatedCounter from={0} to={5} suffix="+" label="ETL Pipelines" isDark={isDark} />
            <div className={`p-6 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1 rounded-2xl border ${isDark ? 'border-purple-500/30 bg-slate-900/50' : 'border-purple-200 bg-purple-50'}`}>
              <Database className={`w-8 h-8 mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`}>SQL Specialist</div>
            </div>
            <div className={`p-6 flex flex-col items-center justify-center text-center col-span-2 md:col-span-1 rounded-2xl border ${isDark ? 'border-cyan-500/30 bg-slate-900/50' : 'border-cyan-200 bg-cyan-50'}`}>
              <Activity className={`w-8 h-8 mb-2 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
              <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`}>Data Analyst</div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24 px-6 md:px-24">
          <div className={`max-w-7xl mx-auto border p-8 md:p-16 rounded-3xl overflow-hidden relative backdrop-blur-xl ${isDark ? 'bg-[#181a20]/60 border-white/10' : 'bg-white/80 border-slate-200'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-4 flex flex-col items-center">
                <div className={`w-full aspect-square rounded-2xl border overflow-hidden relative flex items-center justify-center ${isDark ? 'border-cyan-500/30 bg-gradient-to-br from-slate-800 to-slate-900' : 'border-cyan-300 bg-gradient-to-br from-slate-100 to-slate-200'}`}>
                  <div className="text-center">
                    <Database size={64} className={`mx-auto mb-4 ${isDark ? 'text-cyan-400/50' : 'text-cyan-500/40'}`} />
                    <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Sarvesh_Sabnis</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 flex flex-col justify-center">
                <h2 className="text-sm font-bold text-cyan-500 tracking-widest uppercase mb-2">Executive Summary</h2>
                <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>Innovative & Passionate Problem Solver.</h3>
                <p className={`text-lg leading-relaxed mb-8 ${theme.textMuted}`}>
                  I am a highly motivated Computer Engineer eager to apply my technical expertise, creativity, and problem-solving skills to drive organizational success. I am dedicated, precise, and collaborative, bringing a positive attitude that actively fosters productive teamwork.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["SQL Development", "Data Analytics", "ETL Pipelines", "Frontend Engineering", "Query Optimization", "Cross-functional Collaboration"].map((highlight, i) => (
                    <div key={i} className={`flex items-center gap-3 font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                      <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULLSCREEN EXPERIENCE CONSOLE ── */}
        <ExpandingExperienceConsole isDark={isDark} jobs={jobsData} />

        {/* ── SKILLS (FLIP CARDS) ── */}
        <section id="skills" className="py-24 px-6 md:px-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm font-bold text-cyan-500 tracking-widest uppercase mb-2 text-center">Technical Arsenal</h2>
            <h3 className={`text-4xl font-bold mb-16 text-center tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Core Competencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FlipCard isDark={isDark} title="Database Architecture" icon={<Database size={32} />} items={["MS SQL Server", "MySQL", "T-SQL Scripting", "ETL Pipelines"]} />
              <FlipCard isDark={isDark} title="Frontend Engineering" icon={<Layout size={32} />} items={["JavaScript", "Angular", "HTML5", "CSS3 & Responsive UI"]} />
              <FlipCard isDark={isDark} title="Data Tools & Design" icon={<Cpu size={32} />} items={["Python", "Tableau", "Advanced Excel", "Figma Wireframing"]} />
            </div>
          </div>
        </section>

        {/* ── PROJECTS (BENTO GRID) ── */}
        <section id="projects" className="py-24 px-6 md:px-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-sm font-bold tracking-widest uppercase mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Portfolio</h2>
            <h3 className={`text-4xl font-bold mb-12 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Featured Implementations</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">

              {/* Card 1 - Wide */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`md:col-span-2 rounded-2xl p-8 border group relative overflow-hidden flex flex-col justify-end ${isDark ? 'bg-slate-900/60 border-cyan-500/20' : 'bg-white border-cyan-200'}`}
              >
                <div className={`absolute inset-0 z-10 ${isDark ? 'bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent' : 'bg-gradient-to-t from-white via-white/80 to-transparent'}`} />
                <div className="absolute top-6 right-6 z-20">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-700'}`}>Backend Automation</span>
                </div>
                <div className="relative z-20">
                  <h4 className={`text-2xl font-bold mb-2 group-hover:text-cyan-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Automated Daily Work Report System</h4>
                  <p className={`mb-4 line-clamp-2 ${theme.textMuted}`}>Developed an automated reporting system using Supabase and PostgreSQL. Implemented Edge Functions, Gmail SMTP delivery, and pg_cron for seamless task management.</p>
                  <div className="flex flex-wrap gap-2">
                    {['PostgreSQL', 'Supabase', 'TypeScript', 'pg_cron'].map(t => (
                      <span key={t} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 2 - Tall */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`md:col-span-1 md:row-span-2 rounded-2xl p-8 border group flex flex-col ${isDark ? 'bg-slate-900/60 border-purple-500/20' : 'bg-white border-purple-200'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isDark ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                  <Activity size={24} />
                </div>
                <h4 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>HUBSTAFF Engine</h4>
                <p className={`mb-6 flex-grow ${theme.textMuted}`}>Built a comprehensive time-tracking system to record employee check-in/check-out times, integrating automated salary slip generation based on logged work hours. Streamlined the flow for HR personnel.</p>
                <div className="flex flex-wrap gap-2">
                  {['Time Tracking', 'UI/UX', 'Frontend'].map(t => (
                    <span key={t} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                whileHover={{ y: -5 }}
                className={`md:col-span-2 rounded-2xl p-8 border group ${isDark ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white border-slate-200'}`}
              >
                <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>FOODWISE Platform</h4>
                <p className={`text-sm mb-4 ${theme.textMuted}`}>Developed a highly interactive recipe-finding application enabling users to seamlessly select ingredients and discover matching recipes. Spearheaded the UI/UX design and wireframing for an optimal user experience.</p>
                <div className="flex flex-wrap gap-2">
                  {['Wireframing', 'UI/UX Design', 'Frontend Development'].map(t => (
                    <span key={t} className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS & ACADEMICS ── */}
        <section className="py-24 px-6 md:px-24 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h3 className={`text-3xl font-bold mb-12 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Education & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-cyan-500/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Award className="text-cyan-500 mb-4" size={28} />
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>IBM Python 101</h4>
                <p className={`text-sm ${theme.textMuted}`}>Data Science • Completed 2022</p>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-purple-500/20' : 'bg-white border-slate-200 shadow-sm'}`}>
                <Award className="text-purple-500 mb-4" size={28} />
                <h4 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Business Intelligence Analyst</h4>
                <p className={`text-sm ${theme.textMuted}`}>Udemy • Ongoing</p>
              </div>
              <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-2">8.21 CGPA</div>
                <h4 className={`text-lg font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>B.E. Computer Science</h4>
                <p className={`text-xs ${theme.textMuted}`}>Shree Rayeshwar Institute of Engineering (2019–2023)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className={`py-24 border-t relative z-10 ${isDark ? 'border-white/5 bg-[#12141a]' : 'border-slate-200 bg-slate-100'}`}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className={`text-4xl font-bold mb-6 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Ready to optimize your data?</h2>
            <p className={`text-lg mb-12 ${theme.textMuted}`}>Available for SQL Developer, Data Analyst, or Frontend roles.</p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a
                href="mailto:sarveshsabnis333@gmail.com"
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm'}`}
              >
                <Mail size={18} className={theme.accent} /> sarveshsabnis333@gmail.com
              </a>
              <div className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium ${isDark ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}>
                <Phone size={18} className={theme.accent} /> +91 97643 14857
              </div>
              <div className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium ${isDark ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'}`}>
                <MapPin size={18} className={theme.accent} /> Goa, India
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <a
                href="https://linkedin.com/in/sarveshsabnis"
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-[#8B5CF6] text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B5CF6] hover:text-[#8B5CF6] shadow-sm'}`}
              >
                <ExternalLink size={20} />
              </a>
              <a
                href="https://github.com/The-sabnis"
                target="_blank"
                rel="noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-slate-800 hover:bg-[#8B5CF6] text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#8B5CF6] hover:text-[#8B5CF6] shadow-sm'}`}
              >
                <Code size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={`py-8 text-center border-t relative z-10 ${isDark ? 'border-slate-800/50 text-slate-500' : 'border-slate-200 text-slate-400'}`}>
          <p className="text-sm font-mono tracking-widest uppercase">© {new Date().getFullYear()} Sarvesh Sabnis. Data & Design.</p>
        </footer>

      </div>
    </div>
  );
}