import React, { useState, useEffect } from 'react';

import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import { GAME_STATE } from './GameState.js';
import logo from './logo.png';
import './App.css';

function App() {
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size
  const [game, setGame] = useState({}); // used to hold the MOCK REST ENDPOINTDATA 

  const Convert = (s) => {  // convert a string into an array of tokens that are strings
    s = s.replace(/'/g, '');
    s = s.replace('[', '');
    s = s.replace(']', '');
    const tokens = s.split(",") // Split the string into an array of tokens
      .map(token => token.trim()) // Trim each token
      .filter(token => token !== ''); // Remove empty tokens
    return tokens;
  }
  // useEffect will trigger when the array items in the second argument are
  // updated so whenever grid is updated, we will recompute the solutions
  useEffect(() => {
    if (typeof game.found_words !== "undefined") {
      const tmpAllSolutions = Convert(game.found_words);
      setAllSolutions(tmpAllSolutions);
    }
  }, [grid, game.found_words]);

  // This will run when the gameState changes
  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      // const url = "https://floorlimit-radarbrush-8000.codio.io/api/game/create/" + size;
      const url = "http://localhost:8000/api/game/create/" + size;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log(`Game data: ${JSON.stringify(data)}`);
          setGame(data);
          const s = data.grid.replace(/'/g, '"');  //replace single ' with double "
          setGrid(JSON.parse(s));
          setFoundSolutions([]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [gameState, size]);





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
            correctAnswerCallback={correctAnswerFound} />
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board board={grid} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words [wordsize > 3]" words={allSolutions} />
        </>)}
    </div>
  );
}

export default App;

