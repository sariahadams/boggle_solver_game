import React, { useState } from "react";
import { Button, FormControl, Select, MenuItem } from "@mui/material";
import { GAME_STATE } from "./GameState";

function ToggleGameState({ gameState, setGameState, size, setSize, totalTime, setTotalTime }) {
  const [buttonText, setButtonText] = useState("Start a new game!");
  const [startTime, setStartTime] = useState(0);
  let deltaTime;

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
    // console.log("Size: ", event.target.value);
  };

  const updateGameState = (endTime) => {
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setStartTime(Date.now());
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      const deltaTime = (endTime - startTime) / 1000.0;
      setTotalTime(deltaTime);
      setGameState(GAME_STATE.ENDED);
      setButtonText("Start a new game!");
    }
  };

  return (
    <div className="Toggle-game-state">
      <Button variant="outlined" onClick={() => updateGameState(Date.now())}>
        {buttonText}
      </Button>
      {(gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) && (
        <div className="Input-select-size">
          <FormControl>
            <Select labelId="sizelabel" id="sizemenu" value={size} onChange={handleSizeChange}>
              <MenuItem value={3}>3x3</MenuItem>
              <MenuItem value={4}>4x4</MenuItem>
              <MenuItem value={5}>5x5</MenuItem>
              <MenuItem value={6}>6x6</MenuItem>
              <MenuItem value={7}>7x7</MenuItem>
              <MenuItem value={8}>8x8</MenuItem>
              <MenuItem value={9}>9x9</MenuItem>
              <MenuItem value={10}>10x10</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default ToggleGameState;

