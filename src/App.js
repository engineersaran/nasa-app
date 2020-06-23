import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HOME from "./components/home";
import NASAPHOTO from "./components/nasaphoto";
import "./App.css";
import { Link } from "react-router-dom";
import LOGO from "./components/resources/nasa-logo.png";
import SEARCH from "./components/search";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="header">
          <p>
            <Link className="link" to="/" exact="true">
              <img className="logo" src={LOGO} alt="nasa" />
            </Link>
          </p>
          <p>NASA Image App</p>
        </div>
        <div className="app">
          <Route component={HOME} path="/" exact />
          <Route component={NASAPHOTO} path="/nasaphoto" />
          <Route component={SEARCH} path="/search" />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
