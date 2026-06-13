import React from 'react';
import { useGame } from '../context/GameContext';
import { History as HistoryIcon, Trophy, Sparkles } from 'lucide-react';

const History: React.FC = () => {
  const { state } = useGame();
  const { history } = state;

  return (
    <div className="glass-card flex flex-col h-[380px] p-0 overflow-hidden group">
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/10 dark:bg-slate-900/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-500">
            <HistoryIcon size={18} />
          </div>
          <h3 className="text-sm font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">Chronicle</h3>
        </div>
        <Sparkles size={16} className="text-slate-400 animate-pulse" />
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
        {history.length <= 1 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4 opacity-50">
            <Trophy size={32} strokeWidth={1} />
            <span className="text-[10px] uppercase font-black tracking-[0.2em]">Awaiting the first move</span>
          </div>
        ) : (
          history.slice(1).map((board, index) => {
            const moveIndex = board.findIndex((cell, i) => cell !== history[index][i]);
            const player = board[moveIndex];
            const row = Math.floor(moveIndex / 3) + 1;
            const col = (moveIndex % 3) + 1;

            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-900/40 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all group/item animate-in slide-in-from-bottom-2 duration-500"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 w-5">#{(index + 1).toString().padStart(2, '0')}</span>
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-xl font-black text-xs shadow-inner
                    ${player === 'X' ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white'}
                  `}>
                    {player}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Position Blocked</span>
                    <span className="text-[10px] text-slate-400 font-medium">Coordinate: ({row}, {col})</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default History;
