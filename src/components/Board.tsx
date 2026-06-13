import React from 'react';
import { useGame } from '../context/GameContext';
import Cell from './Cell';

const Board: React.FC = () => {
  const { state, dispatch } = useGame();
  const { board, winningLine, isGameOver, gameMode, isXNext, aiStarts } = state;

  const handleCellClick = (index: number) => {
    dispatch({ type: 'MOVE', index });
  };

  // Logic to determine if AI is currently "thinking" and human input should be blocked
  const aiPlayer = aiStarts ? 'X' : 'O';
  const isAiTurn = isXNext === (aiPlayer === 'X');
  const isAiThinking = gameMode === 'PvAI' && isAiTurn && !isGameOver;

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-slate-100/50 dark:bg-slate-900/30 rounded-3xl shadow-inner border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => handleCellClick(index)}
          isWinningCell={winningLine?.includes(index) ?? false}
          disabled={isGameOver || isAiThinking}
        />
      ))}
    </div>
  );
};

export default Board;
