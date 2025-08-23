// src/components/pending/PendingTable.jsx
import React from "react";
import { cls } from "../addProduct/cls";

const PendingTable = ({ data, currentPage, totalPages, setCurrentPage }) => {
    const handleStatusUpdate = (orderId, newStatus) => {
        console.log(`Order ${orderId} updated to ${newStatus}`);
        // এখানে Firebase update logic যাবে
    };

    return (
        <>
            <div className="overflow-x-auto">
                <table className={`${cls.table} w-full`}>
                    <thead>
                        <tr >
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((o) => (
                                <tr key={o.orderId} className="border border-neutral-300 text-xs text-primary-black">
                                    <td>{o.orderId}</td>
                                    <td>{o.customer}</td>
                                    <td>₹{o.total.toFixed(2)}</td>
                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded text-sm ${o.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-blue-100 text-blue-700"
                                                }`}
                                        >
                                            {o.status}
                                        </span>
                                    </td>
                                    <td>{o.date}</td>
                                    <td className="flex gap-2 ">
                                        <button
                                            onClick={() => alert(`Viewing ${o.orderId}`)}
                                            className="px-2 py-1 text-sm rounded bg-neutral-200 hover:bg-neutral-300"
                                        >
                                            View
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleStatusUpdate(
                                                    o.orderId,
                                                    o.status === "Pending" ? "Processing" : "Completed"
                                                )
                                            }
                                            className="px-2 py-1 text-sm rounded bg-primary text-white hover:bg-primary/80"
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-4 text-neutral-500">
                                    No pending/processing orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default PendingTable;