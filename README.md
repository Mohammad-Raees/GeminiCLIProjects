# Modern Tic-Tac-Toe

A premium, production-quality Tic-Tac-Toe game built with React 19, TypeScript, and Tailwind CSS v4.

## Features

- **Premium UI/UX:** Modern design with smooth gradients, subtle animations, and micro-interactions.
- **Game Modes:** 
  - **PvP:** Local two-player mode.
  - **PvAI:** Challenge the computer with three difficulty levels:
    - **Easy:** Random moves.
    - **Medium:** 50/50 split between optimal and random.
    - **Impossible:** Powered by the **Minimax Algorithm**, ensuring the AI never loses.
- **Advanced State Management:** 
  - Move history with **Undo** functionality.
  - Score tracking for X, O, and Draws.
  - Persistence using **Local Storage**.
- **Theming:** Full support for **Light Mode** and **Dark Mode** with a toggle.
- **Celebrations:** Confetti effects on victory!
- **Responsive:** Fully optimized for desktop, tablet, and mobile devices.
- **Accessibility:** ARIA labels and keyboard navigation support.

## Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate) (integrated in v4) & [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository or extract the source code.
2. Navigate to the project directory:
   ```bash
   cd geminicliprojects
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server:
```bash
npm run dev
```
The game will be available at `http://localhost:5173`.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The output will be in the `dist` folder.

## Project Structure

- `src/components`: UI components (Board, Cell, Scoreboard, etc.)
- `src/context`: Game state management using React Context and `useReducer`.
- `src/hooks`: Custom hooks, including `useAI` for computer moves.
- `src/utils`: Core logic, win detection, and the Minimax algorithm.
- `src/types`: TypeScript interfaces and type definitions.

## AI Implementation: Minimax Algorithm

The "Impossible" difficulty uses a recursive Minimax algorithm that explores all possible future moves to determine the optimal path. It assigns scores to potential outcomes (+10 for AI win, -10 for Human win, 0 for draw) and chooses the move that maximizes its own score while assuming the human plays optimally to minimize it.

---
Built with ❤️ by Gemini CLI
