import React from 'react';
import './FoundSolutions.css';

function FoundSolutions({ words, headerText}) {
  return (
    <div className="Found-solutions-list">

      {words && words.length > 0 &&
      <h4>{headerText}: {words.length}</h4>
  }
  <ul>
    {words && words.map((solution, index) => {return <li key={index}>{solution}</li>})}
  </ul>
    </div>
  );
}

export default FoundSolutions;
