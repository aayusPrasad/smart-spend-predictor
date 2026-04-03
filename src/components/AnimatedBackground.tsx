import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Gradient orbs */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent 70%)" }}
      />
      <motion.div
        animate={{
          x: [0, -25, 15, 0],
          y: [0, 30, -20, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)), transparent 70%)" }}
      />
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 25, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 h-[300px] w-[300px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, hsl(var(--warning)), transparent 70%)" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{
            left: `${15 + i * 15}%`,
            top: `${60 + (i % 3) * 15}%`,
          }}
        />
      ))}
    </div>
  );
}
