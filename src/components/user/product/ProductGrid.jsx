import React from "react";
import { Link } from "react-router-dom";
import { IoHeartOutline, IoEyeOutline, IoRepeatOutline, IoBagAddOutline, IoStar, IoStarOutline } from "react-icons/io5";

const ProductGrid = ({ products }) => {
    return (
        <div className="product-main">
            <h2 className="title">New Products</h2>
            <div className="product-grid">
                {products?.map((prod, idx) => (
                    <div className="showcase" key={idx}>
                        <div className="showcase-banner">
                            <img src={prod.img} alt={prod.title} className="product-img default" width="300" />
                            {prod.imgHover && <img src={prod.imgHover} alt={prod.title} className="product-img hover" width="300" />}
                            {prod.badge && <p className={`showcase-badge ${prod.badgeClass}`}>{prod.badge}</p>}

                            <div className="showcase-actions">
                                <button className="btn-action"><IoHeartOutline /></button>
                                <button className="btn-action"><IoEyeOutline /></button>
                                <button className="btn-action"><IoRepeatOutline /></button>
                                <button className="btn-action"><IoBagAddOutline /></button>
                            </div>
                        </div>
                        <div className="showcase-content">
                            <Link to={prod.categoryTo} className="showcase-category">{prod.category}</Link>
                            <h3><Link to={prod.to} className="showcase-title">{prod.title}</Link></h3>
                            <div className="showcase-rating">
                                {[...Array(prod.rating || 0)].map((_, i) => <IoStar key={i} />)}
                                {[...Array(5 - (prod.rating || 0))].map((_, i) => <IoStarOutline key={`o-${i}`} />)}
                            </div>
                            <div className="price-box">
                                <p className="price">{prod.price}</p>
                                {prod.oldPrice && <del>{prod.oldPrice}</del>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
