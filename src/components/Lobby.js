import React, { useState, useEffect } from "react";
import firebase from "../firebaseConfig";

import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();
const firestore = firebase.firestore();

function Lobby() {
  const { uid, displayName } = auth.currentUser;

  const playersRef = firestore
    .collection("games")
    .doc("test")
    .collection("players");
  const query = playersRef.orderBy("createdAt", "desc").limit(10);

  const [players] = useCollectionData(query, { idField: "id" });

  const addSelf = () => {
    playersRef.doc(uid).set({
      uid,
      displayName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return addSelf() && <div></div>;
}
export default Lobby;
