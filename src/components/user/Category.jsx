import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "../../styles/category.css";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Category = () => {
    const categories = [
        {
            img: "./assets/images/icons/dress.svg",
            alt: "dress & frock",
            title: "Dress & frock",
            amount: 53,
            link: "/categories/dress-frock",
        },
        {
            img: "./assets/images/icons/coat.svg",
            alt: "winter wear",
            title: "Winter wear",
            amount: 58,
            link: "/categories/winter-wear",
        },
        {
            img: "./assets/images/icons/glasses.svg",
            alt: "glasses & lens",
            title: "Glasses & lens",
            amount: 68,
            link: "/categories/glasses-lens",
        },
        {
            img: "./assets/images/icons/shorts.svg",
            alt: "shorts & jeans",
            title: "Shorts & jeans",
            amount: 84,
            link: "/categories/shorts-jeans",
        },
        {
            img: "./assets/images/icons/tee.svg",
            alt: "t-shirts",
            title: "T-shirts",
            amount: 35,
            link: "/categories/t-shirts",
        },
        {
            img: "./assets/images/icons/jacket.svg",
            alt: "jacket",
            title: "Jacket",
            amount: 16,
            link: "/categories/jacket",
        },
        {
            img: "./assets/images/icons/watch.svg",
            alt: "watch",
            title: "Watch",
            amount: 27,
            link: "/categories/watch",
        },
        {
            img: "./assets/images/icons/hat.svg",
            alt: "hat & caps",
            title: "Hat & caps",
            amount: 39,
            link: "/categories/hat-caps",
        },
    ];

    return (
        <div className="category">
            <div className="container">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={2}
                    spaceBetween={15}
                    // navigation
                    // autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },

                    }}
                    className="category-item-container has-scrollbar"
                >
                    {categories.map((cat, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="category-item">
                                <div className="category-img-box">
                                    <img src={cat.img} alt={cat.alt} width="30" />
                                </div>

                                <div className="category-content-box">
                                    <div className="category-content-flex">
                                        <h3 className="category-item-title">{cat.title}</h3>
                                        <p className="category-item-amount">({cat.amount})</p>
                                    </div>

                                    <Link to={cat.link} className="category-btn">
                                        Show all
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Category;
