import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Landing from "./components/Landing";

function App() {
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
