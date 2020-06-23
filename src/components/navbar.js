import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <Link className="link" to="/" exact="true">
          Take Me Home
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
