import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from "./firebaseConfig";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components - Pages
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";

// Components - Utils
import SignIn from "./components/utils/SignIn";
import SignOut from "./components/utils/SignOut";

// Stylesheet
import "./App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router className="App">
      <div>
        {user ? (
          <nav>
            <img src="https://i.imgur.com/ADMwlOq.png" id="mlogo"></img>
            <Link to="/">Home</Link>
            <Link to="/competitive">Competitive</Link>
            <Link to="/unranked">Unranked</Link>
            <Link to="/custom">Custom</Link>
            <SignOut />
          </nav>
        ) : (
          <nav>
            <img src="https://i.imgur.com/ADMwlOq.png" id="mlogo"></img>
            <Link to="/">Home</Link>

            <button class="sign-in">
              <Link to="/custom">Sign In</Link>
            </button>
          </nav>
        )}
      </div>
          <SignIn/>
      <Switch>
        <Route path="/competitive">{user ? <Landing /> : <Login />}</Route>
        <Route path="/unranked">{user ? <Landing /> : <Login />}</Route>
        <Route path="/custom">{user ? <Landing /> : <Login />}</Route>
        <Route path="/profile">{user ? <Landing /> : <Login />}</Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
