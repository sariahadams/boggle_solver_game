import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';

function GuessInput() {
  const [guess, setGuess] = useState("");
  const labelText = "Enter your guess:"; // Define labelText here

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Handle the enter key press, e.g., submit the guess
      console.log("Submitted guess:", guess);
      // You may want to clear the input after submission
      setGuess("");
    }
  };

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  return (
    <div className="Guess-input">
      <div>
        {labelText}
      </div>
      <TextField 
        value={guess}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your guess here"
      />
    </div>
  );
}

export default GuessInput;
