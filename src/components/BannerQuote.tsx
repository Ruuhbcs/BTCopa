import { motion } from "motion/react";

export default function BannerQuote() {
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

        {/* Centerpiece Display Announcement */}
        <div className="flex flex-col items-center justify-center text-center my-6 z-10 relative">
          
          {/* Huge Highly impact-styled Brazilian display phrase */}
          <motion.h1 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 12,
              delay: 0.2 
            }}
            className="text-3xl sm:text-4xl md:text-6xl font-black italic uppercase tracking-tight text-[#FFDF00] drop-shadow-[0_4px_4px_rgba(1,33,105,0.8)] skew-x-[-10deg] leading-none select-none max-w-4xl"
          >
            Nem precisa de técnico...
          </motion.h1>

          <motion.h1 
            initial={{ opacity: 0, y: 45, scale: 0.85, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 90,
              damping: 10,
              delay: 0.5 
            }}
            className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tight text-[#FFDF00] drop-shadow-[0_4px_4px_rgba(1,33,105,0.8)] skew-x-[-10deg] leading-none select-none mt-2 md:mt-3"
          >
            Esse time já nasceu campeão!
          </motion.h1>
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
