export const menuData = [{ label: "Dashboard", path: "/admin", icon: "Layout" },
{
    label: "Products", icon: "Package",
    children: [
        { label: "All Products", path: "/admin/products" },
        { label: "Add New", path: "/admin/products/new" },
        { label: "Categories", path: "/admin/categories" },
        { label: "Stock Adjust", path: "/admin/inventory/stock-adjust" },
        { label: "Bulk Import/Export", path: "/admin/inventory/bulk" },
        { label: "Product Logs", path: "/admin/inventory/logs" },
    ]
},
{
    label: "Orders", icon: "ShoppingCart",
    children: [
        { label: "All Orders", path: "/admin/orders" },
        { label: "Pending / Processing", path: "/admin/orders/pending" },
        { label: "Completed", path: "/admin/orders/completed" },
        { label: "Refunds", path: "/admin/orders/refunds" },
        { label: "Payments (TXNs)", path: "/admin/orders/payments" },
    ]
},
{
    label: "Users", icon: "Users",
    children: [
        { label: "All Users", path: "/admin/users" },
        { label: "Roles & Permissions", path: "/admin/users/roles" },
        { label: "Activity Logs", path: "/admin/users/logs" },
    ]
},
{
    label: "Reports", icon: "ChartBar",
    children: [
        { label: "Sales", path: "/admin/reports/sales" },
        { label: "Inventory (Low Stock)", path: "/admin/reports/inventory" },
        { label: "Top Products / Customers", path: "/admin/reports/top" },
    ]
},
{
    label: "Tools", icon: "Wrench",
    children: [
        { label: "Seed / Import Demo", path: "/admin/tools/seed" },
        { label: "Backup / Export", path: "/admin/tools/backup-export" },
        { label: "Migrations", path: "/admin/tools/migrations" },
    ]
},
{
    label: "Settings", icon: "Gear",
    children: [
        { label: "General", path: "/admin/settings/general" },
        { label: "Payments / Taxes", path: "/admin/settings/payments" },
        { label: "Email Templates", path: "/admin/settings/emails" },
        { label: "Storage / CORS", path: "/admin/settings/storage" },
    ]
},
];