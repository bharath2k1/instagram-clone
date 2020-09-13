import React, { useEffect, useState } from "react";
import Post from "./Post";

import "./App.css";
import db from "./firebase";
import { Button, makeStyles, Modal, TextField } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [post, setpost] = useState([]);
  const [open, setopen] = useState(false);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
      setpost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  const signup = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Modal open={open} onClose={() => setopen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__header-image"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <TextField
              className="app__signup-textfield"
              id="outlined-secondary"
              label="Enter email"
              variant="outlined"
              color="secondary"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <TextField
              className="app__signup-textfield"
              id="outlined-secondary"
              label="Enter username"
              variant="outlined"
              color="secondary"
              type="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              className="app__signup-textfield"
              type="password"
              id="outlined-secondary"
              label="Enter password"
              variant="outlined"
              color="secondary"
              type="email"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button type="submit" onClick={signup}>
              Signup
            </Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <Button onClick={() => setopen(true)}>Sign up</Button>

      {post.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageurl={post.imageurl}
        />
      ))}
    </div>
  );
}

export default App;

{
  /* 
      <Post
        username="bharath.simha.reddy"
        caption="YAY! spider"
        imageurl="https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg"
      />
       {
    //   username: "Bharath",
    //   caption: "I loveit!",
    //   imageurl:
    //     "https://cosmosmagazine.com/wp-content/uploads/2019/12/GettyImages-691120979-1440x1079.jpg",
    // }, */
}
