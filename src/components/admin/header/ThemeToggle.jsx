import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedMode = localStorage.getItem("darkMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    const handleToggle = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", JSON.stringify(newMode));
    };

    return (
        <span onClick={handleToggle} className="cursor-pointer text-primary-black">
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </span>
    );
};

export default ThemeToggle;
