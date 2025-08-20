import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/Dashboard'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Notifications from '../components/Notifications'

const Layout = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // click state
    const [isNotificationOpen, setIsNotificationOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    // hover state
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    const toggleNotification = () => {
        setIsNotificationOpen((prev) => !prev);
    };
    return (
        <>
            <div className="main-container">

                <Sidebar
                    isOpen={isSidebarOpen || isHovered}
                    setIsOpen={setIsSidebarOpen}
                    setIsHovered={setIsHovered}
                />
                <Notifications isOpen={isNotificationOpen} setIsOpen={setIsNotificationOpen} />

                <div className={`middle-container ${isSidebarOpen ? "ml-[var(--sidebar-width)]" : "ml-[var(--sidebar-width-collapsed)]"} ms-[var(--sidebar-width)] transition-all duration-300 ease-in-out ${isNotificationOpen ? "mr-[var(--notifcation-width)]" : "mr-0"} `}>

                    <Header toggleSidebar={toggleSidebar} setIsOpen={setIsSidebarOpen} toggleNotification={toggleNotification} isNotificationOpen={isNotificationOpen} />

                    <div className="main-content p-2">

                        <Routes>
                            <Route index element={<Dashboard />} />

                            <Route path="/admin" element={<Dashboard />} />


                            <Route path="/about" element={<h1>About</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout