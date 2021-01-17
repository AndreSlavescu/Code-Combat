import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebaseConfig";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Game() {
  const [widgetHTML, setWidgetHTML] = useState("");
  const [players, setPlayers] = useState(0);
  let { id } = useParams();

  const updatePlayerCount = async () => {
    const game = firestore.collection("games").doc(id);
    const increment = firebase.firestore.FieldValue.increment(1);
    game.update({
      players: increment,
    });
  };

  const getGame = () => {
    return new Promise((resolve, reject) => {
      firestore.collection("games").onSnapshot((snapshot) => {
        console.log("onSnapshot Called!");
        let updatedData = snapshot.docs.map((doc) => {
          let data = doc.data()[0];
          return doc.data();
        });
        resolve(updatedData);
      }, reject);
    });
  };

  useEffect(() => {
    getGame().then((doc) => {
      setPlayers(doc[0].players);
      setWidgetHTML(doc[0].widgetHTML);
      if (doc[0].players >= 0 && doc[0].players < 2) {
        updatePlayerCount();
      }
    });
  });

  return (
    <div>
      <div>{players > 1 ? <Widget HTML={widgetHTML} /> : <div />}</div>
    </div>
  );
}

function Widget({ HTML }) {

  return (
    <iframe
      id="ifrm"
      src={"https://www.skillstack.com/embedchallenges/?" + HTML}
      width="100%"
      height="600"
    ></iframe>
  );


  return <div>{HTML}</div>;
}

export default Game;
