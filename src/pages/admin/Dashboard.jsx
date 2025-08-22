import React from 'react'
import WidgetsCard from '../../components/admin/dashboard/WidgetsCard';
import RecentOrderTables from '../../components/admin/dashboard/RecentOrderTables';
import LowStockProducts from '../../components/admin/dashboard/LowStockProducts';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';

const Dashboard = () => {
    const kpis = [
        {
            id: 1,
            title: "Total Products",
            value: 245,
        },
        {
            id: 2,
            title: "Low Stock Products",
            value: 18,
        },
        {
            id: 3,
            title: "Orders Today",
            value: 37,
        },
        {
            id: 4,
            title: "Revenue Today",
            value: "₹1,24,580",
        },
    ];
    const bgColors = {
        "Total Products": "bg-blue-100",
        "Low Stock Products": "bg-red-100",
        "Orders Today": "bg-green-100",
        "Revenue Today": "bg-yellow-100",
    };
    return (
        <>
            <span className='text-base inline-block font-bold mb-5 text-primary-black'>Widgets</span>
            <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
                {kpis.map((item, index) => <WidgetsCard item={item} isEven={index % 2 === 0} key={item.id} />)}
            </div>

            <div className="flex gap-5 w-full">
                <div className="outer-table w-[65%]">
                    <RecentOrderTables />
                </div>
                <div className="outer-low-stock w-[35%]">
                    <LowStockProducts />
                </div>
            </div>
            <div className="flex mt-5">
                <div className="outer-table w-[65%]">
                    <RevenueChart />
                </div>
            </div>

        </>
    )
}

export default Dashboard