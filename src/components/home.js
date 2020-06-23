import React from "react";
import { Link } from "react-router-dom";
import LOGO from "./resources/nasa-logo.png";

function Home() {
  return (
    <>
      <div className="home-search">
        <Link className="home-link" to="/search">
          Search
        </Link>
      </div>
      <div className="home">
        <Link className="home-link" to="/nasaphoto">
          Picture of the day!
        </Link>
      </div>
    </>
  );
}

export default Home;
