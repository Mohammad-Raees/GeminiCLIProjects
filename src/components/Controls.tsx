import React from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw, Trash2, Undo2, Users, Cpu, ChevronDown } from 'lucide-react';

const Controls: React.FC = () => {
  const { state, dispatch } = useGame();
  const { gameMode, difficulty, history } = state;

  const handleResetScores = () => {
    if (window.confirm('Are you sure you want to reset all scores?')) {
      dispatch({ type: 'RESET_SCORES' });
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Mode Selector - Premium Glass */}
      <div className="glass-card flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Match Type</span>
          <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-white/5">
            <button
              onClick={() => dispatch({ type: 'SET_MODE', mode: 'PvP' })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                gameMode === 'PvP' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Users size={14} /> Local
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_MODE', mode: 'PvAI' })}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                gameMode === 'PvAI' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              <Cpu size={14} /> Bot
            </button>
          </div>
        </div>

        {gameMode === 'PvAI' && (
          <div className="flex items-center justify-between animate-in slide-in-from-top-2 duration-500">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Bot Skill</span>
            <div className="relative group">
              <select
                value={difficulty}
                onChange={(e) => dispatch({ type: 'SET_DIFFICULTY', difficulty: e.target.value as any })}
                className="appearance-none bg-slate-100 dark:bg-slate-900/50 border-none rounded-xl text-xs font-bold px-4 py-2 pr-10 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer text-slate-700 dark:text-slate-300 transition-all"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Impossible">Impossible</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
            </div>
          </div>
        )}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => dispatch({ type: 'RESTART' })}
          className="glass-card flex flex-col items-center justify-center gap-3 py-4 hover:bg-indigo-500 dark:hover:bg-indigo-600 group hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
        >
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
            <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">Restart</span>
        </button>

        <button
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={history.length <= 1}
          className="glass-card flex flex-col items-center justify-center gap-3 py-4 group disabled:opacity-30 disabled:grayscale disabled:hover:scale-100"
        >
          <div className="bg-slate-100 dark:bg-slate-900/30 p-2 rounded-xl text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
            <Undo2 size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Undo</span>
        </button>

        <button
          onClick={handleResetScores}
          className="glass-card flex flex-col items-center justify-center gap-3 py-4 group hover:bg-rose-500 hover:shadow-[0_10px_30px_rgba(244,63,94,0.3)]"
        >
          <div className="bg-rose-100 dark:bg-rose-900/30 p-2 rounded-xl text-rose-600 dark:text-rose-400 group-hover:bg-white group-hover:text-rose-600 transition-colors">
            <Trash2 size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-white transition-colors">Reset</span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
