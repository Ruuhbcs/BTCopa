import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BT_QUIZ, QuizQuestion, Player, BT_PLAYERS } from "../types";
import SoundFX from "./SoundManager";
import { HelpCircle, CheckCircle, XCircle, Award, Trophy, Sparkles, RefreshCw, ChevronRight } from "lucide-react";

interface QuizViewProps {
  unlockedIds: number[];
  onRewardStickers: (players: Player[]) => void;
}

export default function QuizView({ unlockedIds, onRewardStickers }: QuizViewProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [rewardsWon, setRewardsWon] = useState<Player[]>([]);

  const question: QuizQuestion = BT_QUIZ[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedIdx === null || isAnswered) return;
    setIsAnswered(true);

    const isCorrect = selectedIdx === question.answerIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
      SoundFX.playPackOpen(); // Play snappy clean chime
    } else {
      SoundFX.playWhistle(); // Short buzzer/whistle
    }
  };

  const handleNextQuestion = () => {
    setSelectedIdx(null);
    setIsAnswered(false);

    if (currentIdx + 1 < BT_QUIZ.length) {
      setCurrentIdx((prev) => prev + 1);
      SoundFX.playFlip();
    } else {
      setQuizCompleted(true);
      SoundFX.playCelebration();
      
      // Calculate reward: find players not unlocked yet
      const uncollected = BT_PLAYERS.filter((p) => !unlockedIds.includes(p.id));
      const rewardPool = uncollected.length > 0 ? uncollected : BT_PLAYERS;
      
      // Select 3 random rewards
      const shuffled = [...rewardPool].sort(() => 0.5 - Math.random());
      const selectedRewards = shuffled.slice(0, 3);
      
      setRewardsWon(selectedRewards);
      if (selectedRewards.length > 0) {
        onRewardStickers(selectedRewards);
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setRewardsWon([]);
    SoundFX.playFlip();
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#012169] border-4 border-[#FFDF00] rounded-2xl shadow-2xl p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-b from-[#FFDF00]/5 to-transparent pointer-events-none" />

      <AnimatePresence mode="wait">
        {!quizCompleted ? (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10"
          >
            {/* Header progress */}
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10 text-xs font-black text-white/70">
              <span className="uppercase text-[#FFDF00] flex items-center gap-1">
                <HelpCircle className="h-4 w-4 animate-bounce" /> Quiz de Jornada BT
              </span>
              <span>Pergunta {currentIdx + 1} de {BT_QUIZ.length}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-black text-white mb-6 uppercase tracking-tight leading-snug">
              {question.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, idx) => {
                let btnStyle = "bg-[#012169]/40 border-white/20 text-white/95 hover:bg-white/10 hover:border-white/40";
                
                if (isAnswered) {
                  if (idx === question.answerIndex) {
                    btnStyle = "bg-green-600 border-green-400 text-white font-black shadow-[0_0_12px_rgba(34,197,94,0.4)]";
                  } else if (idx === selectedIdx) {
                    btnStyle = "bg-red-600 border-red-400 text-white/90";
                  } else {
                    btnStyle = "bg-black/30 border-white/5 text-white/40 cursor-default";
                  }
                } else if (idx === selectedIdx) {
                  btnStyle = "bg-[#FFDF00] border-white text-[#012169] font-black shadow-[0_0_12px_rgba(255,223,0,0.5)]";
                }

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    className={`cursor-pointer w-full text-left p-3.5 rounded-lg border-2 text-xs sm:text-sm font-semibold transition-all skew-x-[-8deg] flex items-center justify-between ${btnStyle}`}
                  >
                    <span className="skew-x-[8deg] block pr-4">{option}</span>
                    <span className="skew-x-[8deg] block shrink-0">
                      {isAnswered && idx === question.answerIndex && (
                        <CheckCircle className="h-5 w-5 text-white animate-pulse" />
                      )}
                      {isAnswered && idx === selectedIdx && idx !== question.answerIndex && (
                        <XCircle className="h-5 w-5 text-white" />
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation & Feedback Panel */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-black/35 border-2 border-[#FFDF00]/40 p-4 rounded-xl mb-6 text-xs text-white/90 leading-relaxed font-medium"
                >
                  <span className="font-extrabold text-[#FFDF00] uppercase block mb-1">
                    {selectedIdx === question.answerIndex ? "✨ Resposta Correta!" : "✕ Não foi dessa vez..."}
                  </span>
                  {question.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Trigger Buttons */}
            <div className="flex justify-end">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedIdx === null}
                  className={`cursor-pointer px-6 py-3 rounded text-xs font-black uppercase tracking-wider transition-all skew-x-[-12deg] border-2 ${
                    selectedIdx !== null
                      ? "bg-[#FFDF00] text-[#012169] border-[#FFDF00] hover:brightness-110 shadow-md active:scale-95"
                      : "bg-white/10 text-white/40 border-white/10 cursor-not-allowed"
                  }`}
                >
                  <span className="skew-x-[12deg] flex items-center gap-1">Confirmar Resposta</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="cursor-pointer bg-[#009739] hover:bg-green-600 text-white border-2 border-[#FFDF00] px-6 py-3 rounded text-xs font-black uppercase tracking-wider transition-all active:scale-95 skew-x-[-12deg] shadow-md"
                >
                  <span className="skew-x-[12deg] flex items-center gap-1.5">
                    {currentIdx + 1 < BT_QUIZ.length ? "Próxima Pergunta" : "Ver Resultado"} <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 relative z-10"
          >
            <Trophy className="h-16 w-16 text-[#FFDF00] mx-auto mb-4 animate-bounce" />
            
            <h3 className="text-xl font-black text-[#FFDF00] uppercase tracking-wider mb-1">
              Desempenho de Craque!
            </h3>
            <p className="text-xs text-white/85 mb-6">
              Você acertou <strong className="text-[#FFDF00] text-sm">{score} de {BT_QUIZ.length}</strong> perguntas sobre a jornada do cliente na BT!
            </p>

            {/* Reward feedback */}
            {rewardsWon.length > 0 ? (
              <div className="bg-black/40 border-2 border-dashed border-[#FFDF00] p-4 rounded-xl mb-6 max-w-md mx-auto">
                <span className="text-[10px] font-black uppercase text-[#FFDF00] flex items-center justify-center gap-1.5 mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFDF00]" /> Figurinhas Especiais Conquistadas!
                </span>
                
                <div className="flex justify-center gap-3">
                  {rewardsWon.map((p) => (
                    <div key={p.id} className="text-center group">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 bg-[#012169] mb-1.5 shadow-md">
                        <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[9px] font-black text-white/90 truncate w-14 uppercase">
                        {p.name.split(" ")[0]}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-400 font-medium mt-3">
                  Esses craques foram adicionados ao seu baú e já podem ser colados no seu álbum!
                </p>
              </div>
            ) : (
              <div className="bg-black/30 p-4 rounded-xl mb-6 text-xs text-white/70 max-w-md mx-auto">
                Você já possui todos os craques liberados! Parabéns pelo álbum completo!
              </div>
            )}

            {/* Resets and Replays */}
            <div className="flex justify-center gap-3">
              <button
                onClick={handleResetQuiz}
                className="cursor-pointer bg-[#012169]/60 hover:bg-[#012169] text-white border-2 border-white/40 px-5 py-2.5 rounded text-xs font-black uppercase tracking-wider transition-all active:scale-95 skew-x-[-12deg]"
              >
                <span className="skew-x-[12deg] flex items-center gap-1">
                  <RefreshCw className="h-3.5 w-3.5" /> Jogar Novamente
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
