import type { CellValue, Player } from '../types/game';

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function calculateWinner(board: CellValue[]): { winner: Player | 'Draw' | null; line: number[] | null } {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: combination };
    }
  }

  if (board.every(cell => cell !== null)) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null };
}
