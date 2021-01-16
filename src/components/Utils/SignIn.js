import React from "react";
import firebase from "../../firebaseConfig";
import "firebase/firestore";
import "firebase/auth";

const auth = firebase.auth();

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button
      className="sign-in"
      onClick={() => {
        signInWithGoogle()

      }}
    >
      Sign in using Google
    </button>
  );
}

export default SignIn;
