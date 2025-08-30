import React from "react";
import Showcase from "./Showcase";

const ProductMinimal = ({ title, products }) => {
    return (
        <div className="product-showcase">
            <h2 className="title">{title}</h2>
            <div className="showcase-wrapper has-scrollbar">
                {products.map((group, idx) => (
                    <div className="showcase-container" key={idx}>
                        {group.map((prod, i) => (
                            <Showcase key={i} product={prod} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductMinimal;
