import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    IoCloseOutline,
    IoAddOutline,
    IoRemoveOutline,
    IoCaretBackOutline,
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoInstagram,
    IoLogoLinkedin,
} from "react-icons/io5";

const MobileNavigationMenu = ({ isOpen, onClose }) => {
    const [openAccordion, setOpenAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // Main navigation categories
    const menuCategories = [
        {
            title: "Men's",
            subItems: ["Shirt", "Shorts & Jeans", "Safety Shoes", "Wallet"],
        },
        {
            title: "Women's",
            subItems: ["Dress & Frock", "Earrings", "Necklace", "Makeup Kit"],
        },
        {
            title: "Jewelry",
            subItems: ["Earrings", "Couple Rings", "Necklace", "Bracelets"],
        },
        {
            title: "Perfume",
            subItems: ["Clothes Perfume", "Deodorant", "Flower Fragrance", "Air Freshener"],
        },
    ];

    // Bottom settings
    const bottomMenus = [
        {
            title: "Language",
            subItems: ["English", "Español", "French"],
        },
        {
            title: "Currency",
            subItems: ["USD $", "EUR €"],
        },
    ];

    // Social links
    const socialLinks = [
        { to: "/facebook", icon: <IoLogoFacebook />, label: "Facebook" },
        { to: "/twitter", icon: <IoLogoTwitter />, label: "Twitter" },
        { to: "/instagram", icon: <IoLogoInstagram />, label: "Instagram" },
        { to: "/linkedin", icon: <IoLogoLinkedin />, label: "LinkedIn" },
    ];

    if (!isOpen) return null; // hide when closed

    return (
        <nav
            className={`mobile-navigation-menu has-scrollbar ${isOpen ? "active" : ""}`}
            data-mobile-menu=""
        >
            {/* Top */}
            <div className="menu-top">
                <h2 className="menu-title">Menu</h2>
                <button
                    className="menu-close-btn"
                    data-mobile-menu-close-btn=""
                    onClick={onClose}
                >
                    <IoCloseOutline />
                </button>
            </div>

            {/* Categories */}
            <ul className="mobile-menu-category-list">
                <li className="menu-category">
                    <Link to="/" className="menu-title">
                        Home
                    </Link>
                </li>

                {menuCategories.map((menu, idx) => (
                    <li className="menu-category" key={idx}>
                        <button
                            className={`accordion-menu ${openAccordion === idx ? "active" : ""}`}
                            data-accordion-btn=""
                            onClick={() => toggleAccordion(idx)}
                        >
                            <p className="menu-title">{menu.title}</p>
                            <div>
                                {openAccordion === idx ? (
                                    <IoRemoveOutline className="remove-icon" />
                                ) : (
                                    <IoAddOutline className="add-icon" />
                                )}
                            </div>
                        </button>

                        {openAccordion === idx && (
                            <ul
                                className={`submenu-category-list ${openAccordion === idx ? "active" : ""
                                    }`}
                                data-accordion=""
                            >
                                {menu.subItems.map((item, i) => (
                                    <li className="submenu-category" key={i}>
                                        <Link
                                            to={`/${menu.title
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}/${item
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`}
                                            className="submenu-title"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}

                <li className="menu-category">
                    <Link to="/blog" className="menu-title">
                        Blog
                    </Link>
                </li>
                <li className="menu-category">
                    <Link to="/offers" className="menu-title">
                        Hot Offers
                    </Link>
                </li>
            </ul>

            {/* Bottom */}
            <div className="menu-bottom">
                <ul className="menu-category-list">
                    {bottomMenus.map((menu, idx) => (
                        <li className="menu-category" key={idx}>
                            <button
                                className={`accordion-menu ${openAccordion === `bottom-${idx}` ? "active" : ""
                                    }`}
                                data-accordion-btn=""
                                onClick={() => toggleAccordion(`bottom-${idx}`)}
                            >
                                <p className="menu-title">{menu.title}</p>
                                <IoCaretBackOutline className="caret-back" />
                            </button>

                            {openAccordion === `bottom-${idx}` && (
                                <ul
                                    className={`submenu-category-list ${openAccordion === `bottom-${idx}` ? "active" : ""
                                        }`}
                                    data-accordion=""
                                >
                                    {menu.subItems.map((item, i) => (
                                        <li className="submenu-category" key={i}>
                                            <Link
                                                to={`/${menu.title
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}/${item
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "-")}`}
                                                className="submenu-title"
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Social Links */}
                <ul className="menu-social-container">
                    {socialLinks.map((social, idx) => (
                        <li key={idx}>
                            <Link to={social.to} className="social-link" aria-label={social.label}>
                                {social.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default MobileNavigationMenu;
