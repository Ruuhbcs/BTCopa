import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BT_PLAYERS, Player } from "./types";
import SoundFX from "./components/SoundManager";
import Confetti from "./components/Confetti";
import BannerQuote from "./components/BannerQuote";
import StickerCard from "./components/StickerCard";
import PackOpener from "./components/PackOpener";
import TacticalPitch from "./components/TacticalPitch";

import { 
  Trophy, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Search, 
  Filter, 
  MapPin, 
  Music, 
  HelpCircle,
  HelpCircle as Shield,
  Award,
  Users
} from "lucide-react";

export default function App() {
  // Unlocked player IDs (starts completely empty, open packs to get stickers)
  const [gluedIds, setGluedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("bt_glued_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [unlockedIds, setUnlockedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("bt_unlocked_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<string>("album");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSambaOn, setIsSambaOn] = useState<boolean>(false);
  const [confettiActive, setConfettiActive] = useState<boolean>(false);
  
  // Search & Filter state for the Album
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("Todos");

  // Keep state synchronized in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("bt_glued_ids", JSON.stringify(gluedIds));
    } catch (e) {
      console.warn("Failed to write glue state", e);
    }
  }, [gluedIds]);

  useEffect(() => {
    try {
      localStorage.setItem("bt_unlocked_ids", JSON.stringify(unlockedIds));
    } catch (e) {
      console.warn("Failed to write unlocked state", e);
    }
  }, [unlockedIds]);

  // Keep sound state in sync with SoundFX manager
  useEffect(() => {
    SoundFX.setMuted(isMuted);
    if (isMuted) {
      SoundFX.stopSambaDrumBeat();
      setIsSambaOn(false);
    }
  }, [isMuted]);

  // Handle Samba beat loop
  const toggleSamba = () => {
    if (isMuted) {
      setIsMuted(false);
    }
    const newSambaState = !isSambaOn;
    setIsSambaOn(newSambaState);
    
    if (newSambaState) {
      SoundFX.startSambaDrumBeat();
      // Whistle blow for kickoff!
      SoundFX.playWhistle();
    } else {
      SoundFX.stopSambaDrumBeat();
    }
  };

  // Turn off samba on unmount
  useEffect(() => {
    return () => {
      SoundFX.stopSambaDrumBeat();
    };
  }, []);

  const handleStickersDiscovered = (players: Player[]) => {
    // Add player IDs to the unlocked list (discovered but not glued yet)
    const newUnlocked = [...unlockedIds];
    let newlyUnlockedCount = 0;

    players.forEach((p) => {
      if (!newUnlocked.includes(p.id)) {
        newUnlocked.push(p.id);
        newlyUnlockedCount++;
      }
    });

    if (newlyUnlockedCount > 0) {
      setUnlockedIds(newUnlocked);
      // Trigger a confetti blast for newly discovered stickers!
      setConfettiActive(true);
    }
  };

  const handleGlueAll = () => {
    // Glue all 17 players and mark them unlocked too
    const allIds = BT_PLAYERS.map((p) => p.id);
    setUnlockedIds(allIds);
    setGluedIds(allIds);
    setConfettiActive(true);
    SoundFX.playCelebration();
  };

  const handleSingleStickerGlue = (playerId: number) => {
    // Make sure user unlocked it first, or unlocked list contains it
    if (!unlockedIds.includes(playerId)) {
      setUnlockedIds((prev) => [...prev, playerId]);
    }
    if (!gluedIds.includes(playerId)) {
      setGluedIds((prev) => [...prev, playerId]);
      setConfettiActive(true);
    }
  };

  const handleResetAlbum = () => {
    setGluedIds([]);
    setUnlockedIds([]);
    SoundFX.playWhistle();
  };

  // Rank name based on collected count
  const getProgressRank = (count: number) => {
    if (count === 17) return { label: "Seleção Pentacampeã 👑", color: "text-[#FFDF00] bg-[#FFDF00]/25 border-[#FFDF00]/40" };
    if (count >= 12) return { label: "G-4 da Qualidade 🥇", color: "text-white bg-[#009739]/50 border-white/30" };
    if (count >= 6) return { label: "Série Ouro do NPS 🥈", color: "text-[#FFDF00] bg-white/10 border-[#FFDF00]/30" };
    return { label: "Série Bronze / Preparação ⚽", color: "text-white bg-white/5 border-white/20" };
  };

  const filteredPlayers = BT_PLAYERS.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          player.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (roleFilter === "Todos") return matchesSearch;
    const isGlued = gluedIds.includes(player.id);
    if (roleFilter === "Coladas") return matchesSearch && isGlued;
    if (roleFilter === "Faltando") return matchesSearch && !isGlued;
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#009739] text-white font-sans relative pb-20 overflow-x-hidden">
      
      {/* Soccer Pitch Geometric Lines Overlay */}
      <div className="absolute inset-0 opacity-15 pitch-pattern pointer-events-none" />
      <div className="absolute top-12 left-10 h-64 w-64 rounded-full bg-[#FFDF00]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-12 h-64 w-64 rounded-full bg-[#012169]/30 blur-3xl pointer-events-none" />

      {/* Confetti Explosion Layer */}
      <Confetti active={confettiActive} onFinished={() => setConfettiActive(false)} />

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-[#012169] border-b-4 border-[#FFDF00] px-4 md:px-8 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Brand matching Geometric Balance theme */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FFDF00] rounded-full flex items-center justify-center font-black text-[#012169] text-xl border-2 border-white shadow-md">
              BT
            </div>
            <div className="leading-none">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-white">
                BT Satisfação
              </h1>
              <p className="text-[10px] md:text-xs font-bold text-[#FFDF00] uppercase tracking-wider">
                Jornada do Cliente
              </p>
            </div>
          </div>

          {/* Controls Panel styled with skew offsets */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="px-4 py-1.5 bg-[#FFDF00] text-[#012169] font-black rounded text-xs skew-x-[-12deg] shadow-sm select-none border border-white">
              <span className="skew-x-[12deg]">RUMO AO HEXA 🇧🇷</span>
            </div>
          </div>
        </div>
      </header>

      {/* CORE HERO SECTION */}
      <div className="max-w-7xl mx-auto pt-6 px-4 md:px-8 relative z-10">
        
        {/* Banner with the main quote image "NEM PRECISA DE TÉCNICO..." */}
        <BannerQuote />

        {/* CORE INTERACTIVE VIEW SELECTOR TABS WITH GEOMETRIC ANGLED STYLE (MOVED ABOVE PROGRESS) */}
        <div className="flex justify-center border-b-2 border-white/20 my-8">
          <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Album Tab */}
            <button
              onClick={() => {
                setActiveTab("album");
                SoundFX.playFlip();
              }}
              className={`cursor-pointer whitespace-nowrap px-5 py-3 rounded text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 skew-x-[-12deg] border-2 ${
                activeTab === "album"
                  ? "bg-[#012169] text-[#FFDF00] border-[#FFDF00] shadow-md"
                  : "bg-[#012169]/50 text-white hover:bg-[#012169]/80 border-white/20"
              }`}
            >
              <span className="skew-x-[12deg] flex items-center gap-2">⚽ Meu Álbum</span>
            </button>

            {/* Pack Opener Tab */}
            <button
              onClick={() => {
                setActiveTab("packs");
                SoundFX.playFlip();
              }}
              className={`cursor-pointer whitespace-nowrap px-5 py-3 rounded text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 skew-x-[-12deg] border-2 ${
                activeTab === "packs"
                  ? "bg-[#012169] text-[#FFDF00] border-[#FFDF00] shadow-md"
                  : "bg-[#012169]/50 text-white hover:bg-[#012169]/80 border-white/20"
              }`}
            >
              <span className="skew-x-[12deg] flex items-center gap-2">📦 Abrir Pacotes</span>
            </button>

            {/* Tactical pitch Tab */}
            <button
              onClick={() => {
                setActiveTab("lineup");
                SoundFX.playFlip();
              }}
              className={`cursor-pointer whitespace-nowrap px-5 py-3 rounded text-xs sm:text-sm font-black uppercase tracking-wider transition-all flex items-center gap-2 skew-x-[-12deg] border-2 ${
                activeTab === "lineup"
                  ? "bg-[#012169] text-[#FFDF00] border-[#FFDF00] shadow-md"
                  : "bg-[#012169]/50 text-white hover:bg-[#012169]/80 border-white/20"
              }`}
            >
              <span className="skew-x-[12deg] flex items-center gap-2">📋 Escalar Seleção</span>
            </button>
          </div>
        </div>

        {/* METRICS DASHBOARD CARD (PROGRESS METRICS UNDER THE MENU TABS) */}
        <div className="bg-[#012169] border-4 border-[#FFDF00] p-6 rounded-xl shadow-2xl mt-6 relative overflow-hidden">
          {/* Subtle decoration lines inside the card */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FFDF00]/5 to-transparent pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 z-10">
            
            {/* Progress Counters */}
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-extrabold text-white/90 uppercase tracking-widest">
                  Álbum BT Colado
                </span>
                <span className="font-display font-black text-xl text-[#FFDF00]">
                  {gluedIds.length} / 17 Figurinhas
                </span>
              </div>
              
              {/* Progress gauge bar */}
              <div className="h-5 w-full rounded bg-[#009739]/30 p-1 border border-white/20">
                <div 
                  className="h-full rounded bg-linear-to-r from-[#FFDF00] to-green-400 transition-all duration-500"
                  style={{ width: `${(gluedIds.length / 17) * 100}%` }}
                />
              </div>

              {/* Status rank tag */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-white/75 font-bold">Classificação:</span>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-widest border ${getProgressRank(gluedIds.length).color}`}>
                  {getProgressRank(gluedIds.length).label}
                </span>
              </div>
            </div>

            {/* Quick action triggers */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleResetAlbum}
                className="cursor-pointer rounded bg-transparent hover:bg-white/10 text-white border-2 border-white/60 font-black text-xs uppercase px-5 py-3 transition-colors active:scale-95 skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg]">RESETAR ÁLBUM</span>
              </button>
            </div>
          </div>
        </div>

        {/* RENDERING DYNAMIC VIEW COMPONENTS */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: MEU ÁLBUM */}
            {activeTab === "album" && (
              <motion.div
                key="tab-album"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                {/* Search & filters inside the Album tab */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#012169] border-2 border-[#FFDF00] shadow-xl">
                  {/* Search Bar */}
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#FFDF00]" />
                    <input
                      type="text"
                      placeholder="Buscar craque por nome ou função..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#009739]/30 border border-white/35 rounded pl-9 pr-4 py-2.5 text-xs font-semibold focus:outline-hidden focus:border-[#FFDF00] text-white placeholder-white/60"
                    />
                  </div>

                  {/* Filter Select Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Filter className="h-3.5 w-3.5 text-white mr-1" />
                    {["Todos", "Coladas", "Faltando"].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setRoleFilter(category);
                          SoundFX.playFlip();
                        }}
                        className={`cursor-pointer rounded px-3 py-1.5 text-[10px] uppercase font-black tracking-wider transition-all skew-x-[-12deg] border ${
                          roleFilter === category
                            ? "bg-[#FFDF00] text-[#012169] border-white shadow-md"
                            : "bg-[#009739] hover:bg-[#009739]/80 text-white border-white/20"
                        }`}
                      >
                        <span className="skew-x-[12deg] block">{category}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid Lists of stickers */}
                {filteredPlayers.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredPlayers.map((player) => {
                      const isGlued = gluedIds.includes(player.id);
                      const isUnlocked = unlockedIds.includes(player.id);
                      return (
                        <StickerCard
                          key={player.id}
                          player={player}
                          isGlued={isGlued}
                          isUnlocked={isUnlocked}
                          onClickGlue={() => handleSingleStickerGlue(player.id)}
                          onGoToPacks={() => {
                            setActiveTab("packs");
                            SoundFX.playFlip();
                          }}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-zinc-900/40 rounded-3xl border border-zinc-850 p-6">
                    <span className="text-5xl block mb-3">🔍</span>
                    <h3 className="text-md font-black text-zinc-300">Nenhum craque encontrado</h3>
                    <p className="text-xs text-zinc-500">Tente ajustar a busca ou o filtro de posição tática!</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: ABRIR PACOTES */}
            {activeTab === "packs" && (
              <motion.div
                key="tab-packs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <PackOpener 
                  onStickersFound={handleStickersDiscovered} 
                  onStickerGlued={(playerId) => handleSingleStickerGlue(playerId)}
                  gluedStickers={gluedIds}
                />
              </motion.div>
            )}

            {/* TAB 3: ESCALAÇÃO TÁTICA */}
            {activeTab === "lineup" && (
              <motion.div
                key="tab-lineup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <TacticalPitch unlockedPlayerIds={gluedIds} />
              </motion.div>
            )}



          </AnimatePresence>
        </div>

      </div>

      {/* GEOMETRIC BALANCE FOOTER */}
      <footer className="w-full bg-[#FFDF00] py-4 px-8 flex flex-col md:flex-row justify-between items-center z-10 border-t-4 border-[#012169] mt-16 text-[#012169] relative">
        <div className="font-black italic text-sm md:text-base uppercase tracking-tight">
          BT SATISFAÇÃO • 2026
        </div>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#009739]"></div>
            <span className="text-xs font-black uppercase">STATUS: EM CAMPO</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
