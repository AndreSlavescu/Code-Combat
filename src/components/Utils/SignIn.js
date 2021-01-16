import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
    apiKey: "AIzaSyDL3o0LcAnj50FZBddw5AQCI0b_UhhIMfA",
    authDomain: "htn2020-coding-game.firebaseapp.com",
    projectId: "htn2020-coding-game",
    storageBucket: "htn2020-coding-game.appspot.com",
    messagingSenderId: "610958625433",
    appId: "1:610958625433:web:5cf7c1be66b44bda868608",
  });

const auth = firebase.auth();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign in using Google
    </button>
  );
}

export default SignIn;
