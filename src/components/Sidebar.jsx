import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData } from "../data/menuData";
import SidebarItem from "./sidebar/SidebarItem";
import UserMenu from "./sidebar/UserMenu";
import logo from "../assets/images/icon.png";

const Sidebar = ({ isOpen, isHovered, setIsHovered }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const expanded = isOpen || isHovered;

    const toggleMenu = (index) => {
        setOpenDropdown(prev => (prev === index ? null : index));
    };

    useEffect(() => {
        if (!expanded) setOpenDropdown(null);
    }, [expanded]);

    return (
        <div
            className={`sidebar fixed left-0 top-0 bottom-0 z-50 
        ${expanded ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-collapsed)]"} 
        bg-[var(--color-primary-white)] overflow-y-auto 
        text-[length:var(--font-small)] shadow-[var(--sidebar-boxshadow)]
        transition-all duration-300 ease-in-out`}

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="logo flex items-center gap-2 p-4 font-bold text-xl">

                <img src={logo} alt="logo" className="w-10 h-10" />

                {expanded && <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-primary-black"
                >StockPilot</motion.span>}


            </div>

            <nav className="text-[var(--color-primary-black)]">
                <ul className="space-y-2 p-1">
                    {menuData.map((menu, index) => (
                        <SidebarItem
                            key={index}
                            menu={menu}
                            index={index}
                            expanded={expanded}
                            isOpen={openDropdown}
                            toggleMenu={toggleMenu}
                        />
                    ))}
                </ul>
            </nav>

            <UserMenu expanded={expanded} />
        </div>
    );
};

export default Sidebar;
