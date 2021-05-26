import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";
import { openDB } from "idb";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "4px 20px 12px 20px",
    padding: "20px",
    border: "1px solid lightgray",
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    boxShadow: "5px 10px #C9DCE4",
  },
  buttonStyles: {
    "& > *": {
      margin: theme.spacing(1),
    },
    margin: "10px 10px 10px 100px",
    backgroundColor: "#AACDDD !important",
  },
}));

const Timestamp = (props) => {
  const classes = useStyles();
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [startSave, setStartSave] = useState('');
  const [endSave, setEndSave] = useState('');

  async function storeDataInIndexedDb(data, title) {
    const now = new Date();
    setStartSave(now.getTime());
    let db = await openDB("app-store");

    {
      const tx = db.transaction(title, "readwrite");

      let transactionData = [];
      for (let i = 0; i < data.data.length; i++) {
        transactionData.push(tx.store.add(data.data[i]));
      }
      transactionData.push(tx.done);

      await Promise.all(transactionData);
    }

    const endTime = new Date();
    setEndSave(endTime.getTime());
  }

  const fetchData = (title) => {
    const now = new Date();
    setStart(now.getTime());

    const url = `https://jsonplaceholder.typicode.com/${title.toLowerCase()}`;
    axios
      .get(url)
      .then((res) => {
        const now = new Date();
        setEnd(now.getTime());
        storeDataInIndexedDb(res, title.toLowerCase());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Call API after 5 secs delay as per requirement
    // Create a new function so as not to invoke it immediately
    setTimeout(() => fetchData(props?.title), 5000);
  }, [props?.title]);

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h4" gutterBottom>
         {props.title}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Start: ${start}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`End: ${end}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`Start Save: ${startSave}`}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {`End Save: ${endSave}`}
        </Typography>
      </div>
      <Button
        variant="contained"
        className={classes.buttonStyles}
        onClick={()=>fetchData(props?.title)}
      >{`Fetch ${props.title}`}</Button>
    </div>
  );
};

export default Timestamp;
