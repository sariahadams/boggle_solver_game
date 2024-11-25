import React, { useState, useEffect, useMemo } from 'react';

import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import { GAME_STATE } from './GameState.js';
import logo from './logo.png';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [size, setSize] = useState(3);
  const { totalTime, setTotalTime } = useState(0);
  const [board, setBoard] = useState([]);
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setBoard(generateBoard(size));
      setAllSolutions(generateSolutions());
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  const generateBoard = (size) => {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );
  };

  const generateSolutions = () => {
    return ["CAT", "DOG", "BIRD"];
  };

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />

      <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        setSize={size}
        setTotalTime={setSize}
      />

      {gameState !== GAME_STATE.BEFORE && <Board board={board} />}
      {gameState === GAME_STATE.IN_PROGRESS && (
        <>
          <Board />
          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
          //correctAnswerCallback={correctAnswerFound}
          />
          <FoundSolutions />

        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board />
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
        </>)}

      {/* <div>
        <Board />
        <GuessInput />
        <FoundSolutions />
      </div> */}
      {/* 
      <div>
        <Board />
        <SummaryResults />
        <FoundSolutions />
      </div> */}
    </div>
  );
}

export default App;

