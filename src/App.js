import React, { useEffect, useState } from "react";
import Post from "./Post";

import "./App.css";
import { db, auth } from "./firebase";
import { Button, makeStyles, Modal, TextField } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

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
  const [user, setuser] = useState(null);
  const [openSignin, setopenSignin] = useState(false);
  const [comments, setcomments] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setuser(authuser);
        // if (authuser.displayName) {
        // } else {
        //   return authuser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        setuser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("post")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setpost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      });
  }, []);

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authuser) => {
        return authuser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));

    setopen(false);
  };

  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message));
    setopenSignin(false);
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
              id="outlined-secondary bun"
              label="Enter username"
              variant="outlined"
              color="secondary"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
            <TextField
              className="app__signup-textfield"
              type="password"
              id="outlined-password-input"
              label="Enter password"
              variant="outlined"
              color="secondary"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button type="submit" onClick={signup}>
              Signup
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setopenSignin(false)}>
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
              type="password"
              id="outlined-password-input"
              label="Enter password"
              variant="outlined"
              color="secondary"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />

            <Button type="submit" onClick={signin}>
              signin
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
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div>
            <Button onClick={() => setopenSignin(true)}>Signin</Button>
            <Button onClick={() => setopen(true)}>Signup</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        <div className="app__post-left">
          {post.map(({ id, post }) => (
            <Post
              key={id}
              postid={id}
              username={post.username}
              caption={post.caption}
              imageurl={post.imageurl}
            />
          ))}
        </div>
        <div className="app__post-right">
          <InstagramEmbed
            url="https://www.instagram.com/p/CE117-EgOBy/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry! please Login to upload</h3>
      )}
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
