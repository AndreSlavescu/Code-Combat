import React, { useState, useEffect } from "react";
import firebase from "../firebaseConfig";

import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Lobby() {
  const [gameURL, setGameURL] = useState("");

  useEffect(() => {
    const gamesRef = firestore.collection("games")
    gamesRef.limit(10).get().then(querySnapshot => {
        if (!querySnapshot.empty) {
            //We know there is one doc in the querySnapshot
            const queryDocumentSnapshot = querySnapshot.docs[0].data();
            console.log(querySnapshot.docs[0].data())
            //return queryDocumentSnapshot.ref.delete();
        } else {
            console.log("No document corresponding to the query!");
            return null;
        }
    });
  });

  return (
    <div>
      <div>Lobby</div>
    </div>
  );
}

export default Lobby;
