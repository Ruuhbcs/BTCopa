import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Player, BT_PLAYERS } from "../types";
import StickerCard from "./StickerCard";
import SoundFX from "./SoundManager";
import { Sparkles, Trophy, Flame, Zap, Check } from "lucide-react";

interface PackOpenerProps {
  onStickersFound: (players: Player[]) => void;
  onStickerGlued: (playerId: number) => void;
  gluedStickers: number[];
}

export default function PackOpener({ onStickersFound, onStickerGlued, gluedStickers }: PackOpenerProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [pulledStickers, setPulledStickers] = useState<Player[]>([]);
  const [gluedPulledIds, setGluedPulledIds] = useState<number[]>([]);

  // Open booster pack with 3 random stickers
  const handleOpenPack = () => {
    if (isOpening) return;
    setIsOpening(true);
    SoundFX.playPackOpen();

    setTimeout(() => {
      // Pick 3 random players. 
      // Prefer ones the user hasn't collected yet, for a friendlier game experience, but keep it a bit random.
      const uncollected = BT_PLAYERS.filter(p => !gluedStickers.includes(p.id));
      const pool = uncollected.length >= 3 ? uncollected : BT_PLAYERS;
      
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setPulledStickers(selected);
      setGluedPulledIds([]);
      setIsOpening(false);
      setIsOpened(true);
      
      // Let parent node know these stickers were opened (so they show up as unlocked)
      onStickersFound(selected);
    }, 1200);
  };

  const handleGlueSingle = (playerId: number) => {
    if (gluedPulledIds.includes(playerId) || gluedStickers.includes(playerId)) return;
    setGluedPulledIds(prev => [...prev, playerId]);
    SoundFX.playGlue();
    
    // Call parent to glue it inside the album
    onStickerGlued(playerId);
  };

  const handleGlueAllPulled = () => {
    pulledStickers.forEach(p => {
      if (!gluedPulledIds.includes(p.id)) {
        handleGlueSingle(p.id);
      }
    });
    SoundFX.playCelebration();
  };

  const handleReset = () => {
    setIsOpened(false);
    setPulledStickers([]);
    setGluedPulledIds([]);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          // UNOPENED FOIL BOOSTER PACK
          <motion.div
            key="unopened"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative"
          >
            {/* Glossy highlight effect */}
            <div className="absolute inset-0 -m-1 rotate-1 rounded bg-linear-to-r from-[#FFDF00] via-[#009739] to-white opacity-20 blur-xl animate-pulse" />

            {/* Booster Card Wrapper */}
            <motion.div
              whileHover={{ rotate: [-0.5, 0.5, -0.5], scale: 1.03 }}
              className="relative cursor-pointer overflow-hidden rounded-xl border-4 border-[#FFDF00] bg-[#012169] p-6 shadow-2xl w-80 text-white"
              onClick={handleOpenPack}
            >
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded bg-yellow-400/10 blur-xl" />
              
              {/* Zig-zag cut style header & footer (Booster Pack lookalike) */}
              <div className="flex justify-between border-b-4 border-dashed border-[#FFDF00]/40 pb-3 text-center">
                <span className="text-[10px] font-black text-[#FFDF00] uppercase tracking-widest">★ ORIGINAL PANINI ★</span>
                <span className="text-[10px] font-black text-[#FFDF00] uppercase tracking-widest">3 FIGURINHAS</span>
              </div>

              {/* Central Logo Panel */}
              <div className="my-8 flex flex-col items-center text-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="mb-4 text-6xl"
                >
                  ⚽
                </motion.div>
                
                <h2 className="font-sans font-black text-2xl tracking-tight leading-none text-[#FFDF00] uppercase drop-shadow-md">
                  Copa do Mundo 2026
                </h2>

                <span className="mt-4 inline-flex items-center gap-1.5 rounded bg-[#FFDF00] px-4 py-1.5 text-xs font-black uppercase text-[#012169] shadow-md skew-x-[-12deg]">
                  <span className="skew-x-[12deg] flex items-center gap-1.5">
                    <Flame className="h-4 w-4 fill-[#012169]" /> BT SATISFAÇÃO
                  </span>
                </span>
              </div>

              <div className="mt-8 border-t-4 border-dashed border-[#FFDF00]/40 pt-4 text-center">
                <p className="text-xs text-[#FFDF00]/90 font-bold mb-3">
                  Rasgar &amp; Descobrir Campeões!
                </p>
                <button
                  disabled={isOpening}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPack();
                  }}
                  className={`relative overflow-hidden cursor-pointer w-full rounded bg-[#FFDF00] py-3.5 text-sm font-black uppercase text-[#012169] shadow-lg transition-transform hover:scale-103 active:scale-97 skew-x-[-12deg] ${
                    isOpening ? "animate-pulse brightness-75 cursor-wait" : ""
                  }`}
                >
                  <span className="skew-x-[12deg] block">
                    {isOpening ? "Rasgando Pacotinho..." : "ABRIR PACOTE! 📦"}
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // CARD REVEAL PANEL
          <motion.div
            key="opened"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full max-w-4xl text-center px-4"
          >
            <div className="mb-6 flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 bg-[#FFDF00] text-[#012169] text-xs font-black px-4 py-1.5 rounded skew-x-[-12deg] shadow-md mb-3">
                <span className="skew-x-[12deg] flex items-center gap-1">
                  <Trophy className="h-4 w-4 fill-[#012169]" /> PACOTE ABERTO!
                </span>
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Veja quem você tirou na Seleção!
              </h2>
            </div>

            {/* Released Sticker Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 px-4 justify-items-center">
              {pulledStickers.map((player) => {
                const wasGlued = gluedPulledIds.includes(player.id) || gluedStickers.includes(player.id);
                return (
                  <div key={player.id} className="w-64 flex flex-col items-center gap-3">
                    <StickerCard player={player} isGlued={true} interactive={true} />
                    
                    {/* Add to album action button */}
                    <button
                      onClick={() => handleGlueSingle(player.id)}
                      disabled={wasGlued}
                      className={`cursor-pointer w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded text-xs font-black uppercase tracking-wider shadow-md transition-all skew-x-[-12deg] ${
                        wasGlued
                          ? "bg-white/10 text-white/50 border border-white/20 cursor-default"
                          : "bg-[#FFDF00] text-[#012169] hover:brightness-110 active:scale-95 border border-white"
                      }`}
                    >
                      <span className="skew-x-[12deg] flex items-center gap-1.5">
                        {wasGlued ? (
                          <>
                            <Check className="h-4 w-4" /> Colado
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4" /> Colar Figurinha
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Pull Control buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={handleReset}
                className="cursor-pointer bg-[#012169] hover:bg-[#012169]/80 text-[#FFDF00] border-2 border-[#FFDF00] px-6 py-3 rounded text-sm font-[#012169] font-black uppercase shadow-md transition-all skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] block">ABRIR OUTRO PACOTE 📦</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
