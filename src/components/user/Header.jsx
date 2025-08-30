import React from "react";
import HeaderTop from "./header/HeaderTop";
import HeaderMain from "./header/HeaderMain";
import DesktopNavigationMenu from "./header/DesktopNavigationMenu";


import "../../styles/header.css";

const Header = () => {


    return (
        <header>
            <HeaderTop />
            <HeaderMain />
            <DesktopNavigationMenu />

        </header>
    );
};

export default Header;
