import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as PhosphorIcons from "@phosphor-icons/react";

const UserMenu = ({ expanded }) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        if (!expanded) {
            setIsUserMenuOpen(false); // collapse হলে user menu টাও বন্ধ হবে
        }
    }, [expanded]);

    return (
        <div className="user absolute bottom-0 left-0 p-2 w-full z-50 bg-[var(--color-primary-white)] ">
            {/* User Header */}
            <div
                className="flex justify-start items-center w-full gap-2 cursor-pointer "
                onClick={() => expanded && setIsUserMenuOpen(v => !v)} // only toggle if expanded
            >
                <PhosphorIcons.User size={20} weight="duotone" className="text-primary-black" />
                {expanded && <span className="text-primary-black">User</span>}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isUserMenuOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.1 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[200px] 
                       bg-[var(--color-primary-white)] text-[var(--color-primary-black)] 
                       rounded shadow-lg overflow-hidden"
                    >
                        <li className="px-4 py-2 hover:bg-[var(--color-primary-black)] hover:text-[var(--color-primary-white)]">
                            Profile
                        </li>
                        <li className="px-4 py-2 hover:bg-[var(--color-primary-black)] hover:text-[var(--color-primary-white)]">
                            Settings
                        </li>
                        <li className="px-4 py-2 hover:bg-[var(--color-primary-black)] hover:text-[var(--color-primary-white)]">
                            Logout
                        </li>
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserMenu;
