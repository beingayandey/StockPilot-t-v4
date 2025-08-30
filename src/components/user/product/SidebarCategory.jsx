import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

const SidebarCategory = ({ category }) => {
    const [open, setOpen] = useState(category.open || false);

    return (
        <li className="sidebar-menu-category">
            <button
                className={`sidebar-accordion-menu ${open ? "active" : ""}`}
                onClick={() => setOpen(!open)}
            >
                <div className="menu-title-flex">
                    <img
                        src={category.icon}
                        alt={category.title}
                        width="20"
                        height="20"
                        className="menu-title-img"
                    />
                    <p className="menu-title">{category.title}</p>
                </div>
                <div>
                    {open ? <IoRemoveOutline className="remove-icon" /> : <IoAddOutline className="add-icon" />}
                </div>
            </button>

            {open && (
                <ul className={`sidebar-submenu-category-list ${open ? "active" : ""}`}>
                    {category.subItems.map((item, idx) => (
                        <li className="sidebar-submenu-category" key={idx}>
                            <Link to={item.to} className="sidebar-submenu-title">
                                <p className="product-name">{item.name}</p>
                                <data value={item.stock} className="stock" title="Available Stock">
                                    {item.stock}
                                </data>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default SidebarCategory;
