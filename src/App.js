import React, { useState, useEffect } from "react";
import Timestamp from "./components/Timestamp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { openDB, deleteDB, wrap, unwrap } from 'idb';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: '8px',
  },

  currentTimestamp: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px',
  },

  timestampComponent: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
  },
});

const getCurrentTimestamp = () => {
  const now = new Date();
  return now.getTime();
} 

function App() {
  const classes = useStyles();
  useEffect(() => {
    deleteDB('app-store', {
});
    const dbPromise = openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('comments', {keyPath: 'id'});
        db.createObjectStore('photos', {keyPath: 'id'});
        db.createObjectStore('todos', {keyPath: 'id'});
        db.createObjectStore('posts', {keyPath: 'id'});
      },
    });
  });

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Test App
        </Typography>
      </div>
      <div className={classes.currentTimestamp}>
        {`Current Unix Timestamp: ${getCurrentTimestamp()}`}
      </div>
      <div className={classes.timestampComponent}>
        <Timestamp title='Comments' />
        <Timestamp title='Photos' />
        <Timestamp title='Todos' />
        <Timestamp title='Posts' />
      </div>
    </div>
  );
}

export default App;
