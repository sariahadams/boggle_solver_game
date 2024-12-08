import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from 'react';
import './Board.css';

function Board({ board }) {
  return (
    <div className="Board-div">
      <Grid container justifyContent="center">
        {board.length > 0 &&
          board.map((row, rowIndex) => ((
            <Grid key={`grid_${rowIndex}`} item xs={12}>
              <Grid key={`grid_container_${rowIndex}`} container spacing={1} justifyContent="space-around">
                {row.map((item, colIndex) => (
                  <Grid key={`row${rowIndex}col${colIndex}`} item xs={1} className="Tile">
                    <Paper key={`paper_row${rowIndex}col${colIndex}`} elevation={4}>{item}</Paper>
                  </Grid>)
                )
                }
              </Grid>
            </Grid>)
          ))
        }
      </Grid>
    </div>
  );
}

export default Board;
