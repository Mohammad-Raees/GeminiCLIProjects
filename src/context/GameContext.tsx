import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameState, GameAction } from '../types/game';
import { calculateWinner } from '../utils/gameLogic';
import { soundManager } from '../utils/sounds';

const initialState: GameState = {
  board: Array(9).fill(null),
  isXNext: true, // X always starts
  winner: null,
  winningLine: null,
  history: [Array(9).fill(null)],
  scores: {
    X: 0,
    O: 0,
    Draws: 0,
  },
  gameMode: 'PvP',
  difficulty: 'Impossible',
  isGameOver: false,
  soundEnabled: true,
  aiStarts: false,
};

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | undefined>(undefined);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MOVE': {
      if (state.board[action.index] || state.isGameOver) return state;

      const newBoard = [...state.board];
      newBoard[action.index] = state.isXNext ? 'X' : 'O';
      const { winner, line } = calculateWinner(newBoard);
      
      const newHistory = [...state.history, newBoard];
      const isGameOver = winner !== null;

      let newScores = { ...state.scores };
      if (winner === 'X') newScores.X += 1;
      else if (winner === 'O') newScores.O += 1;
      else if (winner === 'Draw') newScores.Draws += 1;

      // Sound Trigger
      if (winner === 'Draw') soundManager.playDraw();
      else if (winner) soundManager.playWin();
      else soundManager.playMove();

      return {
        ...state,
        board: newBoard,
        isXNext: !state.isXNext,
        winner,
        winningLine: line,
        history: newHistory,
        scores: newScores,
        isGameOver,
      };
    }
    case 'RESTART':
      return {
        ...state,
        board: Array(9).fill(null),
        isXNext: true, // Reset to X starting
        winner: null,
        winningLine: null,
        history: [Array(9).fill(null)],
        isGameOver: false,
      };
    case 'RESET_SCORES':
      return {
        ...state,
        scores: { X: 0, O: 0, Draws: 0 },
      };
    case 'UNDO': {
      if (state.history.length <= 1) return state;
      const newHistory = state.history.slice(0, -1);
      const previousBoard = newHistory[newHistory.length - 1];
      const { winner, line } = calculateWinner(previousBoard);
      
      return {
        ...state,
        board: previousBoard,
        isXNext: newHistory.length % 2 !== 0,
        winner,
        winningLine: line,
        history: newHistory,
        isGameOver: winner !== null,
      };
    }
    case 'SET_MODE':
      return { 
        ...initialState, 
        gameMode: action.mode, 
        scores: state.scores, 
        soundEnabled: state.soundEnabled,
        aiStarts: state.aiStarts // Preserve aiStarts preference
      };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };
    case 'TOGGLE_SOUND':
      const newSoundState = !state.soundEnabled;
      soundManager.setMuted(!newSoundState);
      return { ...state, soundEnabled: newSoundState };
    case 'TOGGLE_AI_STARTS':
      return { ...state, aiStarts: !state.aiStarts };
    default:
      return state;
  }
}

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    try {
      const savedScores = localStorage.getItem('tictactoe-scores');
      const savedSound = localStorage.getItem('tictactoe-sound');
      
      let scores = initial.scores;
      if (savedScores) {
        const parsed = JSON.parse(savedScores);
        if (parsed && typeof parsed === 'object') scores = parsed;
      }
      
      let soundEnabled = initial.soundEnabled;
      if (savedSound) {
        const parsed = JSON.parse(savedSound);
        if (typeof parsed === 'boolean') {
          soundEnabled = parsed;
          soundManager.setMuted(!soundEnabled);
        }
      }

      return { ...initial, scores, soundEnabled };
    } catch (e) {
      console.error('Failed to load from local storage', e);
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tictactoe-scores', JSON.stringify(state.scores));
      localStorage.setItem('tictactoe-sound', JSON.stringify(state.soundEnabled));
    } catch (e) {
      // Ignore storage errors
    }
  }, [state.scores, state.soundEnabled]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
