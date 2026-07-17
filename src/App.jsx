import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, animate, useInView, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import {
  Database, Sun, Moon,
  CheckCircle2, ArrowRight, Code, Mail, Phone, MapPin, Layout, Activity, Cpu, Award,
  Zap, Send, Search, Menu, X,
} from 'lucide-react';

// ─────────────────────────────────────────
// THEME TOKENS
// ─────────────────────────────────────────
const DARK = {
  bg:          '#0f1117',
  surface:     '#161b27',
  surfaceAlt:  '#1e2536',
  border:      '#2a3347',
  borderAccent:'#7c3aed',
  text:        '#e2e8f5',
  textMuted:   '#7a8aaa',
  accent:      '#a78bfa',   // violet
  accentCyan:  '#22d3ee',   // cyan
  accentGreen: '#34d399',
  pill:        '#1e2536',
  pillText:    '#a78bfa',
  btnPrimary:  'linear-gradient(135deg,#7c3aed,#0ea5e9)',
  consoleBg:   '#0d1117',
  consoleBar:  '#161b22',
  consoleBorder:'#30363d',
  timelineLine:'#2a3347',
  timelineDot: '#22d3ee',
  // depth shadows — dark mode leans on soft black + a faint colored glow
  shadowSm: '0 8px 24px -12px rgba(0,0,0,0.55)',
  shadowMd: '0 20px 45px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.06)',
  shadowLg: '0 30px 70px -20px rgba(0,0,0,0.65), 0 0 40px -12px rgba(124,58,237,0.18)',
  glow:     '0 0 32px -6px rgba(34,211,238,0.35)',
};
const LIGHT = {
  bg:           '#f4f6fc',          // cool-white page bg
  surface:      '#ffffff',           // card bg
  surfaceAlt:   '#eef1fb',          // subtle tinted bg for code blocks
  border:       '#d8deee',          // visible but soft border
  borderAccent: '#7c3aed',
  text:         '#0f1629',          // near-black for headings
  textMuted:    '#556080',          // readable body/muted text
  accent:       '#6d28d9',          // deep violet — readable on white
  accentCyan:   '#0369a1',          // deep sky-blue — readable on white
  accentGreen:  '#047857',          // deep emerald
  pill:         '#ede9fe',
  pillText:     '#5b21b6',
  btnPrimary:   'linear-gradient(135deg,#6d28d9,#0369a1)',
  consoleBg:    '#ffffff',
  consoleBar:   '#f1f4fd',          // very light lavender bar
  consoleBorder:'#c7d0e8',
  timelineLine: '#c7d0e8',
  timelineDot: '#0369a1',
  // depth shadows — light mode needs real, layered shadows or everything reads flat
  shadowSm: '0 8px 20px -10px rgba(15,22,41,0.10), 0 2px 6px rgba(15,22,41,0.04)',
  shadowMd: '0 22px 48px -18px rgba(15,22,41,0.16), 0 4px 12px rgba(15,22,41,0.06)',
  shadowLg: '0 34px 70px -20px rgba(15,22,41,0.20), 0 8px 20px rgba(15,22,41,0.08)',
  glow:     '0 0 32px -8px rgba(3,105,161,0.25)',
};

