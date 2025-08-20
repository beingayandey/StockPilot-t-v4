import React from 'react'
import WidgetsCard from '../components/dashboard/WidgetsCard';

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

            <div className="grid  grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
                {kpis.map((item, index) => <WidgetsCard item={item} isEven={index % 2 === 0} key={item.id} />)}
            </div>


        </>
    )
}

export default Dashboard