import React from "react";
import SidebarCategory from "./SidebarCategory";
import Showcase from "./Showcase";

const Sidebar = ({ categories, bestSellers }) => {
    return (
        <div className="sidebar has-scrollbar">
            <div className="sidebar-category">
                <div className="sidebar-top">
                    <h2 className="sidebar-title">Category</h2>
                </div>
                <ul className="sidebar-menu-category-list">
                    {categories?.map((cat, idx) => (
                        <SidebarCategory key={idx} category={cat} />
                    ))}
                </ul>
            </div>

            <div className="product-showcase">
                <h3 className="showcase-heading">Best Sellers</h3>
                <div className="showcase-wrapper">
                    <div className="showcase-container">
                        {bestSellers?.map((prod, idx) => (
                            <Showcase key={idx} product={prod} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
