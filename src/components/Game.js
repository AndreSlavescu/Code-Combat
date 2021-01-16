import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebaseConfig";

const auth = firebase.auth();
const firestore = firebase.firestore();


function Game() {
  const [widgetHTML, setWidgetHTML] = useState("");
  let { id } = useParams();

  const getGame = async () => {
    const gamesRef = firestore.collection("games").doc(id);
    const doc = await gamesRef.get();
    if (!doc.exists) {
      return (
        <div>
          <div></div>
        </div>
      );
    } else {
      if (doc.data().players>1) setWidgetHTML(doc.data().widgetHTML)
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    getGame();
  });
  return (
    <div>
      <div><Widget HTML={widgetHTML}/></div>
    </div>
  );
}

function Widget({HTML}){
    return(    <iframe
        id="ifrm"
        src={"https://www.skillstack.com/embedchallenges/?"+HTML}
        width="100%"
        height="600"
      ></iframe>)
}

export default Game;
