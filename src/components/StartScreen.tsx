import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, Users, Cpu, Play, Sparkles, User } from 'lucide-react';
import type { Difficulty } from '../types/game';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const { state, dispatch } = useGame();
  const { gameMode, difficulty, aiStarts } = state;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050505]/60 backdrop-blur-2xl animate-in fade-in duration-700 overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto p-8 sm:p-12 glass border-white/5 rounded-[3rem] shadow-[0_0_100px_rgba(99,102,241,0.2)] flex flex-col items-center gap-10 transform animate-in zoom-in-95 duration-700">
        
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />

        <div className="flex flex-col items-center gap-6 text-center relative">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-3xl shadow-[0_20px_40px_rgba(99,102,241,0.4)] rotate-12 hover:rotate-0 transition-all duration-700 cursor-help">
            <Trophy className="text-white w-10 h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase leading-none">
              <span className="text-slate-800 dark:text-white">Tic Tac</span>
              <br />
              <span className="text-gradient">Premium</span>
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">
              <Sparkles size={12} className="text-indigo-500" />
              Elite Gaming Protocol
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-4 w-full relative">
          <button
            onClick={() => dispatch({ type: 'SET_MODE', mode: 'PvP' })}
            className={`
              group relative flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500
              ${gameMode === 'PvP' 
                ? 'bg-white dark:bg-slate-800/80 border-indigo-500 shadow-2xl scale-[1.02]' 
                : 'bg-white/50 dark:bg-slate-900/40 border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:scale-[1.01]'}
            `}
          >
            <div className={`p-3 rounded-xl transition-all duration-500 ${gameMode === 'PvP' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              <Users size={24} />
            </div>
            <div className="text-center">
              <h3 className={`text-sm font-black ${gameMode === 'PvP' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>Player vs Player</h3>
            </div>
          </button>

          <button
            onClick={() => dispatch({ type: 'SET_MODE', mode: 'PvAI' })}
            className={`
              group relative flex flex-col items-center gap-4 p-6 rounded-[2rem] border-2 transition-all duration-500
              ${gameMode === 'PvAI' 
                ? 'bg-white dark:bg-slate-800/80 border-indigo-500 shadow-2xl scale-[1.02]' 
                : 'bg-white/50 dark:bg-slate-900/40 border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:scale-[1.01]'}
            `}
          >
            <div className={`p-3 rounded-xl transition-all duration-500 ${gameMode === 'PvAI' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
              <Cpu size={24} />
            </div>
            <div className="text-center">
              <h3 className={`text-sm font-black ${gameMode === 'PvAI' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-800 dark:text-slate-200'}`}>Player vs AI</h3>
            </div>
          </button>
        </div>

        {/* AI Settings */}
        {gameMode === 'PvAI' && (
          <div className="w-full flex flex-col gap-6 animate-in slide-in-from-top-4 duration-700 relative">
            {/* Difficulty Selector */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">Difficulty</span>
              <div className="flex bg-slate-100/50 dark:bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
                {(['Easy', 'Medium', 'Impossible'] as Difficulty[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => dispatch({ type: 'SET_DIFFICULTY', difficulty: level })}
                    className={`
                      flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300
                      ${difficulty === level ? 'bg-white dark:bg-slate-800 shadow-xl text-indigo-600 dark:text-indigo-400 scale-[1.05]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Turn Preference */}
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">First Move</span>
              <div className="flex bg-slate-100/50 dark:bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
                <button
                  onClick={() => !aiStarts || dispatch({ type: 'TOGGLE_AI_STARTS' })}
                  className={`
                    flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2
                    ${!aiStarts ? 'bg-white dark:bg-slate-800 shadow-xl text-indigo-600 dark:text-indigo-400 scale-[1.05]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                  `}
                >
                  <User size={14} /> You
                </button>
                <button
                  onClick={() => aiStarts || dispatch({ type: 'TOGGLE_AI_STARTS' })}
                  className={`
                    flex-1 py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2
                    ${aiStarts ? 'bg-white dark:bg-slate-800 shadow-xl text-indigo-600 dark:text-indigo-400 scale-[1.05]' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}
                  `}
                >
                  <Cpu size={14} /> AI
                </button>
              </div>
            </div>
          </div>
        )}

        {/* The Play Button */}
        <button
          onClick={onStart}
          className="relative w-full overflow-hidden group py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl transition-all duration-500 shadow-[0_20px_50px_rgba(99,102,241,0.4)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.5)] active:scale-95 mt-4"
        >
          <div className="relative z-10 flex items-center justify-center gap-4 font-black uppercase tracking-[0.3em]">
            <Play fill="currentColor" size={20} className="group-hover:translate-x-1 transition-transform" />
            Start {gameMode === 'PvAI' ? 'AI Arena' : 'Local Duel'}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
