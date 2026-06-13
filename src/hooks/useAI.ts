import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { getBestMove, getRandomMove, getMediumMove } from '../utils/minimax';
import type { Player } from '../types/game';

export function useAI() {
  const { state, dispatch } = useGame();
  const { board, isXNext, gameMode, difficulty, isGameOver, winner, aiStarts } = state;

  useEffect(() => {
    // Determine AI player based on who starts. If AI starts, AI is X. Otherwise AI is O.
    const aiPlayer: Player = aiStarts ? 'X' : 'O';
    const isAiTurn = isXNext === (aiPlayer === 'X');

    if (gameMode === 'PvAI' && isAiTurn && !isGameOver && !winner) {
      const timer = setTimeout(() => {
        let move: number;
        switch (difficulty) {
          case 'Easy':
            move = getRandomMove(board);
            break;
          case 'Medium':
            move = getMediumMove(board, aiPlayer);
            break;
          case 'Impossible':
            move = getBestMove(board, aiPlayer);
            break;
          default:
            move = getBestMove(board, aiPlayer);
        }

        if (move !== -1) {
          dispatch({ type: 'MOVE', index: move });
        }
      }, 600); // 600ms delay to simulate "thinking"

      return () => clearTimeout(timer);
    }
  }, [board, isXNext, gameMode, difficulty, isGameOver, winner, aiStarts, dispatch]);
}
