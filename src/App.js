import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import firebase from './firebaseConfig';
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";



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
            <Link to="/login">About</Link>
          </li>
          <li>
            <Link to="/signup">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
