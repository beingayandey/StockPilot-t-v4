import React, { useState } from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from '../pages/admin/Dashboard'
import Sidebar from '../components/admin/Sidebar'
import Header from '../components/admin/header'
import Notifications from '../components/admin/Notifications'
import Products from '../pages/admin/Products'
import AddProduct from '../pages/admin/AddProduct'
import Categories from '../pages/admin/Categories'
import StockAdjust from '../pages/admin/StockAdjust'
import BulkIE from '../pages/admin/BulkIE'
import ProductLogs from '../pages/admin/ProductLogs'
import AllOrders from '../pages/admin/AllOrders'
import Pending from '../pages/admin/Pending'
import CompleteOrder from '../pages/admin/CompleteOrder'
import Refunds from '../pages/admin/Refunds'
import Payments from '../pages/admin/Payments'
import AllUsers from '../pages/admin/AllUsers'
import Roles from '../pages/admin/Roles'

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
                            <Route path="/admin/inventory/stock-adjust" element={<StockAdjust />} />
                            <Route path="/admin/inventory/bulk" element={<BulkIE />} />
                            <Route path="/admin/inventory/logs" element={<ProductLogs />} />
                            <Route path="/admin/orders" element={<AllOrders />} />
                            <Route path="/admin/orders/pending" element={<Pending />} />
                            <Route path="/admin/orders/completed" element={<CompleteOrder />} />
                            <Route path="/admin/orders/refunds" element={<Refunds />} />
                            <Route path="/admin/orders/payments" element={<Payments />} />
                            <Route path="/admin/users" element={<AllUsers />} />
                            <Route path="/admin/users/roles" element={<Roles />} />














                            <Route path="/about" element={<h1>About</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout