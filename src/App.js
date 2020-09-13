import React, { useEffect, useState } from "react";
import Post from "./Post";

import "./App.css";
import db from "./firebase";

function App() {
  const [post, setpost] = useState([]);

  useEffect(() => {
    db.collection("post").onSnapshot((snapshot) => {
      setpost(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>

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
