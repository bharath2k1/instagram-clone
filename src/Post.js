import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";

const Post = ({ username, imageurl, caption }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageurl} alt="" />
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};

export default Post;
