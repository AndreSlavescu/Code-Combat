import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebaseConfig";


const auth = firebase.auth();
const firestore = firebase.firestore();

function Game() {
  const [widget, setWidget] = useState("");
  useEffect(() => {
    setWidget(
      "https://hourofpython.trinket.io/python-challenges#/string-challenges/lowercase-challenge"
    );
  });

  return (
    <div class="code-content">
      <div class="content-blocker">
        <iframe
          src={widget}
          id="myframe"
          scrolling="yes"
          frameborder="1"
          marginheight="0px"
          marginwidth="0px"
          height="1150px"
          width="1670px"
        ></iframe>
      </div>
    </div>
  );
}

export default Game;
