import React from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
      '& > *': {
      margin: theme.spacing(3),
    },
      display: 'grid',
      gridTemplateColumns: 'auto auto auto auto',
      maxWidth: '120rem',
  },
}));

const Buttons = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Button variant="contained">Fetch comments</Button>
            <Button variant="contained">Fetch photos</Button>
            <Button variant="contained">Fetch todos</Button>
            <Button variant="contained">Fetch posts</Button>
        </div>
    )
}

export default Buttons
