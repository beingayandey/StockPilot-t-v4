import React from "react";
import {
    IoMenuOutline,
    IoBagHandleOutline,
    IoHomeOutline,
    IoHeartOutline,
    IoGridOutline,
} from "react-icons/io5";

const MobileBottomNavigation = ({ onMenuClick }) => {
    const navButtons = [
        { icon: <IoMenuOutline />, label: "menu", hasCount: false, isMenu: true },
        { icon: <IoBagHandleOutline />, label: "cart", hasCount: true, count: 0 },
        { icon: <IoHomeOutline />, label: "home", hasCount: false },
        { icon: <IoHeartOutline />, label: "wishlist", hasCount: true, count: 0 },
        { icon: <IoGridOutline />, label: "grid", hasCount: false, isMenu: true },
    ];

    return (
        <div className="mobile-bottom-navigation">
            {navButtons.map((btn, idx) => (
                <button
                    key={idx}
                    className={`action-btn ${btn.isMenu ? "cursor-pointer" : ""}`}
                    aria-label={btn.label}
                    onClick={btn.isMenu ? onMenuClick : undefined} // only trigger for menu buttons
                >
                    {btn.icon}
                    {btn.hasCount && <span className="count">{btn.count}</span>}
                </button>
            ))}
        </div>
    );
};

export default MobileBottomNavigation;
