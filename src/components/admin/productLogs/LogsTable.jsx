// src/components/productLogs/LogsTable.jsx
import React from "react";

const LogsTable = ({ data }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-neutral-200 text-left">
                    <tr>
                        <th className="p-2">ID</th>
                        <th className="p-2">Product</th>
                        <th className="p-2">Action</th>
                        <th className="p-2">Qty</th>
                        <th className="p-2">User</th>
                        <th className="p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((log) => (
                        <tr key={log.id} className="border-t">
                            <td className="p-2">{log.id}</td>
                            <td className="p-2">{log.product}</td>
                            <td className="p-2">{log.action}</td>
                            <td
                                className={`p-2 font-medium ${log.qty > 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {log.qty > 0 ? `+${log.qty}` : log.qty}
                            </td>
                            <td className="p-2">{log.user}</td>
                            <td className="p-2">{log.date}</td>
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
