import React from "react";
import { Link } from "react-router-dom";

export default function navbarItems() {
  return (
    <div>
      <Link to="/dapp" className="nav-link">
        DApp
      </Link>
      <Link to="/" className="nav-link lg:hidden">
        Home
      </Link>
    </div>
  );
}
