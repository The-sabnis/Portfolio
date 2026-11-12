import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function TiltContainer({
  children,
  className = '',
  style = {},
  strength = 6,
  lift = 4,
  glowColor = 'rgba(41, 151, 255, 0.12)',
}) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 260, damping: 28, mass: 0.4 });
  const springRy = useSpring(ry, { stiffness: 260, damping: 28, mass: 0.4 });
  const [hovering, setHovering] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const isInteractive = () => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(hover: none)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  const handleMouseMove = (e) => {
    if (!ref.current || !isInteractive()) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * strength);
    rx.set(py * -strength);
    setGlarePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    if (isInteractive()) setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        rotateX: springRx,
        rotateY: springRy,
        transformPerspective: 1000,
        y: hovering ? -lift : 0,
        boxShadow: hovering
          ? `0 20px 48px -12px rgba(0, 0, 0, 0.7), 0 0 30px -10px ${glowColor}`
          : '0 8px 24px -10px rgba(0, 0, 0, 0.4)',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
      }}
    >
      {/* Dynamic specular glare */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: hovering ? 0.25 : 0,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
        }}
      />
      <div className="h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
