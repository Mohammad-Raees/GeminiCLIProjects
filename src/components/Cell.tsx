import React from 'react';
import { X, Circle } from 'lucide-react';
import type { CellValue } from '../types/game';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinningCell: boolean;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        relative h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center
        rounded-2xl transition-all duration-500 transform
        ${!value && !disabled 
          ? 'bg-slate-100/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-700/50 hover:scale-[1.02] hover:shadow-lg active:scale-95' 
          : 'bg-white/80 dark:bg-slate-800/60'}
        ${isWinningCell 
          ? 'bg-indigo-500 dark:bg-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] scale-[1.05] z-10' 
          : 'border border-slate-200/50 dark:border-slate-700/30'}
      `}
      aria-label={value ? `Cell filled with ${value}` : 'Empty cell'}
    >
      {value === 'X' && (
        <X 
          className={`
            w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 animate-in zoom-in-50 fade-in
            ${isWinningCell ? 'text-white' : 'text-rose-500'}
          `} 
          strokeWidth={2.5}
        />
      )}
      {value === 'O' && (
        <Circle 
          className={`
            w-10 h-10 sm:w-14 sm:h-14 transition-all duration-300 animate-in zoom-in-50 fade-in
            ${isWinningCell ? 'text-white' : 'text-indigo-500'}
          `}
          strokeWidth={2.5}
        />
      )}
    </button>
  );
};

export default Cell;
