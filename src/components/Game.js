import React, { useState, useEffect, useCallback } from "react";
import firebase from "../firebaseConfig";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Game() {
  const [widget, setWidget] = useState("");
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //
      // The String to change is below
      //
      //
      //
      alert("YOU WON \nSpeed Score: 14pts\nEfficiency Score: 13pts\nTotal Points: 27pts!")
    }
  }, []);
  useEffect(() => {
    setWidget(
      "https://hourofpython.trinket.io/python-challenges#/string-challenges/lowercase-challenge"
    );

    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
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
