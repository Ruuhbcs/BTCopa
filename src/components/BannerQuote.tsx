import { useState, useEffect } from "react";
import { motion } from "motion/react";

// Component to split text into words and letters for a staggered, floating exit/entrance motion
function AnimatedLetters({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span className="inline-flex flex-wrap justify-center">
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mx-1 md:mx-1.5">
          {word.split("").map((char, cIdx) => {
            const overallIdx = wIdx * 10 + cIdx;
            return (
              <motion.span
                key={cIdx}
                className="inline-block hover:text-[#99FF99] transition-colors duration-200 cursor-default select-none"
                initial={{ opacity: 0, y: 35, scale: 0.5, rotate: -15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: [0, -6, 0]
                }}
                transition={{
                  initial: { type: "spring", stiffness: 100, damping: 10 },
                  opacity: { duration: 0.5, delay: overallIdx * 0.035 },
                  scale: { duration: 0.5, delay: overallIdx * 0.035 },
                  rotate: { duration: 0.5, delay: overallIdx * 0.035 },
                  y: {
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut",
                    delay: overallIdx * 0.035 + 0.6 // Wait for initial entrance to complete
                  }
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export default function BannerQuote() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    size: number;
    delay: number;
    duration: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    const items = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${60 + Math.random() * 40}%`,
      size: Math.random() * 6 + 3, // 3px to 9px
      delay: Math.random() * 6,
      duration: Math.random() * 7 + 4, // 4s to 11s
      color: Math.random() > 0.45 ? "#FFDF00" : "#FFFFFF", // Yellow and White sparkles
      drift: Math.random() * 40 - 20, // side drift range
    }));
    setParticles(items);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl px-0 py-4">
      {/* Glow Effect */}
      <div className="absolute inset-x-0 -top-4 h-48 bg-radial from-[#FFDF00]/25 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl border-4 border-[#FFDF00] bg-[#009739] p-6 md:p-8 shadow-2xl text-white select-none"
      >
        {/* Subtle Pitch Lines Inside the Banner to match the game style */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,223,0,0.15)_0%,transparent_80%)] pointer-events-none" />
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-white/10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-white/10 pointer-events-none" />
        
        {/* Floating Particles Overlay */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                filter: "blur(0.5px)",
                boxShadow: `0 0 6px ${p.color}`,
              }}
              animate={{
                y: [0, -180],
                x: [0, p.drift],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Top bar layer with header text and circles */}
        <div className="flex items-start justify-between w-full mb-8 z-10 relative">
          <div>
            <span className="text-[10px] md:text-xs font-black uppercase text-[#FFDF00] tracking-wider block">
              BT OFICIAL 2026
            </span>
            <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white skew-x-[-4deg]">
              BT SATISFAÇÃO &amp; JORNADA
            </h2>
          </div>

          {/* Badges mimicking the original logos */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FFDF00] border-2 border-white flex items-center justify-center shadow-md">
              <span className="text-xs font-black text-[#012169]">10</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Display Announcement with modern letters motion */}
        <div className="flex flex-col items-center justify-center text-center my-6 z-10 relative">
          
          <div className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tight text-[#FFDF00] drop-shadow-[0_4px_4px_rgba(1,33,105,0.8)] skew-x-[-10deg] leading-none select-none max-w-4xl">
            <AnimatedLetters text="Nem precisa de técnico..." />
          </div>

          <div className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tight text-[#FFDF00] drop-shadow-[0_4px_4px_rgba(1,33,105,0.8)] skew-x-[-10deg] leading-none select-none mt-4 md:mt-6">
            <AnimatedLetters text="Esse time já nasceu campeão!" />
          </div>
        </div>

        {/* Footer layer inside the banner mimicking the attachment */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-4 border-t border-white/20 text-[10px] font-bold text-white/90 z-10 relative">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FFDF00] text-sm leading-none">•</span>
            <span className="uppercase tracking-wider">BT SATISFAÇÃO &amp; JORNADA</span>
          </div>
          <div className="uppercase tracking-wider mt-1 sm:mt-0 opacity-80">
            BRASIL • 2026 • BT
          </div>
        </div>

      </motion.div>
    </div>
  );
}
