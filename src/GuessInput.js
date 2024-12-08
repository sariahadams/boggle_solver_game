import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback }) {

  const [labelText, setLabelText] = useState("Make your first guess!");
  const [input, setInput] = useState("");

  function evaluateInput() {
    if (input.length === 0) return;
    if (foundSolutions.includes(input)) {
      setLabelText(input + " has already been found!");
    } else if (allSolutions.includes(input)) {      
      correctAnswerCallback(input);
      setLabelText(input + " is correct!");
    } else {
      setLabelText(input + " is incorrect!");
    }

    // Clear the input field
    setInput("");

  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      // console.log(input);
      evaluateInput()
    }
  }

  return (
    <div className="Guess-input">
      <div>
        {labelText}
      </div>
      <TextField value={input} onKeyDown={(e) => keyPress(e)} onChange={(event) => setInput(event.target.value.toLowerCase())} />
    </div>
  );
}

export default GuessInput;
