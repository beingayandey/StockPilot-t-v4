import React from "react";
import { Link } from "react-router-dom";
import { IoSearchOutline, IoPersonOutline, IoHeartOutline, IoBagHandleOutline } from "react-icons/io5";

const HeaderMain = () => {
    return (
        <div className="header-main">
            <div className="container">

                {/* Logo */}
                <Link to="/" className="header-logo">
                    <img
                        src="./assets/images/logo/logo.svg"
                        alt="Anon's logo"
                        width="120"
                        height="36"
                    />
                </Link>

                {/* Search */}
                <div className="header-search-container">
                    <input
                        type="search"
                        name="search"
                        className="search-field"
                        placeholder="Enter your product name..."
                    />

                    <button className="search-btn">
                        <IoSearchOutline aria-label="search" />
                    </button>
                </div>

                {/* User Actions */}
                <div className="header-user-actions">
                    <button className="action-btn">
                        <IoPersonOutline aria-label="profile" />
                    </button>

                    <button className="action-btn">
                        <IoHeartOutline aria-label="wishlist" />
                        <span className="count">0</span>
                    </button>

                    <button className="action-btn">
                        <IoBagHandleOutline aria-label="cart" />
                        <span className="count">0</span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HeaderMain;
