import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from 'react';
import './Board.css';

function Board() {
  return (
    <div className="Board-div">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>A</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>B</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>C</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>D</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>E</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>F</Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>G</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>H</Paper>
            </Grid>
            <Grid item xs={1} className="Tile">
              <Paper elevation={4}>I</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Board;
