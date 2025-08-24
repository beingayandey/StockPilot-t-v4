// src/components/productLogs/LogsTable.jsx
import React from "react";
import { cls } from "../addProduct/cls";

const LogsTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-neutral-200 text-left">
                    <tr>
                        <th className={cls.th}>ID</th>
                        <th className={cls.th}>Product</th>
                        <th className={cls.th}>Action</th>
                        <th className={cls.th}>Qty</th>
                        <th className={cls.th}>User</th>
                        <th className={cls.th}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((log) => (
                        <tr key={log.id} className="border-t">
                            <td className="px-4 py-2 text-sm text-primary-black">{log.id}</td>
                            <td className="px-4 py-2 text-sm text-primary-black">{log.product}</td>
                            <td className="px-4 py-2 text-sm text-primary-black">{log.action}</td>
                            <td
                                className={`px-4 py-2 text-sm text-primary-black font-medium ${log.qty > 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {log.qty > 0 ? `+${log.qty}` : log.qty}
                            </td>
                            <td className="px-4 py-2 text-sm text-primary-black">{log.user}</td>
                            <td className="px-4 py-2 text-sm text-primary-black">{log.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="p-3 text-sm text-neutral-500 text-center">
                    No logs found.
                </div>
            )}
        </div>
    );
};

export default LogsTable;
