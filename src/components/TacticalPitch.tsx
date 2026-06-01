import { useState } from "react";
import { Player, BT_PLAYERS } from "../types";
import { Shield, Users, HelpCircle, Trophy, RefreshCw, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import SoundFX from "./SoundManager";

interface PitchPosition {
  id: string;
  label: string; // e.g. "Goleiro", "Zagueiro", "Camisa 10"
  type: "GK" | "DEF" | "MID" | "ATT";
  top: string; // positioning percentage
  left: string; // positioning percentage
}

const FORMATIONS: { [key: string]: PitchPosition[] } = {
  "4-3-3 Ofensivo": [
    { id: "gk", label: "Goleira", type: "GK", top: "82%", left: "48%" },
    { id: "ld", label: "Lateral Direito", type: "DEF", top: "62%", left: "15%" },
    { id: "zd", label: "Zagueiro", type: "DEF", top: "68%", left: "35%" },
    { id: "ze", label: "Zagueiro", type: "DEF", top: "68%", left: "62%" },
    { id: "le", label: "Lateral Esquerdo", type: "DEF", top: "62%", left: "82%" },
    { id: "md", label: "Primeiro Volante", type: "MID", top: "42%", left: "20%" },
    { id: "mc", label: "Segundo Volante", type: "MID", top: "48%", left: "48%" },
    { id: "me", label: "Meia Armadora", type: "MID", top: "42%", left: "77%" },
    { id: "pd", label: "Ponta-Direita", type: "ATT", top: "18%", left: "15%" },
    { id: "ca", label: "Centroavante", type: "ATT", top: "12%", left: "48%" },
    { id: "pe", label: "Ponta-Esquerda", type: "ATT", top: "18%", left: "81%" },
  ],
  "4-4-2 Clássico": [
    { id: "gk", label: "Goleira", type: "GK", top: "82%", left: "48%" },
    { id: "ld", label: "Lateral Direito", type: "DEF", top: "62%", left: "15%" },
    { id: "zd", label: "Zagueiro 1", type: "DEF", top: "68%", left: "35%" },
    { id: "ze", label: "Zagueiro 2", type: "DEF", top: "68%", left: "62%" },
    { id: "le", label: "Lateral Esquerdo", type: "DEF", top: "62%", left: "82%" },
    { id: "md", label: "Primeiro Volante", type: "MID", top: "45%", left: "18%" },
    { id: "mc1", label: "Segundo Volante", type: "MID", top: "48%", left: "38%" },
    { id: "mc2", label: "Meio-Campo", type: "MID", top: "48%", left: "58%" },
    { id: "me", label: "Meia Armadora", type: "MID", top: "45%", left: "79%" },
    { id: "ca1", label: "Segundo Atacante", type: "ATT", top: "15%", left: "32%" },
    { id: "ca2", label: "Centroavante", type: "ATT", top: "15%", left: "62%" },
  ],
  "3-5-2 Posse de Bola": [
    { id: "gk", label: "Goleira", type: "GK", top: "82%", left: "48%" },
    { id: "z1", label: "Zagueiro Esquerdo", type: "DEF", top: "68%", left: "25%" },
    { id: "z2", label: "Zagueiro Central", type: "DEF", top: "72%", left: "48%" },
    { id: "z3", label: "Zagueiro Direito", type: "DEF", top: "68%", left: "71%" },
    { id: "v1", label: "Primeiro Volante", type: "MID", top: "52%", left: "34%" },
    { id: "v2", label: "Segundo Volante", type: "MID", top: "52%", left: "62%" },
    { id: "ad", label: "Ala Direito", type: "MID", top: "40%", left: "12%" },
    { id: "am", label: "Meia Armadora", type: "MID", top: "35%", left: "48%" },
    { id: "ae", label: "Ala Esquerdo", type: "MID", top: "40%", left: "84%" },
    { id: "a1", label: "Segundo Atacante", type: "ATT", top: "15%", left: "32%" },
    { id: "a2", label: "Centroavante", type: "ATT", top: "15%", left: "62%" },
  ]
};

interface TacticalPitchProps {
  unlockedPlayerIds: number[];
}

export default function TacticalPitch({ unlockedPlayerIds }: TacticalPitchProps) {
  const [formationName, setFormationName] = useState<string>("4-3-3 Ofensivo");
  const [assignedLineup, setAssignedLineup] = useState<{ [posId: string]: Player }>({});
  
  const [activeSelectPos, setActiveSelectPos] = useState<string | null>(null);

  const activePositions = FORMATIONS[formationName];

  const handleSelectPlayer = (posId: string, player: Player) => {
    setAssignedLineup((prev) => ({
      ...prev,
      [posId]: player,
    }));
    setActiveSelectPos(null);
    SoundFX.playGlue();
  };

  const handleClearLineup = () => {
    setAssignedLineup({});
    SoundFX.playWhistle();
  };

  const handleAutoFill = () => {
    // Fill each formation position with random unlocked players
    const unlocked = BT_PLAYERS.filter((p) => unlockedPlayerIds.includes(p.id));
    const pool = unlocked.length > 0 ? unlocked : BT_PLAYERS;
    
    const fill: { [posId: string]: Player } = {};
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    
    activePositions.forEach((pos, idx) => {
      // Pick based on index loop to allow reuse if pool is small
      const player = shuffled[idx % shuffled.length];
      fill[pos.id] = player;
    });

    setAssignedLineup(fill);
    SoundFX.playCelebration();
  };

  return (
    <div className="bg-[#012169] border-4 border-[#FFDF00] p-3 sm:p-5 md:p-6 rounded-xl shadow-2xl text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Settings bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/20">
        <div>
          <h2 className="text-xl md:text-2xl font-black flex items-center gap-2 uppercase tracking-tight text-[#FFDF00]">
            <Users className="text-[#FFDF00] h-6 w-6" /> Escalação do Hexa
          </h2>
          <p className="text-xs sm:text-sm text-white/95 font-medium">
            Escabe os heróis da seleção BT no campo tático e vença o jogo da satisfação!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={formationName}
            onChange={(e) => {
              setFormationName(e.target.value);
              setActiveSelectPos(null);
            }}
            className="cursor-pointer bg-[#009739] border-2 border-[#FFDF00] rounded px-3 py-1.5 text-xs font-black uppercase text-white hover:brightness-110 shadow-md focus:outline-hidden"
          >
            {Object.keys(FORMATIONS).map((name) => (
              <option key={name} value={name} className="bg-[#009739] text-white">
                {name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAutoFill}
            className="cursor-pointer flex items-center gap-1.5 bg-[#FFDF00] hover:brightness-110 text-[#012169] rounded px-3.5 py-1.5 text-xs font-black uppercase shadow-md transition-all active:scale-95 skew-x-[-12deg] border border-white"
          >
            <span className="skew-x-[12deg] flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Auto-Escalar
            </span>
          </button>

          <button
            onClick={handleClearLineup}
            className="cursor-pointer flex items-center gap-1 bg-[#012169] hover:bg-[#012169]/80 text-[#FFDF00] border-2 border-[#FFDF00] rounded px-3 py-1.5 text-xs font-black uppercase transition-all skew-x-[-12deg] shadow-md"
            title="Começar de novo"
          >
            <span className="skew-x-[12deg] flex items-center gap-1">
              <RefreshCw className="h-3.5 w-3.5" /> Limpar
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOCCER FIELD STAGE */}
        <div className="lg:col-span-8 relative aspect-[4/5] md:aspect-[4/3.5] w-full rounded-xl bg-gradient-to-b from-[#009739] via-[#008030] to-[#004f1c] border-4 border-[#FFDF00] shadow-2xl overflow-hidden pitch-pattern select-none">
          {/* Tactical Pitch Visual Markings */}
          <div className="absolute inset-4 border-2 border-white/25 pointer-events-none rounded-lg">
            {/* Center Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-white/25" />
            {/* Center Circle */}
            <div className="absolute top-1/2 left-1/2 h-26 w-26 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/25" />
            <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
            
            {/* Goal boxes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-14 w-44 border-b-2 border-x-2 border-white/25" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-14 w-44 border-t-2 border-x-2 border-white/25" />
            
            {/* Penalty boxes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-28 w-80 border-b-2 border-x-2 border-white/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-28 w-80 border-t-2 border-x-2 border-white/20" />
          </div>

          {/* PLACED PLAYERS GRID (ABSOLUTE POSITIONS) */}
          {activePositions.map((pos) => {
            const player = assignedLineup[pos.id];
            const isSelectingThis = activeSelectPos === pos.id;

            return (
              <div
                key={pos.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 animate-fade-in"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    onClick={() => {
                      setActiveSelectPos(isSelectingThis ? null : pos.id);
                      SoundFX.playFlip();
                    }}
                    className={`cursor-pointer group flex h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#012169] shadow-lg border-2 sm:border-3 transition-colors ${
                      player
                        ? "border-[#FFDF00] hover:border-white"
                        : "border-white/40 border-dashed hover:border-white"
                    } ${isSelectingThis ? "ring-4 ring-[#FFDF00] animate-pulse" : ""}`}
                  >
                    {player ? (
                      <div className="relative h-full w-full rounded-full overflow-hidden">
                        <img
                          src={player.imageUrl}
                          alt={player.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover scale-110"
                        />
                        <div className="absolute inset-0 bg-[#012169]/20 group-hover:bg-transparent transition-all" />
                      </div>
                    ) : (
                      <span className="text-[#FFDF00] font-black text-xs sm:text-base md:text-lg">+</span>
                    )}
                  </motion.div>

                  {/* Player Name Tag */}
                  <div className="mt-0.5 sm:mt-1 bg-[#012169] text-white border sm:border-2 border-[#FFDF00] rounded px-1 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-black text-center max-w-16 sm:max-w-20 md:max-w-24 whitespace-nowrap overflow-hidden text-ellipsis shadow-md skew-x-[-8deg] uppercase">
                    <span className="skew-x-[8deg] block">
                      {player ? player.name.split(" ")[0] : pos.label.split(" ")[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ACTIVE SELECTOR BOX */}
          {activeSelectPos && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-x-4 bottom-4 z-40 bg-[#012169]/95 border-4 border-[#FFDF00] p-4 rounded-lg shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/10">
                <span className="text-xs font-black text-[#FFDF00] uppercase tracking-wider">
                  Selecione um Craque de BT:
                </span>
                <button
                  onClick={() => setActiveSelectPos(null)}
                  className="cursor-pointer text-xs font-black text-white/70 hover:text-white bg-white/10 rounded px-2 py-0.5 uppercase"
                >
                  Fechar ✕
                </button>
              </div>

              {/* Grid of unlocked players */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-[#FFDF00]">
                {BT_PLAYERS.map((p) => {
                  const unlocked = unlockedPlayerIds.includes(p.id);
                  const isAssignedElsewhere = (Object.values(assignedLineup) as Player[]).some((ap) => ap && ap.id === p.id);

                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPlayer(activeSelectPos, p)}
                      disabled={!unlocked}
                      className={`relative flex-shrink-0 flex items-center gap-2.5 p-2 rounded border text-left transition-all ${
                        !unlocked
                          ? "bg-black/40 border-white/5 opacity-25 cursor-not-allowed"
                          : isAssignedElsewhere
                          ? "bg-[#012169] border-[#FFDF00] border-2 cursor-pointer shadow-md text-[#FFDF00]"
                          : "bg-[#012169]/50 border-white/15 hover:bg-[#009739] hover:border-white cursor-pointer"
                      }`}
                    >
                      <div className="h-9 w-9 rounded-full overflow-hidden bg-white/10 border border-white/20">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-[10px] font-black leading-none uppercase">{p.name.split(" ")[0]}</div>
                        <div className="text-[8px] text-[#FFDF00] font-black uppercase mt-1">{p.role.substring(0, 15)}...</div>
                      </div>
                      {!unlocked && (
                        <span className="absolute inset-0 bg-transparent flex items-center justify-center font-black text-[9px] text-red-500 bg-black/10 rounded">
                          🔒
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* STATS SUMMARY CARD */}
        <div className="lg:col-span-4 bg-[#012169]/80 border-4 border-[#FFDF00] p-5 rounded-xl">
          <h3 className="text-sm font-black text-[#FFDF00] uppercase tracking-wider mb-3">
            Análise Tática do Elenco
          </h3>

          <div className="space-y-4 text-xs font-semibold text-white/95">
            <div className="p-4 bg-[#009739] border-2 border-[#FFDF00] rounded text-white shadow-md">
              <span className="font-extrabold text-[11px] text-[#FFDF00] uppercase block mb-1">
                Estratégia Escolhida
              </span>
              <p className="font-black text-white text-sm uppercase">{formationName}</p>
              <p className="text-[11px] text-white/90 leading-relaxed font-medium mt-1">
                Uma formação flexível calibrada para focar na jornada dos clientes, balanceando empatia com alta resolutividade.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-extrabold text-[11px] text-[#FFDF00] uppercase block tracking-wider">
                Jogadores Escalados
              </span>
              <div className="flex justify-between items-center bg-[#012169] border border-white/10 p-2.5 rounded">
                <span>Total no Campo</span>
                <span className="font-black text-[#FFDF00]">
                  {Object.keys(assignedLineup).length} / 11
                </span>
              </div>
              <div className="flex justify-between items-center bg-[#012169] border border-white/10 p-2.5 rounded">
                <span>Copa Colecionáveis Unlocked</span>
                <span className="font-black text-green-300">
                  {unlockedPlayerIds.length} / 17
                </span>
              </div>
            </div>

            {/* Tactical instruction list */}
            <div className="border-t border-white/10 pt-3">
              <span className="font-extrabold text-[11px] text-white/60 uppercase block mb-2 tracking-wider">
                Instruções de Campo
              </span>
              <ul className="space-y-1.5 text-[11px] text-white/90 italic">
                <li>• Manter passes curtos e objetivos focado em resolver chamados de primeira.</li>
                <li>• No contra-ataque da dor de processo, acionar imediatamente um lateral ágil.</li>
                <li>• O NPS elevado é o gol que garante a permanência no topo da liga corporativa!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
