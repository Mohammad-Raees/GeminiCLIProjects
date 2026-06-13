import React from 'react';
import { useGame } from '../context/GameContext';
import { X, Circle } from 'lucide-react';

const Scoreboard: React.FC = () => {
  const { state } = useGame();
  const { scores, isXNext, isGameOver, winner } = state;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Turn Indicator */}
      <div className="flex justify-center items-center gap-6 p-2 bg-slate-200/50 dark:bg-slate-900/50 rounded-3xl w-fit mx-auto border border-white/10">
        <div className={`
          flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500
          ${isXNext && !isGameOver ? 'bg-white dark:bg-slate-800 shadow-xl scale-105 text-rose-500' : 'text-slate-400'}
        `}>
          <X size={20} strokeWidth={3} className={isXNext && !isGameOver ? 'animate-pulse' : ''} />
          <span className="font-bold tracking-tight">Player X</span>
        </div>
        
        <div className={`
          flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500
          ${!isXNext && !isGameOver ? 'bg-white dark:bg-slate-800 shadow-xl scale-105 text-indigo-500' : 'text-slate-400'}
        `}>
          <Circle size={18} strokeWidth={3} className={!isXNext && !isGameOver ? 'animate-pulse' : ''} />
          <span className="font-bold tracking-tight">Player O</span>
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card flex flex-col items-center justify-center py-6 group hover:scale-[1.02] active:scale-95 transition-all">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Wins X</span>
          <span className="text-4xl font-black text-rose-500 tabular-nums drop-shadow-[0_0_10px_rgba(244,63,94,0.3)]">{scores.X}</span>
        </div>
        
        <div className="glass-card flex flex-col items-center justify-center py-6 group hover:scale-[1.02] active:scale-95 transition-all">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Draws</span>
          <span className="text-4xl font-black text-slate-600 dark:text-slate-300 tabular-nums">{scores.Draws}</span>
        </div>
        
        <div className="glass-card flex flex-col items-center justify-center py-6 group hover:scale-[1.02] active:scale-95 transition-all">
          <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-2">Wins O</span>
          <span className="text-4xl font-black text-indigo-500 tabular-nums drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]">{scores.O}</span>
        </div>
      </div>

      {/* Status Modal Effect */}
      {isGameOver && (
        <div className="text-center animate-in zoom-in duration-500 fill-mode-both">
          {winner === 'Draw' ? (
            <h2 className="text-3xl font-black text-slate-600 dark:text-slate-300 tracking-tight">Game Draw! 🤝</h2>
          ) : (
            <h2 className={`text-3xl font-black tracking-tight flex items-center justify-center gap-3 ${winner === 'X' ? 'text-rose-500' : 'text-indigo-500'}`}>
              {winner} Wins the Round! 👑
            </h2>
          )}
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
