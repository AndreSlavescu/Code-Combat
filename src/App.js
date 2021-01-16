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
      {user ? (
        <header>
          <a class="logo" href="/">
            <img
              src="https://i.imgur.com/ADMwlOq.png"
              alt="logo"
              class="logo-img"
            />
          </a>
          <nav>
            <ul class="nav__links">
              <li>
              <Link to="/competitive">Competitive</Link>
              </li>
              <li>
              <Link to="/unranked">Unranked</Link>
              </li>
              <li>
              <Link to="/custom">Custom</Link>
              </li>
            </ul>
          </nav>
          <a class="cta" href="/">
          <SignOut />
          </a>
        </header>
      ) : (
        <header>
          <a class="logo" href="/">
            <img
              src="https://i.imgur.com/ADMwlOq.png"
              alt="logo"
              class="logo-img"
            />
          </a>
          <nav>
            <ul class="nav__links">
              <li>
                <a href="/">About</a>
              </li>
            </ul>
          </nav>
          <a class="cta" href="/">
            Sign In
          </a>
          <p class="menu cta">Sign Up</p>
        </header>
      )}

      {user ? <div /> : <SignIn />}

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
