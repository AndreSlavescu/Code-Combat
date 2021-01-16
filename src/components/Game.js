import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebaseConfig";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Game() {
  const [widgetHTML, setWidgetHTML] = useState("");
  let { id } = useParams();

  const updateGame = async () => {
    const gamesRef = firestore.collection("games").doc(id);
    const doc = await gamesRef.get();
    if (!doc.exists) {
      return (
        <div>
          <div></div>
        </div>
      );
    } else {
      if (doc.data().players > 1) setWidgetHTML(doc.data().widgetHTML);
    }
  };

  const getGame = () => {
    return new Promise((resolve, reject) => {
      firestore.collection("games").onSnapshot((snapshot) => {
        console.log("onSnapshot Called!");
        let updatedData = snapshot.docs.map((doc) => doc.data());
        resolve(updatedData);
      }, reject);
    });
  };

  useEffect(() => {
    // Update the document title using the browser API
    getGame().then((doc) => {
        console.log(!doc[0].gameOver);
        console.log(doc[0].widgetHTML);
      if (doc[0].players > 1 && !doc[0].gameOver) {
        setWidgetHTML(doc[0].widgetHTML);
      }
    });
  });

  return (
    <div>
      <div>
        <Widget HTML={widgetHTML} />
      </div>
    </div>
  );
}

function Widget({ HTML }) {
  return (
    <iframe
      id="ifrm"
      src={"https://www.skillstack.com/embedchallenges/" + HTML}
      width="100%"
      height="600"
    ></iframe>
  );
}

export default Game;
