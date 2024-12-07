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
  // const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  // const [size, setSize] = useState(3);
  // const { totalTime, setTotalTime } = useState(0);
  // const [board, setBoard] = useState([]);
  // const [allSolutions, setAllSolutions] = useState([]);
  // const [foundSolutions, setFoundSolutions] = useState([]);
  const obj = require('./Boggle_Solutions_Endpoint.json');
  const [allSolutions, setAllSolutions] = useState([]);  // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]);  // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]);   // the grid
  const [totalTime, setTotalTime] = useState(0);  // total time elapsed
  const [size, setSize] = useState(3);  // selected grid size
  const [game, setGame] = useState({}); // used to hold the MOCK REST ENDPOINTDATA 
  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]); // cache this value so that it doesn't have to been refreshed everytime we visit the page.

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setAllSolutions(generateSolutions());
      const g = myMap.get(size.toString());  // THIS WILL BE REPLACED WITH REST ENDPOINT in Assignment #5
      setGame(g);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  const generateBoard = (size) => {
    return Array.from({ length: size }, () =>
      Array.from({ length: size }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)))
    );
  };

  const generateSolutions = () => {
    return ["CAT", "DOG", "BIRD"]; //dummy data
  };

  const correctAnswerFound = (answer) => {
    for (let i = 0; i < allSolutions.length; i++) {
      if (allSolutions[i] === answer) {
        setFoundSolutions([...foundSolutions, answer]);
        break;
      }
    }
  };

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />

      {/* <ToggleGameState
        gameState={gameState}
        setGameState={setGameState}
        setSize={size}
        setTotalTime={setSize}
      /> */}
        <ToggleGameState gameState={gameState}
                       setGameState={setGameState} 
                       setSize={(state) => setSize(state)}
                       setTotalTime={(state) => setTotalTime(state)}/>

      {/* {gameState !== GAME_STATE.BEFORE && <Board board={board} />} */}
      {gameState === GAME_STATE.IN_PROGRESS && (
        <>
          <Board />
          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={correctAnswerFound}
          //correctAnswerCallback={(answer) => correctAnswerFound(answer)}/>
          />
          <FoundSolutions />
          {<FoundSolutions headerText="Solutions you've found" words={foundSolutions} /> }
        </>
      )}

      {gameState === GAME_STATE.ENDED && (
        <>
          <Board />
          <FoundSolutions headerText="Solutions you've found" words={foundSolutions} />
          {/* <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <Board board={grid} />
          <SummaryResults words={foundSolutions} totalTime={totalTime} />
          <FoundSolutions headerText="Missed Words [wordsize > 3]: " words={allSolutions}  /> */}
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

