import React from "react";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader className="main-navigation__menu-btn">
      <button>
        <span />
        <span />
        <span />
      </button>
      <h1 className="main-navigation__title">
        Location Station!
      </h1>
      <nav>
        {/* Nav Link component later??? */}
      </nav>
    </MainHeader>
  )
}

export default MainNavigation