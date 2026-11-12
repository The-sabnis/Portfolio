import { motion } from 'framer-motion';

export default function ShinyText({
  children,
  className = '',
  baseColor = '#2997ff',
  shineColor = '#ffffff',
  speed = 3.5,
  spread = 110,
  style = {},
}) {
  return (
    <motion.span
      className={`inline-block font-bold tracking-tight ${className}`}
      style={{
        backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 0%, ${baseColor} 38%, ${shineColor} 50%, ${baseColor} 62%, ${baseColor} 100%)`,
        backgroundSize: '220% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        ...style,
      }}
      animate={{
        backgroundPosition: ['120% 0%', '-120% 0%'],
      }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
