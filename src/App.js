import React, { useState } from "react";
import Post from "./Post";

import "./App.css";

function App() {
  const [post, setpost] = useState([
    {
      username: "Simha",
      caption: "Demon Slayer",
      imageurl:
        "https://i1.wp.com/recommendmeanime.com/wp-content/uploads/2019/04/demon-slayer-anime.jpeg?fit=1280%2C718&ssl=1",
    },
    {
      username: "Bharath",
      caption: "I loveit!",
      imageurl:
        "https://cosmosmagazine.com/wp-content/uploads/2019/12/GettyImages-691120979-1440x1079.jpg",
    },
  ]);
  return (
    <div className="App">
      <div className="app__header">
        <img
          className="app__header-image"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </div>

      {post.map((post) => (
        <Post
          username={post.username}
          caption={post.caption}
          imageurl={post.imageurl}
        />
      ))}

      {/* <Post
        username="Reddy"
        caption="It's accelerating"
        imageurl="https://images7.alphacoders.com/102/thumb-1920-1027364.png"
      />
      <Post
        username="bharath.simha.reddy"
        caption="YAY! spider"
        imageurl="https://i.pinimg.com/originals/bf/82/f6/bf82f6956a32819af48c2572243e8286.jpg"
      /> */}
    </div>
  );
}

export default App;
