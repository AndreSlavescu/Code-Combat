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

function SignOut() {
    return auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
    )
  }

export default SignIn;