// ─────────────────────────────────────────
// TILT CARD — generic mouse-tracking 3D tilt
// wrapper. Wrap any card in this to give it
// real perspective depth on hover, in both
// themes (relies on shadow tokens, not color).
// ─────────────────────────────────────────
function TiltCard({ children, t, className = '', style = {}, strength = 10, lift = 10, glow = false }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 220, damping: 20, mass: 0.6 });
  const springRy = useSpring(ry, { stiffness: 220, damping: 20, mass: 0.6 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * strength);
    rx.set(py * -strength);
  };
  const handleLeave = () => {
    setHovering(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        ...style,
        rotateX: springRx,
        rotateY: springRy,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
        boxShadow: hovering ? (glow ? `${t.shadowLg}, ${t.glow}` : t.shadowLg) : t.shadowSm,
        transition: 'box-shadow 0.35s ease',
        y: hovering ? -lift : 0,
      }}
    >
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// REVEAL 3D — scroll-triggered entrance that
// rotates content in from a slight tilt, so
// sections feel like they're arriving in
// physical space rather than just fading up.
// ─────────────────────────────────────────
function Reveal3D({ children, delay = 0, y = 50, tilt = 12, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-90px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, rotateX: tilt }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformPerspective: 1200, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────
// GRADIENT TEXT — small helper that renders
// reliably in BOTH themes. The bug in the
// screenshot (solid block instead of clipped
// text) happens because only the -webkit-
// prefixed background-clip was set; without
// the standard property + inline-block box,
// some engines paint the full background box
// instead of clipping it to the glyphs.
// ─────────────────────────────────────────
function GradientText({ children, from, to, as: Tag = 'span', style = {}, className = '' }) {
  return (
    <Tag
      className={className}
      style={{
        backgroundImage: `linear-gradient(135deg,${from},${to})`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────
// ORBIT RINGS — thin tilted rings that spin
// continuously around the central 3D model,
// each at a different speed / axis.
// ─────────────────────────────────────────
function OrbitRing({ radius, tube, tilt, speed, color, offset = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed + offset;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, tube, 16, 100]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

function OrbitingRings({ isDark }) {
  return (
    <group>
      <OrbitRing radius={3.5} tube={0.02} tilt={[Math.PI / 2.4, 0, 0]} speed={0.25} color={isDark ? '#22d3ee' : '#0369a1'} />
      <OrbitRing radius={4.0} tube={0.015} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.18} color={isDark ? '#a78bfa' : '#6d28d9'} offset={1.5} />
      <OrbitRing radius={4.4} tube={0.012} tilt={[Math.PI / 3, -0.3, 0.2]} speed={0.12} color={isDark ? '#34d399' : '#047857'} offset={3} />

      {/* Pulsing wireframe core — the "data hub" everything orbits */}
      <DataCore isDark={isDark} />

      {/* Glowing packets flowing along each ring, as if data were streaming through the pipeline */}
      <DataPacket radius={3.5} tilt={[Math.PI / 2.4, 0, 0]} speed={0.25} offset={0} color={isDark ? '#22d3ee' : '#0369a1'} />
      <DataPacket radius={3.5} tilt={[Math.PI / 2.4, 0, 0]} speed={0.25} offset={Math.PI} color={isDark ? '#22d3ee' : '#0369a1'} />
      <DataPacket radius={4.0} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.18} offset={1.5} color={isDark ? '#a78bfa' : '#6d28d9'} />
      <DataPacket radius={4.0} tilt={[Math.PI / 1.8, 0.4, 0]} speed={-0.18} offset={1.5 + Math.PI} color={isDark ? '#a78bfa' : '#6d28d9'} />
      <DataPacket radius={4.4} tilt={[Math.PI / 3, -0.3, 0.2]} speed={0.12} offset={3} color={isDark ? '#34d399' : '#047857'} />
      <DataPacket radius={4.4} tilt={[Math.PI / 3, -0.3, 0.2]} speed={0.12} offset={3 + Math.PI} color={isDark ? '#34d399' : '#047857'} />
    </group>
  );
}

// ─────────────────────────────────────────
// DATA CORE — a slow-spinning, pulsing
// wireframe icosahedron at the center of the
// orbit — reads as a "data hub" the pipelines
// feed into, tying the whole scene back to
// the SQL/ETL theme instead of social icons.
// ─────────────────────────────────────────
function DataCore({ isDark }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    ref.current.rotation.x = state.clock.elapsedTime * 0.09;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.08;
    ref.current.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshPhysicalMaterial
        color={isDark ? '#a78bfa' : '#6d28d9'}
        wireframe
        emissive={isDark ? '#22d3ee' : '#0369a1'}
        emissiveIntensity={0.7}
        roughness={0.2}
        metalness={0.7}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────
// DATA PACKET — a small glowing orb that
// streams along a ring path, pulsing gently,
// suggesting data flowing through a pipeline.
// ─────────────────────────────────────────
function DataPacket({ radius, tilt, speed, offset = 0, color }) {
  const ref = useRef();
  useFrame((state) => {
    const angle = state.clock.elapsedTime * speed + offset;
    ref.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    const s = 1 + Math.sin(state.clock.elapsedTime * 3 + offset) * 0.3;
    ref.current.scale.setScalar(s);
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.15} metalness={0.3} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────
// ANIMATED COUNTER (now with real 3D tilt)
// ─────────────────────────────────────────
function AnimatedCounter({ from, to, suffix='', label, t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (inView) {
      const c = animate(from, to, { duration: 2.5, ease: 'easeOut', onUpdate: v => setValue(Math.floor(v)) });
      return () => c.stop();
    }
  }, [from, to, inView]);
  return (
    <div ref={ref}>
      <TiltCard t={t} strength={12} lift={6} className="rounded-2xl">
        <div
          style={{ background: t.surface, border: `1px solid ${t.border}` }}
          className="p-4 h-28 flex flex-col items-center justify-center text-center rounded-2xl"
        >
          <div className="text-2xl md:text-3xl font-black mb-1">
            <GradientText from={t.accentCyan} to={t.accent}>{value}{suffix}</GradientText>
          </div>
          <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: t.textMuted }}>{label}</div>
        </div>
      </TiltCard>
    </div>
  );
}

// ─────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────
function TypewriterText({ strings, t }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(p => (p+1) % strings.length), 3200);
    return () => clearInterval(id);
  }, [strings]);
  return (
    <div className="h-8 overflow-hidden">
      <motion.div key={i}
        initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.45 }}
        className="text-lg md:text-xl font-medium" style={{ color: t.accent }}>
        {strings[i]}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// TERMINAL WINDOW (hero)
// ─────────────────────────────────────────
function TerminalWindow({ t }) {
  const lines = [
    { text:'> Connecting to SQL Server...', color: t.textMuted },
    { text:'> Analyzing data structures...', color: t.textMuted },
    { text:'> Initializing ETL pipelines...', color: t.textMuted },
    { text:'> Candidate Found: Sarvesh Sabnis', color: t.accentCyan },
    { text:'> Status: Available For Hire ✓', color: t.accentGreen },
  ];
  return (
    <TiltCard t={t} strength={6} lift={4} className="mt-8 max-w-lg rounded-xl">
      <div className="rounded-xl overflow-hidden" style={{ border:`1px solid ${t.border}`, background: t.consoleBg }}>
        <div className="px-4 py-2.5 flex gap-2 items-center" style={{ background: t.consoleBar, borderBottom:`1px solid ${t.border}` }}>
          <div className="w-3 h-3 rounded-full bg-red-500"/>
          <div className="w-3 h-3 rounded-full bg-yellow-400"/>
          <div className="w-3 h-3 rounded-full bg-green-500"/>
          <span className="ml-3 text-xs font-mono" style={{ color: t.textMuted }}>sql_terminal</span>
        </div>
        <div className="p-5 font-mono text-sm space-y-2">
          {lines.map((l, idx) => (
            <motion.div key={idx}
              initial={{ opacity:0, x:-8 }} animate={{ opacity:1, x:0 }} transition={{ delay: idx*0.7+0.3 }}
              style={{ color: l.color }}>
              {l.text}
            </motion.div>
          ))}
          <motion.span animate={{ opacity:[1,0] }} transition={{ repeat:Infinity, duration:0.8 }}
            className="inline-block w-2 h-4 rounded-sm ml-1" style={{ background: t.accentCyan }}/>
        </div>
      </div>
    </TiltCard>
  );
}

// ─────────────────────────────────────────
// FLIP CARD
// ─────────────────────────────────────────
function FlipCard({ title, icon, items, t }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="relative h-64 w-full cursor-pointer" style={{ perspective:'1000px' }}
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div className="w-full h-full relative" style={{ transformStyle:'preserve-3d', boxShadow: flipped ? t.shadowLg : t.shadowSm, borderRadius: '1rem', transition: 'box-shadow 0.4s ease' }}
        animate={{ rotateY: flipped ? 180 : 0, y: flipped ? -6 : 0 }} transition={{ duration:0.55, type:'spring', stiffness:260, damping:22 }}>
        {/* Front */}
        <div className="absolute w-full h-full rounded-2xl flex flex-col items-center justify-center p-6 transition-colors"
          style={{ backfaceVisibility:'hidden', background: t.surface, border:`1px solid ${t.border}` }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background:`${t.accentCyan}18`, color: t.accentCyan }}>{icon}</div>
          <h3 className="text-lg font-bold" style={{ color: t.text }}>{title}</h3>
          <p className="mt-3 text-xs tracking-widest uppercase" style={{ color: t.textMuted }}>Hover to reveal</p>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full rounded-2xl p-6 flex flex-col justify-center"
          style={{ backfaceVisibility:'hidden', transform:'rotateY(180deg)', background: t.surfaceAlt, border:`1px solid ${t.borderAccent}44` }}>
          <h3 className="text-base font-bold mb-3 pb-2" style={{ color: t.accent, borderBottom:`1px solid ${t.border}` }}>{title}</h3>
          <ul className="space-y-2">
            {items.map((item,i) => (
              <li key={i} className="text-sm flex items-center gap-2" style={{ color: t.text }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: t.accent }}/> {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────
// EXPERIENCE TIMELINE — 3D reveal, no 3D canvas
// ─────────────────────────────────────────
function ExperienceItem({ exp, t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ borderLeft: `2px solid ${t.timelineLine}`, transformPerspective: 900 }}
      className="relative pl-8 pb-10 last:pb-0"
    >
      <div
        className="absolute -left-[9px] top-1 w-4 h-4 rounded-full"
        style={{
          background: t.bg,
          border: `2px solid ${t.timelineDot}`,
          boxShadow: `0 0 8px ${t.timelineDot}66`,
        }}
      />
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
        style={{ background: `${t.accent}18`, color: t.accent, border: `1px solid ${t.accent}40` }}
      >
        {exp.date}
      </span>
      <h4 className="text-lg font-bold mb-1" style={{ color: t.text }}>{exp.title}</h4>
      <p className="text-sm font-semibold mb-2" style={{ color: t.accentCyan }}>{exp.company}</p>
      <p className="text-sm leading-relaxed" style={{ color: t.textMuted }}>{exp.desc}</p>
    </motion.div>
  );
}

function ExperienceSection({ jobs, t }) {
  return (
    <section id="experience" className="py-20 px-5 md:px-20 relative z-10">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: t.accentCyan }}>
          Career Journey
        </p>
        <h3 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: t.text }}>
          Professional Experience
        </h3>
        <div>
          {jobs.map((exp, i) => (
            <ExperienceItem key={i} exp={exp} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────
// HERO 3D SCENE — now scroll-linked: as the
// page scrolls past the hero, the whole ring
// group scales down, drifts, and tilts, so
// the 3D-ness reads while scrolling too, not
// just from the orbit animation alone.
// ─────────────────────────────────────────
function HeroScene({ isDark, heroRef }) {
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.6, 0.25]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ scale, y: translateY, rotate, opacity, transformStyle: 'preserve-3d' }}
    >
      <Canvas
        camera={{ position:[0,0,14.5], fov:42 }}
        gl={{ alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={isDark?0.4:0.8}/>
        <directionalLight position={[10,10,5]} intensity={isDark?1:1.5} color="#ffffff"/>
        <pointLight position={[-10,-10,-5]} intensity={isDark?0.5:0.8} color="#8B5CF6"/>
        <OrbitingRings isDark={isDark}/>
      </Canvas>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// LIGHT DOTS — a handful of very faint dots
// drifting slowly. Positions fixed per-mount
// so they don't jump on re-render. Kept
// subtle on purpose — a touch, not a show.
// ─────────────────────────────────────────
const LIGHT_DOTS = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: (i * 41 + 10) % 100,
  size: 3 + ((i * 5) % 3),
  duration: 16 + (i % 4) * 4,
  delay: (i % 5) * 1.4,
}));

