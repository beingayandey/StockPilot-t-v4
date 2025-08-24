// src/pages/admin/activityLogs/ActivityLogs.jsx
import React, { useState, useMemo } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock Logs
const mockLogs = Array.from({ length: 60 }, (_, i) => ({
    id: `LOG${1000 + i + 1}`,
    user: `User ${i % 20 + 1}`,
    action: ["Created", "Updated", "Deleted", "Logged In", "Logged Out"][i % 5],
    target: ["Laptop Pro", "Wireless Mouse", "Keyboard", "Monitor", "Charger"][i % 5],
    ip: `192.168.0.${i + 1}`,
    status: i % 2 === 0 ? "success" : "failed",
    date: new Date(Date.now() - i * 3600 * 1000).toISOString().slice(0, 19).replace("T", " "),
}));

// ✅ Status pill styles
const pillCls = (s) => {
    switch (s) {
        case "success":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20";
        case "failed":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20";
        default:
            return "";
    }
};

const ActivityLogs = () => {
    const [logs, setLogs] = useState(mockLogs);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ Filter logs
    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return logs.filter(
            (l) =>
                l.id.toLowerCase().includes(q) ||
                l.user.toLowerCase().includes(q) ||
                l.action.toLowerCase().includes(q) ||
                l.target.toLowerCase().includes(q) ||
                l.ip.toLowerCase().includes(q) ||
                l.status.toLowerCase().includes(q) ||
                l.date.toLowerCase().includes(q)
        );
    }, [filterText, logs]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    return (
        <div className="p-3">
            <span className="text-base font-semibold text-primary-black">Payments</span>
            <div className={`${cls.card} mt-2`}>
                {/* Header Filter */}
                <div className="border-b border-neutral-300">
                    <TableFilter
                        filterText={filterText}
                        setFilterText={(v) => {
                            setFilterText(v);
                            setCurrentPage(1);
                        }}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={(n) => {
                            setRowsPerPage(n);
                            setCurrentPage(1);
                        }}
                        placeholder="Search activity logs..."
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Log ID</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">User</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Action</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Target</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">IP</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Status</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-300">
                            {pageRows.map((log) => (
                                <tr key={log.id} className="hover:bg-primary-white">
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.id}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.user}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.action}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.target}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.ip}</td>
                                    <td className="px-4 py-2"><span className={pillCls(log.status)}>{log.status}</span></td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{log.date}</td>
                                </tr>
                            ))}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-neutral-700">
                                        No activity logs found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination */}
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={filtered.length}
                    selectedCount={0}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ActivityLogs;
