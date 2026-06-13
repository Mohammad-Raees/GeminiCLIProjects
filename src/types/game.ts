export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameMode = 'PvP' | 'PvAI';
export type Difficulty = 'Easy' | 'Medium' | 'Impossible';

export interface GameState {
  board: CellValue[];
  isXNext: boolean;
  winner: Player | 'Draw' | null;
  winningLine: number[] | null;
  history: CellValue[][];
  scores: {
    X: number;
    O: number;
    Draws: number;
  };
  gameMode: GameMode;
  difficulty: Difficulty;
  isGameOver: boolean;
  soundEnabled: boolean;
  aiStarts: boolean;
}

export type GameAction =
  | { type: 'MOVE'; index: number }
  | { type: 'RESTART' }
  | { type: 'RESET_SCORES' }
  | { type: 'UNDO' }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }
  | { type: 'SET_THEME'; theme: 'light' | 'dark' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'TOGGLE_AI_STARTS' };
