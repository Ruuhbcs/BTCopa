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
  const [isFlipped, setIsFlipped] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const [imgSrc, setImgSrc] = useState(player.imageUrl);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImgSrc(player.imageUrl);
    setImageError(false);
  }, [player.imageUrl]);

  const handleImageError = () => {
    if (imgSrc === "/joao.png") {
      setImgSrc("/joão.png");
      return;
    }
    if (imgSrc === "/joão.png") {
      setImgSrc("/joao.png");
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
      setIsFlipped(!isFlipped);
      SoundFX.playFlip();
      setShimmer(true);
      setTimeout(() => setShimmer(false), 800);
    }
  };

  return (
    <div className="relative aspect-[3/4] w-full select-none" style={{ perspective: "1000px" }}>
      {/* Sparkle effects on glued cards */}
      {isGlued && !isFlipped && (
        <span className="absolute -top-1 -right-1 z-25 flex h-5 w-5 items-center justify-center rounded bg-[#FFDF00] text-xs font-black text-[#012169] shadow-md animate-bounce ring-1 ring-white skew-x-[-12deg]">
          <span className="skew-x-[12deg] block text-[10px]">★</span>
        </span>
      )}

      <motion.div
        className="relative h-full w-full transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        whileHover={isGlued ? { scale: 1.05, y: -4 } : { scale: 1.02 }}
        onClick={handleCardClick}
      >
        {/* FRONT SIDE (Sticker Design) */}
        <div
          className={`absolute inset-0 h-full w-full rounded shadow-2xl transition-all duration-300 ${
            isSpecial && isGlued
              ? "bg-gradient-to-br from-amber-400 via-yellow-200 to-amber-500 p-[3.5px] shadow-[0_0_20px_rgba(255,223,0,0.7)] animate-pulse"
              : "bg-slate-950/80 p-1 border-2 border-dashed border-[#FFDF00]/70"
          }`}
          style={{ backfaceVisibility: "hidden" }}
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

              {/* Shine particle decoration */}
              {isSpecial ? (
                <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-[#012169] text-[9px] font-black px-2 py-0.5 rounded skew-x-[-12deg] shadow-lg uppercase border border-white animate-bounce z-15">
                  <span className="skew-x-[12deg] flex items-center gap-0.5">★ LÍDER ★</span>
                </div>
              ) : (
                <div className="absolute top-2 right-2 bg-[#FFDF00] text-[#012169] text-[9px] font-black px-1.5 py-0.5 rounded skew-x-[-12deg] shadow-md uppercase z-15">
                  <span className="skew-x-[12deg] block">NPS {player.skills.nps}</span>
                </div>
              )}

              {/* Hover Instructions */}
              <div className="absolute bottom-0 inset-x-0 bg-[#012169]/90 backdrop-blur-xs py-1.5 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-black text-[#FFDF00] flex items-center justify-center gap-1 uppercase tracking-wider">
                  <RefreshCw className="h-3 w-3 animate-spin text-[#FFDF00]" /> Ver Detalhes
                </span>
              </div>
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

        {/* BACK SIDE (Player Stats) */}
        {isGlued && (
          <div
            className={`absolute inset-0 h-full w-full rounded p-4 shadow-2xl text-white transition-all duration-300 ${
              isSpecial
                ? "border-4 border-amber-400 bg-gradient-to-br from-[#012169] via-yellow-950/80 to-[#009739]"
                : "border-4 border-[#FFDF00] bg-gradient-to-br from-[#012169] via-[#012169]/90 to-[#009739]"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Background pitch watermark */}
            <div className="absolute inset-0 opacity-5 bg-[size:16px_16px] pitch-pattern" />

            <div className="relative h-full flex flex-col justify-between z-10">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-[#FFDF00] text-xs font-black text-[#012169]">
                    {player.jerseyNumber}
                  </span>
                  <div>
                    <h3 className="font-sans font-black text-xs sm:text-sm tracking-tight uppercase leading-none">{player.name}</h3>
                    <p className="text-[9px] text-[#FFDF00] font-black uppercase tracking-wider mt-1">{player.position} | {player.role}</p>
                  </div>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg"
                  alt="Brasil"
                  referrerPolicy="no-referrer"
                  className="w-5 h-3.5 rounded-xs border border-white/40 shadow-sm"
                />
              </div>

              {/* Position and Description */}
              <div className="my-1.5 bg-black/40 p-2.5 rounded border-2 border-[#FFDF00]">
                <span className="text-[9px] font-black uppercase text-[#FFDF00] flex items-center gap-1 mb-1">
                  <Target className="h-3 w-3 inline fill-[#FFDF00] text-[#012169]" />
                  Seleção BT Característica
                </span>
                <p className="text-[10px] font-medium leading-relaxed text-white/95">
                  {player.description}
                </p>
              </div>

              {/* Skills Attribute Bars */}
              <div className="space-y-1.5 flex-1 justify-center flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#FFDF00] block mb-1">
                  Habilidades da Jornada
                </span>
                {/* NPS */}
                <div>
                  <div className="flex justify-between text-[9px] font-black uppercase text-white/90 mb-0.5">
                    <span>Satisfação / NPS</span>
                    <span className="text-[#FFDF00]">{player.skills.nps}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-white/10 p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${player.skills.nps}%` }} 
                      className="h-full rounded bg-[#FFDF00]" 
                    />
                  </div>
                </div>
                {/* Empatia */}
                <div>
                  <div className="flex justify-between text-[9px] font-black uppercase text-white/90 mb-0.5">
                    <span>Empatia / Escuta</span>
                    <span className="text-green-300">{player.skills.empatia}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-white/10 p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${player.skills.empatia}%` }} 
                      className="h-full rounded bg-green-400" 
                    />
                  </div>
                </div>
                {/* Agilidade */}
                <div>
                  <div className="flex justify-between text-[9px] font-black uppercase text-white/90 mb-0.5">
                    <span>Agilidade / Fila</span>
                    <span className="text-blue-300">{player.skills.agilidade}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-white/10 p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${player.skills.agilidade}%` }} 
                      className="h-full rounded bg-blue-400" 
                    />
                  </div>
                </div>
                {/* Resolutividade */}
                <div>
                  <div className="flex justify-between text-[9px] font-black uppercase text-white/90 mb-0.5">
                    <span>Resolução / Hexa</span>
                    <span className="text-amber-400">{player.skills.resolucao}%</span>
                  </div>
                  <div className="h-2 w-full rounded bg-white/10 p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${player.skills.resolucao}%` }} 
                      className="h-full rounded bg-amber-400" 
                    />
                  </div>
                </div>
              </div>

              {/* Card Footer badges */}
              <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[8px] font-black text-[#FFDF00]">
                <span className="flex items-center gap-1 text-[#FFDF00]">
                  <Award className="h-3.5 w-3.5 text-[#FFDF00]" /> BT 2026
                </span>
                <span className="tracking-wide">PANINI ORIGINAL</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
