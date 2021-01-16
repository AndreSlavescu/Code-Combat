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

// Components - Utils
import SignIn from "./components/utils/SignIn";
import SignOut from "./components/utils/SignOut";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router className="App">
      <nav>
        {user ? (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/competitive">Competitive</Link>
            </li>
            <li>
              <Link to="/unranked">Unranked</Link>
            </li>
            <li>
              <Link to="/custom">Custom</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <SignOut />
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <SignIn />
            </li>
          </ul>
        )}
      </nav>

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
