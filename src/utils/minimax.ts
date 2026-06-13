import type { CellValue, Player } from '../types/game';
import { calculateWinner } from './gameLogic';

export function minimax(board: CellValue[], depth: number, isMaximizing: boolean, aiPlayer: Player): number {
  const result = calculateWinner(board);
  const humanPlayer: Player = aiPlayer === 'X' ? 'O' : 'X';

  if (result.winner === aiPlayer) return 10 - depth;
  if (result.winner === humanPlayer) return depth - 10;
  if (result.winner === 'Draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false, aiPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        const score = minimax(board, depth + 1, true, aiPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function getBestMove(board: CellValue[], aiPlayer: Player): number {
  let bestScore = -Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      const score = minimax(board, 0, false, aiPlayer);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

export function getRandomMove(board: CellValue[]): number {
  const availableMoves = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

export function getMediumMove(board: CellValue[], aiPlayer: Player): number {
  // 50% chance of making the best move, 50% chance of a random move
  return Math.random() < 0.5 ? getBestMove(board, aiPlayer) : getRandomMove(board);
}
