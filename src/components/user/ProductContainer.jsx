import React from "react";
import Sidebar from "./Product/Sidebar";
import ProductMinimal from "./Product/ProductMinimal";
import ProductFeatured from "./Product/ProductFeatured";
import ProductGrid from "./Product/ProductGrid";

import "../../styles/product-container.css";

// ✅ mock data lives here (later replace with API fetch)
const sidebarData = [
    {
        title: "Clothes",
        icon: "./assets/images/icons/dress.svg",
        subItems: [
            { name: "Shirt", stock: 300, to: "/path/to/shirt" },
            { name: "Shorts & Jeans", stock: 60, to: "/path/to/shorts-jeans" },
            { name: "Jacket", stock: 50, to: "/path/to/jacket" },
            { name: "Dress & Frock", stock: 87, to: "/path/to/dress-frock" },
        ],
    },
    {
        title: "Footwear",
        icon: "./assets/images/icons/shoes.svg",
        subItems: [
            { name: "Sports", stock: 45, to: "/path/to/sports" },
            { name: "Formal", stock: 75, to: "/path/to/formal" },
            { name: "Casual", stock: 35, to: "/path/to/casual" },
            { name: "Safety Shoes", stock: 26, to: "/path/to/safety-shoes" },
        ],
    },
    // … other sidebar categories
];

const bestSellers = [
    {
        img: "./assets/images/products/1.jpg",
        title: "Baby Fabric Shoes",
        to: "/path/to/baby-fabric-shoes",
        rating: { full: 5 },
        priceBox: { old: "$5.00", new: "$4.00" },
    },
    {
        img: "./assets/images/products/2.jpg",
        title: "Men's Hoodies T-Shirt",
        to: "/path/to/mens-hoodies",
        rating: { full: 4, half: true },
        priceBox: { old: "$17.00", new: "$7.00" },
    },
];

const minimalSections = [
    {
        title: "New Arrivals",
        products: [
            [
                {
                    img: "./assets/images/products/clothes-1.jpg",
                    title: "Relaxed Short full Sleeve T-Shirt",
                    to: "/path/to/relaxed-tee",
                    category: "Clothes",
                    categoryTo: "/path/to/clothes",
                    priceBox: { old: "$12.00", new: "$45.00" },
                },
                {
                    img: "./assets/images/products/clothes-2.jpg",
                    title: "Girls Pink Embro Design Top",
                    to: "/path/to/girls-top",
                    category: "Clothes",
                    categoryTo: "/path/to/clothes",
                    priceBox: { old: "$9.00", new: "$61.00" },
                },
            ],
        ],
    },
    { title: "Trending", products: [] },
    { title: "Top Rated", products: [] },
];

const featuredProducts = [
    {
        img: "./assets/images/products/shampoo.jpg",
        title: "Shampoo, Conditioner & Facewash Packs",
        to: "/path/to/shampoo-packs",
        desc: "Lorem ipsum dolor sit amet consectetur...",
        rating: 3,
        price: "$150.00",
        oldPrice: "$200.00",
    },
    {
        img: "./assets/images/products/jewellery-1.jpg",
        title: "Rose Gold Diamonds Earring",
        to: "/path/to/earring",
        desc: "Lorem ipsum dolor sit amet consectetur...",
        rating: 3,
        price: "$1990.00",
        oldPrice: "$2000.00",
    },
];

const gridProducts = [
    {
        img: "./assets/images/products/jacket-3.jpg",
        imgHover: "./assets/images/products/jacket-4.jpg",
        title: "Mens Winter Leathers Jackets",
        to: "/path/to/mens-jacket",
        category: "Jacket",
        categoryTo: "/path/to/jackets",
        rating: 3,
        price: "$48.00",
        oldPrice: "$75.00",
        badge: "15%",
        badgeClass: "",
    },
    {
        img: "./assets/images/products/shirt-1.jpg",
        imgHover: "./assets/images/products/shirt-2.jpg",
        title: "Pure Garment Dyed Cotton Shirt",
        to: "/path/to/cotton-shirt",
        category: "Shirt",
        categoryTo: "/path/to/shirts",
        rating: 3,
        price: "$45.00",
        oldPrice: "$56.00",
        badge: "sale",
        badgeClass: "angle black",
    },
];

const ProductContainer = () => {
    return (
        <div className="product-container">
            <div className="container">
                <Sidebar categories={sidebarData} bestSellers={bestSellers} />

                <div className="product-box">
                    {minimalSections?.map((section, idx) => (
                        <ProductMinimal key={idx} title={section.title} products={section.products} />
                    ))}

                    <ProductFeatured products={featuredProducts} />
                    <ProductGrid products={gridProducts} />
                </div>
            </div>
        </div>
    );
};

export default ProductContainer;
