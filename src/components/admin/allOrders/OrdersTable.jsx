// src/components/allOrders/OrdersTable.jsx
import React from "react";
import { motion } from "framer-motion";

const OrdersTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <motion.table initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                variants={{ show: { transition: { staggerChildren: 0.02 } } }} className="w-full text-sm border-collapse">
                <thead className="bg-neutral-200 text-left">
                    <tr>
                        <th className="p-2 border-b">Order ID</th>
                        <th className="p-2 border-b">Customer</th>
                        <th className="p-2 border-b">Total</th>
                        <th className="p-2 border-b">Status</th>
                        <th className="p-2 border-b">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((order) => (
                            <tr key={order.id} className="hover:bg-neutral-100">
                                <td className="p-2 border-b">{order.id}</td>
                                <td className="p-2 border-b">{order.customer}</td>
                                <td className="p-2 border-b">${order.total.toFixed(2)}</td>
                                <td className="p-2 border-b">{order.status}</td>
                                <td className="p-2 border-b">{order.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-3 text-neutral-500">
                                No orders found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </motion.table>
        </div>
    );
};

export default OrdersTable;
