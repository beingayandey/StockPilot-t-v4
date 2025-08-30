import React from "react";
import { Link } from "react-router-dom";

const DesktopNavigationMenu = () => {
    // Dropdown panel data for Categories
    const categoryPanels = [
        {
            title: "Electronics",
            items: ["Desktop", "Laptop", "Camera", "Tablet", "Headphone"],
            banner: {
                src: "./assets/images/electronics-banner-1.jpg",
                alt: "headphone collection",
            },
        },
        {
            title: "Men's",
            items: ["Formal", "Casual", "Sports", "Jacket", "Sunglasses"],
            banner: {
                src: "./assets/images/mens-banner.jpg",
                alt: "men's fashion",
            },
        },
        {
            title: "Women's",
            items: ["Formal", "Casual", "Perfume", "Cosmetics", "Bags"],
            banner: {
                src: "./assets/images/womens-banner.jpg",
                alt: "women's fashion",
            },
        },
        {
            title: "Electronics",
            items: ["Smart Watch", "Smart TV", "Keyboard", "Mouse", "Microphone"],
            banner: {
                src: "./assets/images/electronics-banner-2.jpg",
                alt: "mouse collection",
            },
        },
    ];

    // Simple dropdown categories (Men's, Women's, Jewelry, Perfume)
    const dropdownMenus = [
        {
            title: "Men's",
            items: ["Shirt", "Shorts & Jeans", "Safety Shoes", "Wallet"],
        },
        {
            title: "Women's",
            items: ["Dress & Frock", "Earrings", "Necklace", "Makeup Kit"],
        },
        {
            title: "Jewelry",
            items: ["Earrings", "Couple Rings", "Necklace", "Bracelets"],
        },
        {
            title: "Perfume",
            items: ["Clothes Perfume", "Deodorant", "Flower Fragrance", "Air Freshener"],
        },
    ];

    return (
        <nav className="desktop-navigation-menu">
            <div className="container">
                <ul className="desktop-menu-category-list">

                    {/* Home */}
                    <li className="menu-category">
                        <Link to="/" className="menu-title">Home</Link>
                    </li>

                    {/* Categories with Panel */}
                    <li className="menu-category">
                        <Link to="/categories" className="menu-title">Categories</Link>

                        <div className="dropdown-panel">
                            {categoryPanels.map((panel, idx) => (
                                <ul className="dropdown-panel-list" key={idx}>
                                    <li className="menu-title">
                                        <Link to={`/categories/${panel.title.toLowerCase()}`}>
                                            {panel.title}
                                        </Link>
                                    </li>
                                    {panel.items.map((item, i) => (
                                        <li className="panel-list-item" key={i}>
                                            <Link to={`/categories/${panel.title.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                                                {item}
                                            </Link>
                                        </li>
                                    ))}
                                    <li className="panel-list-item">
                                        <Link to={`/categories/${panel.title.toLowerCase()}/banner`}>
                                            <img
                                                src={panel.banner.src}
                                                alt={panel.banner.alt}
                                                width="250"
                                                height="119"
                                            />
                                        </Link>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </li>

                    {/* Dropdown Menus (Men's, Women's, Jewelry, Perfume) */}
                    {dropdownMenus.map((menu, idx) => (
                        <li className="menu-category" key={idx}>
                            <Link to={`/${menu.title.toLowerCase()}`} className="menu-title">
                                {menu.title}
                            </Link>
                            <ul className="dropdown-list">
                                {menu.items.map((item, i) => (
                                    <li className="dropdown-item" key={i}>
                                        <Link to={`/${menu.title.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}

                    {/* Static links */}
                    <li className="menu-category">
                        <Link to="/blog" className="menu-title">Blog</Link>
                    </li>

                    <li className="menu-category">
                        <Link to="/offers" className="menu-title">Hot Offers</Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default DesktopNavigationMenu;
