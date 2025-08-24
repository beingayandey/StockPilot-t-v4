import React from 'react'

const products = [
    { name: "Laptop Pro", stock: 3, price: "$1,299.00", status: "Low" },
    { name: "Wireless Mouse", stock: 5, price: "$49.00", status: "Warning" },
    { name: "Mechanical Keyboard", stock: 2, price: "$149.00", status: "Critical" },
    { name: "USB-C Charger", stock: 4, price: "$39.00", status: "Low" },
    { name: "HD Monitor", stock: 1, price: "$299.00", status: "Critical" },
];

const LowStockProducts = () => {
    return (
        <>
            <span className='text-base font-semibold mt-5 mb-2 text-primary-black inline-block'>
                Low Stock Products
            </span>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm w-full ">

                <div className="table-responsive overflow-x-auto">
                    <table className="table-hover text-xs w-full">
                        <thead>
                            <tr className='hover:bg-primary-white border-b border-b-black-variant-two'>
                                <th className='text-primary-black'>Item</th>
                                <th className='text-primary-black'>Price</th>
                                <th className='text-primary-black'>Quantity</th>
                                <th className='text-primary-black'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap text-primary-black">{item.name}</td>
                                    <td className='text-primary-black'>{item.price}</td>
                                    <td className='text-primary-black'>{item.stock}</td>
                                    <td className="whitespace-nowrap">
                                        {item.status === "Critical" && (
                                            <p className="px-1.5 text-[#DC2626] bg-[#FEE2E2] text-xs rounded-[18px] inline-block">
                                                Critical
                                            </p>
                                        )}
                                        {item.status === "Low" && (
                                            <p className="px-1.5 text-[#D97706] bg-[#FEF3C7] text-xs rounded-[18px] inline-block">
                                                Low
                                            </p>
                                        )}
                                        {item.status === "Warning" && (
                                            <p className="px-1.5 text-[#CA8A04] bg-[#FEF9C3] text-xs rounded-[18px] inline-block">
                                                Warning
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default LowStockProducts
