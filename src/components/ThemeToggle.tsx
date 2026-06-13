import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch (e) {
      // Fallback
    }
    return 'light';
  });

  useEffect(() => {
    try {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignore
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="group relative flex items-center justify-center p-3 sm:p-4 rounded-2xl glass-card border-none hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/20"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6 flex items-center justify-center text-slate-600 dark:text-slate-400">
        <Sun className={`absolute w-6 h-6 text-amber-500 transition-all duration-500 ${theme === 'dark' ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
        <Moon className={`absolute w-6 h-6 text-indigo-400 transition-all duration-500 ${theme === 'light' ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`} />
      </div>
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};

export default ThemeToggle;
