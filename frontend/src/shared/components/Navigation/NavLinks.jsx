import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  // useContext hook allows us to use the context in NavLinks without having to wrap the component in the context provider.
  // auth is an object with isLoggedIn, login, and logout properties.
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>}
      {!auth.isLoggedIn && <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>}
      <li>
        <button onClick={auth.logout}>LOG OUT</button>
      </li>
    </ul>
  );
}

export default NavLinks