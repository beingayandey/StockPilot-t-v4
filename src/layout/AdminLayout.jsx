import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";
import Notifications from "../components/admin/Notifications";

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isNotificationOpen, setIsNotificationOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const toggleNotification = () => setIsNotificationOpen((prev) => !prev);

    return (
        <div className="main-container">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen || isHovered}
                setIsOpen={setIsSidebarOpen}
                setIsHovered={setIsHovered}
            />

            {/* Notifications */}
            <Notifications isOpen={isNotificationOpen} setIsOpen={setIsNotificationOpen} />

            {/* Middle Container */}
            <div
                className={`middle-container relative ${isSidebarOpen ? "ml-[var(--sidebar-width)]" : "ml-[var(--sidebar-width-collapsed)]"
                    } transition-all duration-300 ease-in-out ${isNotificationOpen ? "mr-[var(--notifcation-width)]" : "mr-0"
                    }`}
            >
                {/* Header */}
                <Header
                    toggleSidebar={toggleSidebar}
                    setIsOpen={setIsSidebarOpen}
                    toggleNotification={toggleNotification}
                    isNotificationOpen={isNotificationOpen}
                />

                {/* Main Content */}
                <div className="main-content h-[calc(100vh-var(--header-height))] overflow-y-auto p-5">
                    <Outlet /> {/* 🚀 এখানে routes render হবে */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
