import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/admin/Dashboard'
import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/header'
import Notifications from '../components/admin/Notifications'
import Products from '../pages/admin/Products'
import AddProduct from '../pages/admin/AddProduct'
import Categories from '../pages/admin/Categories'

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

                <div className={`middle-container  relative ${isSidebarOpen ? "ml-[var(--sidebar-width)]" : "ml-[var(--sidebar-width-collapsed)]"} ms-[var(--sidebar-width)] transition-all duration-300 ease-in-out ${isNotificationOpen ? "mr-[var(--notifcation-width)]" : "mr-0"} `}>

                    <Header toggleSidebar={toggleSidebar} setIsOpen={setIsSidebarOpen} toggleNotification={toggleNotification} isNotificationOpen={isNotificationOpen} />

                    <div className="main-content  h-[calc(100vh-var(--header-height))] overflow-y-auto p-5">

                        <Routes>
                            <Route index element={<Dashboard />} />

                            <Route path="/admin" element={<Dashboard />} />
                            <Route path="/admin/products" element={<Products />} />
                            <Route path="/admin/products/new" element={<AddProduct />} />
                            <Route path="/admin/categories" element={<Categories />} />



                            <Route path="/about" element={<h1>About</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout