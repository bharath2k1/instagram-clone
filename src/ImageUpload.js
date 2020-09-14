import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setcaption] = useState("");
  const [image, setimage] = useState(null);
  const [progress, setprogress] = useState(0);

  const onHandleChange = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };

  const onHandleUpload = () => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageurl: fireBaseUrl,
              username: username,
            });
            setprogress(0);
            setimage(null);
            setcaption("");
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <progress value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption"
        onChange={(e) => setcaption(e.target.value)}
      />
      <input type="file" onChange={onHandleChange} />
      <Button onClick={onHandleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
