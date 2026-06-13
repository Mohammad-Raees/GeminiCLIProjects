import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { GameProvider, useGame } from './context/GameContext';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import Controls from './components/Controls';
import ThemeToggle from './components/ThemeToggle';
import StartScreen from './components/StartScreen';
import History from './components/History';
import { useAI } from './hooks/useAI';
import { Trophy, Volume2, VolumeX, Settings } from 'lucide-react';

function GameContent() {
  const { state, dispatch } = useGame();
  const { winner, isGameOver, soundEnabled } = state;
  const [showStartScreen, setShowStartScreen] = useState(true);
  
  useAI();

  useEffect(() => {
    if (isGameOver && winner && winner !== 'Draw') {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isGameOver, winner]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 px-4 sm:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      {showStartScreen && <StartScreen onStart={() => setShowStartScreen(false)} />}
      
      <header className="w-full max-w-6xl flex items-center justify-between mb-8 sm:mb-12">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setShowStartScreen(true)}
          title="Return to start screen"
        >
          <div className="bg-indigo-600 p-2 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
            <Trophy className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight uppercase">
            Tic Tac <span className="text-indigo-600">Toe</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
            className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110 transition-transform active:scale-95"
            aria-label={soundEnabled ? 'Mute sounds' : 'Unmute sounds'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <ThemeToggle />
          <button
            onClick={() => setShowStartScreen(true)}
            className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110 transition-transform active:scale-95 lg:hidden"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Game Board */}
        <div className="lg:col-span-5 flex flex-col items-center gap-8 order-2 lg:order-1">
          <Board />
          <div className="hidden lg:block w-full">
            <History />
          </div>
        </div>
        
        {/* Right Column: Controls & Stats */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start gap-8 order-1 lg:order-2">
          <Scoreboard />
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
            <Controls />
            <div className="lg:hidden">
              <History />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-16 pb-8 text-slate-400 dark:text-slate-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-center">
        Created with <span className="text-rose-500">♥</span> • Production Ready Tic-Tac-Toe • 2026
      </footer>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
