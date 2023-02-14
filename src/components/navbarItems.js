import React from "react";
import { NavLink } from "react-router-dom";

export default function navbarItems() {
  let activeClassName = "nav-link underline";

  return (
    <div>
      <NavLink
        to="/dapp"
        className={({ isActive }) => (isActive ? activeClassName : "nav-link")}
      >
        DApp
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `lg:hidden ${activeClassName}` : "lg:hidden nav-link"
        }
      >
        Home
      </NavLink>
    </div>
  );
}
