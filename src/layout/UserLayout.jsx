import React, { useState } from 'react'
import { Outlet } from "react-router-dom";
import Header from '../components/user/Header';
import MobileBottomNavigation from '../components/user/header/MobileBottomNavigation';
import MobileNavigationMenu from '../components/user/header/MobileNavigationMenu';


const UserLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const openMobileMenu = () => setIsMobileMenuOpen(true);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);
    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    return (
        <>

            <div className="flex userlayout flex-col min-h-screen">
                {/* Common Navbar */}
                <Header />

                {/* Dynamic Pages */}
                <main className="flex-grow">
                    <Outlet />
                </main>


                <MobileBottomNavigation onMenuClick={openMobileMenu} />

                <MobileNavigationMenu
                    isOpen={isMobileMenuOpen}
                    onClose={closeMobileMenu}
                />
                {/* Common Footer */}
                {/* <Footer /> */}
                {/* Pass open/toggle handlers */}
            </div>


        </>
    )
}

export default UserLayout