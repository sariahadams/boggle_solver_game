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
  const obj = require('./Boggle_Solutions_Endpoint.json');
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size
  const [game, setGame] = useState({}); // used to hold the MOCK REST ENDPOINTDATA 
  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]); // cache this value so that it doesn't have to been refreshed everytime we visit the page.

  // useEffect will trigger when the array items in the second argument are updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    let tmpAllSolutions = game.solutions;
    setAllSolutions(tmpAllSolutions);
  }, [grid, game, gameState]);

  // This will run when the gameState changes
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      // Make API call to get the game data
      const g = myMap.get(size.toString());  // THIS WILL BE REPLACED WITH REST ENDPOINT in Assignment #5
      setGame(g);
      setAllSolutions(g.solutions);
      // console.log(`Reset allSolutions: ${g.solutions.length}`);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size, myMap]);

  const correctAnswerFound = (answer) => {
    // console.log(`New correct answer: ${answer}`);
    const index = allSolutions.indexOf(answer);
    const copyAllSolutions = allSolutions;
    copyAllSolutions.splice(index, 1);
    setAllSolutions(copyAllSolutions);
    setFoundSolutions([...foundSolutions, answer]);
  };

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />
      <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        size={size}
        setSize={setSize}
        setTotalTime={setTotalTime} />

      {gameState === GAME_STATE.IN_PROGRESS && (
        <>
          <Board board={grid} />
          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={correctAnswerFound}/>
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board board={grid} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words [wordsize > 3]" words={allSolutions}  />
        </>)}
    </div>
  );
}

export default App;

