import React from "react";
import { Routes, Route } from "react-router-dom";

// layouts
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";

// user pages
import Home from "../pages/user/Home";


// admin pages
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import Categories from "../pages/admin/Categories";
import StockAdjust from "../pages/admin/StockAdjust";
import BulkIE from "../pages/admin/BulkIE";
import ProductLogs from "../pages/admin/ProductLogs";
import AllOrders from "../pages/admin/AllOrders";
import Pending from "../pages/admin/Pending";
import CompleteOrder from "../pages/admin/CompleteOrder";
import Refunds from "../pages/admin/Refunds";
import Payments from "../pages/admin/Payments";
import AllUsers from "../pages/admin/AllUsers";
import Roles from "../pages/admin/Roles";
import ActivityLogs from "../pages/admin/ActivityLogs";
import Sales from "../pages/admin/Sales";
import Inventory from "../pages/admin/Inventory";
import TopProductsCustomers from "../pages/admin/TopProductsCustomers";
import BackupExport from "../pages/admin/BackupExport";
import General from "../pages/admin/General";
import PaymentsTaxes from "../pages/admin/PaymentsTaxes";
import Storage from "../pages/admin/Storage";
import Profile from "../pages/admin/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            {/* User Layout */}
            <Route path="/*" element={<UserLayout />}>
                <Route index element={<Home />} />
            </Route>

            {/* Admin Layout */}
            <Route path="/admin/*" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="products/new" element={<AddProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="inventory/stock-adjust" element={<StockAdjust />} />
                <Route path="inventory/bulk" element={<BulkIE />} />
                <Route path="inventory/logs" element={<ProductLogs />} />
                <Route path="orders" element={<AllOrders />} />
                <Route path="orders/pending" element={<Pending />} />
                <Route path="orders/completed" element={<CompleteOrder />} />
                <Route path="orders/refunds" element={<Refunds />} />
                <Route path="orders/payments" element={<Payments />} />
                <Route path="users" element={<AllUsers />} />
                <Route path="users/roles" element={<Roles />} />
                <Route path="users/logs" element={<ActivityLogs />} />
                <Route path="reports/sales" element={<Sales />} />
                <Route path="reports/inventory" element={<Inventory />} />
                <Route path="reports/top" element={<TopProductsCustomers />} />
                <Route path="tools/backup-export" element={<BackupExport />} />
                <Route path="settings/general" element={<General />} />
                <Route path="settings/payments" element={<PaymentsTaxes />} />
                <Route path="settings/storage" element={<Storage />} />
                <Route path="profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
