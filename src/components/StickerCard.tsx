import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Player } from "../types";
import { Shield, Sparkles, RefreshCw, Zap, Award, Target, HelpCircle } from "lucide-react";
import SoundFX from "./SoundManager";

interface StickerCardProps {
  key?: any;
  player: Player;
  isGlued: boolean; // if false, rendering silhouette
  isUnlocked?: boolean; // if false, sticker hasn't even been discovered in a pack yet
  onClickGlue?: () => void;
  onGoToPacks?: () => void;
  interactive?: boolean;
}

export default function StickerCard({
  player,
  isGlued,
  isUnlocked = false,
  onClickGlue,
  onGoToPacks,
  interactive = true,
}: StickerCardProps) {
  const [shimmer, setShimmer] = useState(false);
  const [imgSrc, setImgSrc] = useState(player.imageUrl);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImgSrc(player.imageUrl);
    setImageError(false);
  }, [player.imageUrl]);

  const handleImageError = () => {
    // Falls back between accented and unaccented versions relative to base path
    if (imgSrc === "joao.png" || imgSrc === "./joao.png" || imgSrc === "/joao.png") {
      setImgSrc("joão.png");
      return;
    }
    if (imgSrc === "joão.png" || imgSrc === "./joão.png" || imgSrc === "/joão.png") {
      setImgSrc("joao.png");
      return;
    }
    setImageError(true);
  };

  const isSpecial = [8, 15, 16, 17].includes(player.id);

  const handleCardClick = () => {
    if (!isGlued) {
      if (onClickGlue) {
        SoundFX.playGlue();
        onClickGlue();
      }
      return;
    }

    if (interactive) {
      setShimmer(true);
      SoundFX.playGlue(); // nice sticker sound when tapped
      setTimeout(() => setShimmer(false), 800);
    }
  };

  return (
    <div className="relative aspect-[3/4] w-full select-none">
      {/* Sparkle effects on glued cards */}
      {isGlued && (
        <span className="absolute -top-1 -right-1 z-25 flex h-5 w-5 items-center justify-center rounded bg-[#FFDF00] text-xs font-black text-[#012169] shadow-md animate-bounce ring-1 ring-white skew-x-[-12deg]">
          <span className="skew-x-[12deg] block text-[10px]">★</span>
        </span>
      )}

      <motion.div
        className="relative h-full w-full"
        whileHover={isGlued ? { scale: 1.05, y: -4 } : { scale: 1.02 }}
        onClick={handleCardClick}
      >
        {/* FRONT SIDE (Sticker Design) */}
        <div
          className={`absolute inset-0 h-full w-full rounded shadow-2xl transition-all duration-300 ${
            isSpecial && isGlued
              ? "bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 p-[3.5px] shadow-[0_0_20px_rgba(255,223,0,0.7)]"
              : "bg-slate-950/80 p-1 border-2 border-dashed border-[#FFDF00]/70"
          }`}
        >
          {isGlued ? (
            <div className={`relative h-full w-full overflow-hidden rounded border ${
              isSpecial 
                ? "bg-gradient-to-br from-[#012169] via-amber-950/30 to-[#009739] border-amber-300"
                : "bg-[#012169]/30 border-white/10"
            }`}>
              {/* Iridescent spectrum background that glimmers gently on special cards */}
              {isSpecial && (
                <div className="absolute inset-0 pointer-events-none z-5 bg-gradient-to-tr from-pink-500/15 via-yellow-300/15 to-cyan-500/15 mix-blend-color-dodge animate-pulse" />
              )}

              {/* Foil/Shine Overlay */}
              <div 
                className={`absolute inset-0 pointer-events-none z-10 transition-transform duration-1000 ${
                  shimmer ? "translate-x-full" : "-translate-x-full"
                } ${
                  isSpecial
                    ? "bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent skew-x-[-20deg] scale-150"
                    : "bg-linear-to-tr from-transparent via-white/20 to-transparent"
                }`}
              />
              
              {imageError ? (
                <div className="w-full h-full bg-gradient-to-br from-[#009739] via-[#007A2A] to-[#012169] flex flex-col items-center justify-between p-3 relative text-white">
                  {/* Pitch pattern overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[size:10px_10px] pitch-pattern pointer-events-none" />
                  
                  {/* SVG Football Jersey with actual color and details */}
                  <div className="flex-1 flex flex-col items-center justify-center w-full mt-2">
                    <svg viewBox="0 0 100 100" className="w-[84px] h-[84px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.4)]">
                      {/* Jersey silhouette filled with Canary Yellow */}
                      <path
                        d="M 25,30 L 35,20 L 42,24 L 50,20 L 58,24 L 65,20 L 75,30 L 68,48 L 64,46 L 64,85 L 36,85 L 36,46 L 32,48 Z"
                        fill="#FFDF00"
                        stroke="#009739"
                        strokeWidth="2.5"
                      />
                      {/* Sleeves Green Accents */}
                      <path d="M 25,30 L 32,24.5" stroke="#009739" strokeWidth="2" />
                      <path d="M 75,30 L 68,24.5" stroke="#009739" strokeWidth="2" />
                      
                      {/* Collar Accent */}
                      <path d="M 42,24 Q 50,31 58,24" fill="none" stroke="#009739" strokeWidth="3" />
                      
                      {/* Number in the center */}
                      <text
                        x="50"
                        y="66"
                        textAnchor="middle"
                        fill="#012169"
                        fontSize="28"
                        fontFamily="'Space Grotesk', 'Inter', sans-serif"
                        fontWeight="900"
                      >
                        {player.jerseyNumber}
                      </text>
                    </svg>
                  </div>

                  {/* Identification Label at the bottom of the card */}
                  <div className="w-full text-center bg-black/40 py-1 px-1.5 rounded border border-white/10 z-15 select-none">
                    <div className="text-[10px] font-black text-[#FFDF00] tracking-tight truncate uppercase">
                      {player.name.split(" ")[0]} {player.name.split(" ")[1] || ""}
                    </div>
                    <div className="text-[7.5px] text-white/80 font-black tracking-wider uppercase truncate">
                      {player.position}
                    </div>
                  </div>
                </div>
              ) : (
                <img
                  src={imgSrc}
                  alt={player.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-101"
                  onError={handleImageError}
                />
              )}
            </div>
          ) : (
            // Silhouette state
            <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gradient-to-b from-[#012169] to-black p-4 text-center text-white/60 gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded bg-[#012169] border-2 border-[#FFDF00]">
                <HelpCircle className="h-7 w-7 text-white/50" />
                <span className="absolute -bottom-1 -right-1 bg-[#FFDF00] text-[#012169] font-black text-xs h-5 w-5 rounded flex items-center justify-center border border-white">
                  {player.id}
                </span>
              </div>
              <div>
                <h4 className="font-sans font-black text-white text-sm uppercase tracking-tight">{player.name}</h4>
                <p className="text-[10px] text-[#FFDF00] font-black uppercase tracking-wider mt-0.5">{player.role.substring(0, 15)}...</p>
              </div>

              {isUnlocked ? (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onClickGlue) {
                      SoundFX.playGlue();
                      onClickGlue();
                    }
                  }}
                  className="mt-1 cursor-pointer w-full rounded bg-[#FFDF00] py-2 text-xs font-black text-[#012169] shadow-md active:scale-95 transition-all hover:brightness-110 skew-x-[-12deg] border border-white"
                >
                  <span className="skew-x-[12deg] block uppercase">Colar Figurinha ✨</span>
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    SoundFX.playWhistle();
                    if (onGoToPacks) {
                      onGoToPacks();
                    }
                  }}
                  className="mt-1 cursor-pointer w-full rounded bg-[#FFDF00]/15 hover:bg-[#FFDF00]/30 border-2 border-dashed border-[#FFDF00]/50 py-1.5 px-1 text-[10px] font-black text-[#FFDF00] shadow-sm active:scale-95 transition-all skew-x-[-12deg]"
                  title="Abra pacotes para encontrar este colecionável!"
                >
                  <span className="skew-x-[12deg] block uppercase">Ainda não encontrada (Abra Pacotes 📦)</span>
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
