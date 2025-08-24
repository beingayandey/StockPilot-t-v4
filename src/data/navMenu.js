export const navMenu = [
    {
        label: "Home",
        path: "/",
        icon: "Home"
    },
    {
        label: "Shop",
        icon: "ShoppingBag",
        children: [
            { label: "All Products", path: "/shop" },
            { label: "Categories", path: "/shop/categories" },
            { label: "Offers / Deals", path: "/shop/offers" },
            { label: "New Arrivals", path: "/shop/new" },
            { label: "Best Sellers", path: "/shop/best-sellers" },
        ],
    },
    {
        label: "Cart",
        path: "/cart",
        icon: "ShoppingCart"
    },
    {
        label: "Orders",
        icon: "Package",
        private: true,
        children: [
            { label: "My Orders", path: "/orders" },
            { label: "Track Order", path: "/orders/track" },
            { label: "Returns & Refunds", path: "/orders/returns" },
        ],
    },
    {
        label: "Profile",
        icon: "User",
        private: true,
        children: [
            { label: "My Account", path: "/profile" },
            { label: "Wishlist", path: "/profile/wishlist" },
            { label: "Saved Addresses", path: "/profile/addresses" },
            { label: "Payment Methods", path: "/profile/payments" },
            { label: "Logout", path: "/logout" },
        ],
    },
    {
        label: "Login / Register",
        path: "/login",
        icon: "LogIn",
        guestOnly: true,
    },
    {
        label: "Support",
        icon: "HelpCircle",
        children: [
            { label: "Help Center", path: "/support" },
            { label: "Contact Us", path: "/support/contact" },
            { label: "FAQs", path: "/support/faqs" },
        ],
    },
];
