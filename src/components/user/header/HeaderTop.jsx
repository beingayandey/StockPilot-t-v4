import React from "react";
import { Link } from "react-router-dom";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io";

const HeaderTop = () => {
    const socialLinks = [
        { to: "/facebook", icon: <IoLogoFacebook />, label: "Facebook" },
        { to: "/twitter", icon: <IoLogoTwitter />, label: "Twitter" },
        { to: "/instagram", icon: <IoLogoInstagram />, label: "Instagram" },
        { to: "/linkedin", icon: <IoLogoLinkedin />, label: "LinkedIn" },
    ];

    const currencies = [
        { value: "usd", label: "USD $" },
        { value: "eur", label: "EUR €" },
    ];

    const languages = [
        { value: "en-US", label: "English" },
        { value: "es-ES", label: "Español" },
        { value: "fr", label: "Français" },
    ];

    return (
        <div className="header-top">
            <div className="container">

                {/* Social Links */}
                <ul className="header-social-container">
                    {socialLinks.map((item, idx) => (
                        <li key={idx}>
                            <Link to={item.to} className="social-link" aria-label={item.label}>
                                {item.icon}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Alert Message */}
                <div className="header-alert-news">
                    <p>
                        <b>Free Shipping</b> This Week Order Over - $55
                    </p>
                </div>

                {/* Actions */}
                <div className="header-top-actions">
                    <select name="currency" defaultValue="usd">
                        {currencies.map((cur) => (
                            <option key={cur.value} value={cur.value}>
                                {cur.label}
                            </option>
                        ))}
                    </select>

                    <select name="language" defaultValue="en-US">
                        {languages.map((lang) => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    );
};

export default HeaderTop;
