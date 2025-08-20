import React, { useState } from "react";
import { SidebarIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import Breadcrumbs from "./header/Breadcrumbs";
import SearchBar from "./header/SearchBar";
import SearchModal from "./header/SearchModal";
import NotificationsButton from "./header/NotificationsButton";
import ThemeToggle from "./header/ThemeToggle";

const Header = ({ toggleSidebar, toggleNotification }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="main-header z-50 bg-[var(--color-primary-white)] shadow-[var(--sidebar-boxshadow)]">
            <div className="inner-header p-4">
                <div className="flex justify-between items-center">
                    {/* Left */}
                    <div className="left-menu flex items-center">
                        <div
                            className="sidebar-collapsed cursor-pointer me-4"
                            onClick={toggleSidebar}
                        >
                            <SidebarIcon size={20} className="text-[var(--color-primary-black)]" />
                        </div>
                        <Breadcrumbs />
                    </div>

                    {/* Middle */}
                    <div className="middle-menu w-[33%]">
                        <SearchBar onOpen={() => setIsOpen(true)} />
                    </div>

                    {/* Right */}
                    <div className="right-menu flex gap-2 items-center">
                        <NotificationsButton onClick={toggleNotification} />
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Search Modal */}
            <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </header>
    );
};

export default Header;
