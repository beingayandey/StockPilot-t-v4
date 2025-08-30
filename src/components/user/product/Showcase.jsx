import React from "react";
import { Link } from "react-router-dom";
import { IoStar, IoStarOutline, IoStarHalfOutline } from "react-icons/io5";

const Showcase = ({ product }) => {
    return (
        <div className="showcase">
            <Link to={product.to} className="showcase-img-box">
                <img
                    src={product.img}
                    alt={product.title}
                    width={product.imgWidth || 75}
                    height={product.imgHeight || 75}
                    className="showcase-img"
                />
            </Link>

            <div className="showcase-content">
                <Link to={product.to}>
                    <h4 className="showcase-title">{product.title}</h4>
                </Link>

                {product.category && (
                    <Link to={product.categoryTo} className="showcase-category">
                        {product.category}
                    </Link>
                )}

                {product.rating && (
                    <div className="showcase-rating">
                        {[...Array(product.rating.full || 0)].map((_, i) => (
                            <IoStar key={`star-${i}`} />
                        ))}
                        {product.rating.half && <IoStarHalfOutline />}
                        {[...Array(product.rating.empty || 0)].map((_, i) => (
                            <IoStarOutline key={`star-o-${i}`} />
                        ))}
                    </div>
                )}

                {product.priceBox && (
                    <div className="price-box">
                        {product.priceBox.old && <del>{product.priceBox.old}</del>}
                        <p className="price">{product.priceBox.new}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Showcase;
