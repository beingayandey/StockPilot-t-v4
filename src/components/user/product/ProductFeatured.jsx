import React from "react";
import { Link } from "react-router-dom";
import { IoStar, IoStarOutline } from "react-icons/io5";

const ProductFeatured = ({ products }) => {
    return (
        <div className="product-featured">
            <h2 className="title">Deal of the day</h2>
            <div className="showcase-wrapper has-scrollbar">
                {products?.map((prod, idx) => (
                    <div className="showcase-container" key={idx}>
                        <div className="showcase">
                            <div className="showcase-banner">
                                <img src={prod.img} alt={prod.title} className="showcase-img" />
                            </div>
                            <div className="showcase-content">
                                <div className="showcase-rating">
                                    {[...Array(prod.rating)].map((_, i) => (
                                        <IoStar key={i} />
                                    ))}
                                    {[...Array(5 - prod.rating)].map((_, i) => (
                                        <IoStarOutline key={`o-${i}`} />
                                    ))}
                                </div>
                                <Link to={prod.to}>
                                    <h3 className="showcase-title">{prod.title}</h3>
                                </Link>
                                <p className="showcase-desc">{prod.desc}</p>
                                <div className="price-box">
                                    <p className="price">{prod.price}</p>
                                    <del>{prod.oldPrice}</del>
                                </div>
                                <button className="add-cart-btn">Add to cart</button>
                                {/* status + countdown can also be mapped if data provided */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFeatured;
