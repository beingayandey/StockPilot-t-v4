import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/user/Navbar';


const UserLayout = () => {
    return (
        <>

            <div className="flex flex-col min-h-screen">
                {/* Common Navbar */}
                <Navbar />

                {/* Dynamic Pages */}
                <main className="flex-grow">
                    <Outlet />
                </main>

                {/* Common Footer */}
                {/* <Footer /> */}
            </div>


        </>
    )
}

export default UserLayout