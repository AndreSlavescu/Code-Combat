import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from './firebaseConfig';
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components - Pages
import Landing from "./components/Landing";

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
        </ul>
      </nav>

      <Switch>

        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
