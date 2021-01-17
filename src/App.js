import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import firebase from "./firebaseConfig";
import "firebase/firestore";
import "firebase/auth";
import Timer from "react-compound-timer";
import { useAuthState } from "react-firebase-hooks/auth";

// Components - Pages
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Game from "./components/Game";

// Components - Utils
import SignIn from "./components/utils/SignIn";
import SignOut from "./components/utils/SignOut";

// Stylesheet
import "./App.css";

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  const registerUser = async () => {
    const { uid, photoURL, email, displayName } = auth.currentUser;
    const usersRef = firestore.collection("users");
    const doc = await usersRef.doc(uid).get();
    if (!doc.exists) {
      console.log("Welcome to our app!");
      usersRef.doc(uid).set({
        uid: uid,
        name: displayName,
        email: email,
        photoURL: photoURL,
        ELO: 1000,
      });
    } else {
      console.log("Welcome back " + displayName + "!");
    }
  };

  return (
    <Router className="App">
      {true ? (
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
                <Link to="/game/test">Competitive</Link>
              </li>
              <li>
                <Link to="/lobby">Unranked</Link>
              </li>
              <li>
                <Link to="/custom">Custom</Link>
              </li>
            </ul>
          </nav>
          <a class="cta" href="/leaderboard">
            Leaderboard
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
          <SignIn />
          </a>
        </header>
      )}
      <Switch>
        <Route path="/lobby">{user ? <Landing /> : <Login />}</Route>
        <Route path="/game/:id">
          {user ? (
            <div>
              <Game />
              <footer>
                <div></div>
              </footer>
            </div>
          ) : (
            <Login />
          )}
        </Route>
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

/*
                  <Timer initialTime={600000} direction="backward">
                    {() => (
                      <React.Fragment>
                        <Timer.Minutes /> minutes and <Timer.Seconds /> seconds
                      </React.Fragment>
                    )}
                  </Timer>

*/