function LightDots({ t }) {
  return (
    <>
      {LIGHT_DOTS.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: '100%',
            width: p.size,
            height: p.size,
            background: [t.accent, t.accentCyan, t.accentGreen][p.id % 3],
          }}
          animate={{ y: ['0vh', '-110vh'], opacity: [0, 0.28, 0.28, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────────
// SCROLL AMBIENT — a simple, light background
// layer: a faint grid, two soft glows that
// ease with scroll, one gently drifting glow,
// and a few faint floating dots. Kept subtle
// on purpose — a whisper, not bubbles.
// ─────────────────────────────────────────
function ScrollAmbient({ isDark, t }) {
  const { scrollYProgress } = useScroll();
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yGlow1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yGlow2 = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* faint data-grid for a touch of depth */}
      <motion.div
        style={{
          y: yGrid,
          backgroundImage: `radial-gradient(${t.border} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          opacity: isDark ? 0.14 : 0.3,
        }}
        className="absolute inset-[-10%]"
      />
      {/* two soft, light glows — subtle wash, not a spotlight */}
      <motion.div
        style={{ y: yGlow1, background: `radial-gradient(circle, ${t.accent}14, transparent 70%)` }}
        className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: yGlow2, background: `radial-gradient(circle, ${t.accentCyan}12, transparent 70%)` }}
        className="absolute bottom-[-10%] -right-32 w-[560px] h-[560px] rounded-full blur-3xl"
      />
      {/* one very soft glow, drifting continuously and slowly — barely-there movement */}
      <motion.div
        className="absolute w-[380px] h-[380px] rounded-full blur-3xl"
        style={{
          top: '30%',
          left: '55%',
          background: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.06)' : `${t.accentGreen}10`}, transparent 70%)`,
        }}
        animate={{ x: [0, 120, -80, 0], y: [0, 90, -60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* a few faint dots drifting upward */}
      <LightDots t={t} />
    </div>
  );
}

// ─────────────────────────────────────────
// PROJECT VISUALS — small abstract mockups
// that stand in for screenshots, so project
// cards read as more than just text. Built
// from theme tokens so they always match.
// ─────────────────────────────────────────
function FlowVisual({ t }) {
  const nodes = [Database, Zap, Send];
  return (
    <div className="relative rounded-xl p-4 mb-4 flex items-center justify-between"
      style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
      {nodes.map((Icon, i) => (
        <React.Fragment key={i}>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${t.accentCyan}20`, color: t.accentCyan }}>
            <Icon size={18} />
          </div>
          {i < nodes.length - 1 && (
            <div className="flex-1 h-px mx-2 relative overflow-hidden" style={{ background: t.border }}>
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: t.accentCyan }}
                animate={{ left: ['0%', '95%'] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function BarsVisual({ t }) {
  const heights = [42, 68, 30, 82, 55, 72, 46];
  return (
    <div className="rounded-xl p-4 mb-4 flex items-end gap-1.5 h-20"
      style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
      {heights.map((h, i) => (
        <motion.div key={i} className="flex-1 rounded-t"
          style={{ background: `linear-gradient(180deg, ${t.accent}, ${t.accentCyan})` }}
          initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.05 }} />
      ))}
    </div>
  );
}

function SearchVisual({ t }) {
  return (
    <div className="rounded-xl p-4 mb-4" style={{ background: t.surfaceAlt, border: `1px solid ${t.border}` }}>
      <div className="flex items-center gap-2 px-3 py-2 rounded-full mb-3"
        style={{ background: t.surface, border: `1px solid ${t.border}` }}>
        <Search size={14} style={{ color: t.textMuted }} />
        <div className="h-2 w-24 rounded-full" style={{ background: t.border }} />
      </div>
      <div className="flex flex-wrap gap-2">
        {[t.accent, t.accentCyan, t.accentGreen, t.accent].map((c, i) => (
          <span key={i} className="w-7 h-7 rounded-full" style={{ background: `${c}30`, border: `1px solid ${c}55` }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────
// Small inline LinkedIn glyph — avoids depending on lucide-react's export list,
// which varies by version and doesn't always include "Linkedin".
function LinkedinIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.44v6.3zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/>
    </svg>
  );
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });

export default function PortfolioApp() {
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mouse, setMouse] = useState({ x:0, y:0 });
  const [heroTilt, setHeroTilt] = useState({ x:0, y:0 });
  const t = isDark ? DARK : LIGHT;
  const heroRef = useRef(null);

  useEffect(() => {
    const h = (e) => setMouse({ x:e.clientX, y:e.clientY });
    window.addEventListener('mousemove', h);
    return () => window.removeEventListener('mousemove', h);
  }, []);

  const jobs = [
    {
      date:'June 2024 – Present',
      title:'Software Engineer – SQL',
      company:'Mograsys Technologies Ltd. | Margao, Goa',
      desc:'Collaborated with business analysts to translate requirements into scalable SQL data models. Designed schemas, staging tables and dimensional models. Built and optimized ETL pipelines from OLTP systems, implemented data quality checks, and automated batch workflows using SQL Server Agent Jobs. Maintained stored procedures across sims, pays, invs and fins schemas serving thousands of daily transactions.'
    },
    {
      date:'Dec 2023 – June 2024',
      title:'Intern Software Developer',
      company:'Mograsys Technologies Ltd. | Margao, Goa',
      desc:'Prepared analytics-ready datasets powering internal dashboards and self-serve reporting. Troubleshot production data issues independently and paired with senior developers on complex debugging tasks. Worked across the full stack — SQL, Angular, and Jenkins — with a focus on frontend development and CI/CD practices.'
    },
    {
      date:'Aug 2022 – Oct 2022',
      title:'Intern Frontend Developer',
      company:'Onstro | Verna, Goa',
      desc:'Built FOODWISE, a recipe-finding app with ingredient-based search, and HUBSTAFF, a time-tracking system that auto-generated salary slips from attendance logs. Designed wireframes and responsive cross-device UIs, contributing to both product design and implementation from scratch.'
    },
  ];

  const education = [
    { icon:<Award size={26} style={{ color: DARK.accentCyan }}/>, title:'IBM Python 101', sub:'Data Science · Completed 2022' },
    { icon:<Award size={26} style={{ color: DARK.accent }}/>, title:'Business Intelligence Analyst', sub:'Udemy · Ongoing' },
    { title:'B.E. Computer Science', sub:'Shree Rayeshwar Institute (2019–2023)', cgpa: true },
  ];

  return (
    <div className="relative min-h-screen font-sans transition-colors duration-500" style={{ background: t.bg, color: t.text }}>

      <ScrollAmbient isDark={isDark} t={t} />

      {/* Subtle mouse glow — dark only */}
      {isDark && (
        <motion.div className="pointer-events-none fixed inset-0 z-50"
          animate={{ background:`radial-gradient(480px at ${mouse.x}px ${mouse.y}px,rgba(124,58,237,0.06),transparent 70%)` }}/>
      )}

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl"
        style={{ background:`${t.surface}cc`, borderBottom:`1px solid ${t.border}` }}>
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-black text-xl tracking-tight">
            Sarvesh Sabnis<span style={{ color: t.accent }}>.</span>
          </span>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex gap-5 text-sm font-medium" style={{ color: t.textMuted }}>
              {['experience','projects','skills'].map(s => (
                <button key={s} onClick={() => scrollTo(s)}
                  className="capitalize hover:opacity-100 transition-opacity"
                  style={{ opacity:0.7 }}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full transition-colors"
              style={{ background: t.surfaceAlt, color: isDark ? '#facc15':'#475569' }}>
              {isDark ? <Sun size={16}/> : <Moon size={16}/>}
            </button>
            <a href="/Sarvesh%20Sabnis.pdf" download="Sarvesh_Sabnis_Resume.pdf"
              className="hidden md:block px-4 py-1.5 text-sm font-semibold rounded-full transition-all"
              style={{ border:`1px solid ${t.accent}`, color: t.accent }}
              onMouseEnter={e => { e.currentTarget.style.background=t.accent; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=t.accent; }}>
              Resume
            </a>
            <button onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-full transition-colors"
              style={{ background: t.surfaceAlt, color: t.text }}
              aria-label="Toggle menu">
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {/* mobile dropdown — links + resume, only rendered on small screens */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: `1px solid ${t.border}`, background: t.surface }}
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {['experience','projects','skills'].map(s => (
                  <button key={s} onClick={() => { scrollTo(s); setMobileOpen(false); }}
                    className="capitalize text-left py-2.5 text-sm font-semibold rounded-lg px-2 transition-colors"
                    style={{ color: t.text }}>
                    {s}
                  </button>
                ))}
                <a href="/Sarvesh%20Sabnis.pdf" download="Sarvesh_Sabnis_Resume.pdf"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 text-center px-4 py-2.5 text-sm font-semibold rounded-full"
                  style={{ border:`1px solid ${t.accent}`, color: t.accent }}>
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="relative z-10">

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative pt-28 pb-16 px-5 min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity:0, x:-28 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7 }}>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
                style={{ border:`1px solid ${t.accentCyan}55`, background:`${t.accentCyan}14`, color: t.accentCyan }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.accentCyan }}/>
                Available for hire
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-5 tracking-tight">
                Query faster<br/>
                with{' '}
                <GradientText from={t.accent} to={t.accentCyan}>Sarvesh.</GradientText>
              </h1>

              <p className="text-base md:text-lg font-semibold mb-2" style={{ color: t.textMuted }}>
                Computer Engineer · SQL Developer · Data Analyst
              </p>
              <TypewriterText t={t} strings={[
                'Transforming Raw Data into Business Insights',
                'Building Scalable Data Pipelines',
                'Turning Complex Data into Decisions',
              ]}/>

              <TerminalWindow t={t}/>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => scrollTo('contact')}
                  className="px-7 py-3.5 rounded-full font-bold text-white text-sm transition-transform hover:-translate-y-0.5"
                  style={{ background: t.btnPrimary, boxShadow: t.shadowMd }}>
                  Hire Me
                </button>
                <button onClick={() => scrollTo('experience')}
                  className="px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5"
                  style={{ background: t.surface, border:`1px solid ${t.border}`, color: t.text, boxShadow: t.shadowSm }}>
                  <ArrowRight size={15} style={{ color: t.accent }}/> Discover More
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {['MS SQL','MySQL','T-SQL','Python','Angular','Tableau','Excel','Figma'].map(tech => (
                  <span key={tech} className="px-3 py-1 text-xs font-semibold rounded-full"
                    style={{ background: t.surfaceAlt, border:`1px solid ${t.border}`, color: t.textMuted }}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Hero right — orbiting rings with the character illustration centered inside them */}
            <div
              className="relative hidden lg:flex flex-col justify-between items-end h-[560px] py-12"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                setHeroTilt({ x: py * -10, y: px * 14 });
              }}
              onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
              style={{ perspective: '1200px' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <HeroScene isDark={isDark} heroRef={heroRef} />
              </div>

              {/* Character illustration — sits centered inside the rings, transparent PNG so it works in both themes */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{
                  transform: `rotateX(${heroTilt.x}deg) rotateY(${heroTilt.y}deg) translateZ(20px)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <img
                  src="/character-glow.png"
                  alt="3D illustration of Sarvesh working on a laptop"
                  className="w-[68%] max-w-[340px] h-auto select-none"
                  style={{ filter: isDark ? 'none' : 'drop-shadow(0 20px 32px rgba(15,22,41,0.22))' }}
                  draggable={false}
                />
              </div>

              <div className="relative p-4 text-right rounded-xl backdrop-blur-md pointer-events-auto"
                style={{ border:`1px solid ${t.border}`, background:`${t.surface}bb`, boxShadow: t.shadowSm }}>
                <p className="font-bold text-base flex items-center gap-2 justify-end" style={{ color: t.accent }}>
                  <MapPin size={16}/> Goa, India
                </p>
                <p className="text-xs mt-1" style={{ color: t.textMuted }}>Open to Remote Opportunities</p>
              </div>
              <motion.div animate={{ y:[0,-10,0] }} transition={{ duration:4, repeat:Infinity }}
                className="relative p-3 rounded-2xl flex items-center gap-3"
                style={{ background:`${t.surface}dd`, border:`1px solid ${t.border}`, boxShadow: t.shadowSm }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: t.accentCyan }}>
                  <Database size={14} color="#fff"/>
                </div>
                <div className="w-20 h-2 rounded-full" style={{ background: t.border }}/>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── KPI ROW ── */}
        <section className="py-6 px-5 md:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AnimatedCounter t={t} from={0} to={1} suffix="+" label="Years Exp."/>
            <AnimatedCounter t={t} from={0} to={4} suffix="+" label="Languages"/>
            <AnimatedCounter t={t} from={0} to={8} suffix=".21" label="B.E. CGPA"/>
            <AnimatedCounter t={t} from={0} to={5} suffix="+" label="ETL Pipelines"/>
            <TiltCard t={t} strength={12} lift={6} className="rounded-2xl col-span-1">
              <div className="p-4 h-28 rounded-2xl flex flex-col items-center justify-center text-center"
                style={{ background: t.surface, border:`1px solid ${t.border}` }}>
                <Database className="w-6 h-6 mb-1.5" style={{ color: t.accent }}/>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: t.text }}>SQL Specialist</span>
              </div>
            </TiltCard>
            <TiltCard t={t} strength={12} lift={6} className="rounded-2xl col-span-1">
              <div className="p-4 h-28 rounded-2xl flex flex-col items-center justify-center text-center"
                style={{ background: t.surface, border:`1px solid ${t.border}` }}>
                <Activity className="w-6 h-6 mb-1.5" style={{ color: t.accentCyan }}/>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: t.text }}>Data Analyst</span>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-20 px-5 md:px-20">
          <Reveal3D className="max-w-7xl mx-auto">
            <div className="rounded-3xl p-8 md:p-14"
              style={{ background: t.surface, border:`1px solid ${t.border}`, boxShadow: t.shadowMd }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <TiltCard t={t} strength={14} lift={4} className="rounded-2xl">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative"
                      style={{ background: t.surfaceAlt, border:`1px solid ${t.border}` }}>
                      <img
                        src="/sarvesh-photo.png"
                        alt="Sarvesh Sabnis"
                        className="w-full h-full object-cover object-top"
                        draggable={false}
                      />
                      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 1px ${t.border}` }} />
                    </div>
                  </TiltCard>
                </div>
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: t.accentCyan }}>Executive Summary</p>
                  <h3 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: t.text }}>
                    Innovative & Passionate Problem Solver.
                  </h3>
                  <p className="text-base leading-relaxed mb-7" style={{ color: t.textMuted }}>
                    I am a highly motivated Computer Engineer eager to apply technical expertise, creativity and problem-solving skills to drive organisational success. Dedicated, precise and collaborative — bringing a positive attitude that fosters productive teamwork.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {['SQL Development','Data Analytics','ETL Pipelines','Frontend Engineering','Query Optimisation','Cross-functional Collaboration'].map((h,i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: t.text }}>
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: t.accent }}/> {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal3D>
        </section>

        {/* ── EXPERIENCE (timeline with 3D reveal) ── */}
        <ExperienceSection jobs={jobs} t={t}/>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-20 px-5 md:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-center" style={{ color: t.accentCyan }}>Technical Arsenal</p>
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center" style={{ color: t.text }}>Core Competencies</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Reveal3D delay={0}><FlipCard t={t} title="Database Architecture" icon={<Database size={30}/>}
                items={['MS SQL Server','MySQL','T-SQL Scripting','ETL Pipelines']}/></Reveal3D>
              <Reveal3D delay={0.1}><FlipCard t={t} title="Frontend Engineering" icon={<Layout size={30}/>}
                items={['JavaScript','Angular','HTML5','CSS3 & Responsive UI']}/></Reveal3D>
              <Reveal3D delay={0.2}><FlipCard t={t} title="Data Tools & Design" icon={<Cpu size={30}/>}
                items={['Python','Tableau','Advanced Excel','Figma Wireframing']}/></Reveal3D>
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-20 px-5 md:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-px" style={{ background: t.accent }} />
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: t.accent }}>Portfolio · 3 Selected Works</p>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: t.text }}>Featured Implementations</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  color: t.accentCyan,
                  badge: <Zap size={20} />,
                  visual: <FlowVisual t={t} />,
                  tag: 'Backend Automation',
                  title: 'Automated Daily Work Report System',
                  desc: 'Automated reporting using Supabase + PostgreSQL — Edge Functions, Gmail SMTP, and pg_cron drive a fully hands-off daily pipeline.',
                  tags: ['PostgreSQL', 'Supabase', 'TypeScript', 'pg_cron'],
                },
                {
                  color: t.accent,
                  badge: <Activity size={20} />,
                  visual: <BarsVisual t={t} />,
                  tag: 'HR Tooling',
                  title: 'HUBSTAFF Engine',
                  desc: 'Comprehensive time-tracking system recording employee check-in/out, with automated salary-slip generation from logged hours.',
                  tags: ['Time Tracking', 'UI/UX', 'Frontend'],
                },
                {
                  color: t.accentGreen,
                  badge: <Search size={20} />,
                  visual: <SearchVisual t={t} />,
                  tag: 'Consumer App',
                  title: 'FOODWISE Platform',
                  desc: 'Recipe-finding app where users select available ingredients and discover matching recipes, from wireframe to working UI.',
                  tags: ['Wireframing', 'UI/UX', 'Frontend Dev'],
                },
              ].map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -6, boxShadow: t.shadowLg }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group rounded-3xl overflow-hidden flex flex-col relative"
                  style={{ background: t.surface, border: `1px solid ${t.border}`, boxShadow: t.shadowSm }}
                >
                  {/* colored corner glow that brightens on hover — kept translucent so it reads well in light mode too */}
                  <div
                    className="absolute -top-14 -right-14 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `${p.color}55` }}
                  />

                  <div className="relative p-6 pb-0">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: `${p.color}1e`, color: p.color }}>
                        {p.badge}
                      </div>
                      <span className="px-3 py-1 text-xs font-bold rounded-full"
                        style={{ background: `${p.color}18`, color: p.color }}>
                        {p.tag}
                      </span>
                    </div>
                    {p.visual}
                  </div>

                  <div className="relative p-6 pt-3 flex flex-col flex-grow">
                    <h4 className="text-lg font-bold mb-2" style={{ color: t.text }}>{p.title}</h4>
                    <p className="text-sm leading-relaxed mb-5 flex-grow" style={{ color: t.textMuted }}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {p.tags.map(tg => (
                        <span key={tg} className="text-xs px-2 py-1 rounded" style={{ background: t.surfaceAlt, color: t.textMuted }}>{tg}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold pt-4"
                      style={{ color: p.color, borderTop: `1px solid ${t.border}` }}>
                      View Project
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="py-20 px-5 md:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: t.text }}>Education & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {education.map((c,i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ y: -4 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-2xl"
                  style={{ background: t.surface, border:`1px solid ${t.border}`, boxShadow: t.shadowSm }}
                >
                  <div className="mb-4">
                    {c.cgpa
                      ? <GradientText from={t.accent} to={t.accentCyan} style={{ fontSize: '1.5rem', fontWeight: 900 }}>8.21</GradientText>
                      : c.icon}
                  </div>
                  <h4 className="text-base font-bold mb-1" style={{ color: t.text }}>{c.title}</h4>
                  <p className="text-xs" style={{ color: t.textMuted }}>{c.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-20 relative z-10" style={{ borderTop:`1px solid ${t.border}`, background: t.surface }}>
          <div className="max-w-3xl mx-auto px-5 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: t.text }}>Ready to optimise your data?</h2>
            <p className="text-base mb-10" style={{ color: t.textMuted }}>Available for SQL Developer, Data Analyst, or Frontend roles.</p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon:<Mail size={16}/>, label:'sarveshsabnis333@gmail.com', href:'mailto:sarveshsabnis333@gmail.com' },
                { icon:<Phone size={16}/>, label:'+91 97643 14857' },
                { icon:<MapPin size={16}/>, label:'Goa, India' },
              ].map((c,i) => (
                <a key={i} href={c.href||'#'}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
                  style={{ background: t.surfaceAlt, border:`1px solid ${t.border}`, color: t.text, boxShadow: t.shadowSm }}>
                  <span style={{ color: t.accent }}>{c.icon}</span> {c.label}
                </a>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              {[
                { icon:<LinkedinIcon size={18}/>, href:'https://www.linkedin.com/in/sarvesh-sabnis-002392242' },
                { icon:<Code size={18}/>, href:'https://github.com/The-sabnis' },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: t.surfaceAlt, border:`1px solid ${t.border}`, color: t.textMuted, boxShadow: t.shadowSm }}
                  onMouseEnter={e => { e.currentTarget.style.background=t.accent; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor=t.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.background=t.surfaceAlt; e.currentTarget.style.color=t.textMuted; e.currentTarget.style.borderColor=t.border; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-6 text-center relative z-10" style={{ borderTop:`1px solid ${t.border}` }}>
          <p className="text-xs font-mono tracking-widest uppercase" style={{ color: t.textMuted }}>
            © {new Date().getFullYear()} Sarvesh Sabnis · Data & Design
          </p>
        </footer>

      </div>
    </div>
  );
}