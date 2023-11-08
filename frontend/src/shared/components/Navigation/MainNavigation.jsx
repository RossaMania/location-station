import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        <Link to="/">Location Station!</Link>
      </h1>
      <nav>{/* Nav Link component later??? */}</nav>
    </MainHeader>
  );
}

export default MainNavigation