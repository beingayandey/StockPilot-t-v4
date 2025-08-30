import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import banner1 from "../../assets/images/banner-1.jpg";
import "../../styles/banner.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    const slides = [
        {
            img: banner1,
            alt: "women's latest fashion sale",
            subtitle: "Trending item",
            title: "Women's latest fashion sale",
            text: "starting at $",
            price: "20.00",
            link: "/shop",
        },
        {
            img: banner1,
            alt: "modern sunglasses",
            subtitle: "Trending accessories",
            title: "Modern sunglasses",
            text: "starting at $",
            price: "15.00",
            link: "/shop",
        },
        {
            img: banner1,
            alt: "new fashion summer sale",
            subtitle: "Sale Offer",
            title: "New fashion summer sale",
            text: "starting at $",
            price: "29.99",
            link: "/shop",
        },
    ];

    return (
        <div className="banner">
            <div className="container">

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    // autoplay={{ delay: 3000, disableOnInteraction: false }}
                    // pagination={{ clickable: true }}
                    // navigation={true}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    className="slider-container has-scrollbar"
                >
                    {slides.map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="slider-item">
                                <img src={slide.img} alt={slide.alt} className="banner-img" />

                                <div className="banner-content">
                                    <p className="banner-subtitle">{slide.subtitle}</p>
                                    <h2 className="banner-title">{slide.title}</h2>
                                    <p className="banner-text">
                                        {slide.text} <b>{slide.price}</b>
                                    </p>
                                    <a href={slide.link} className="banner-btn">
                                        Shop now
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;
