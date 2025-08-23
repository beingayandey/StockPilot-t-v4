import React, { useMemo, useState } from "react";
import TableFilter from "../common/TableFilter";
import TablePagination from "../common/TablePagination";
import { cls } from "../addProduct/cls";

const mockData = [
    { orderId: "ORD2001", customer: "Rahul Sharma", total: 450, status: "Completed", date: "2025-08-15" },
    { orderId: "ORD2002", customer: "Sneha Das", total: 1200, status: "Completed", date: "2025-08-18" },
    { orderId: "ORD2003", customer: "Amit Roy", total: 320, status: "Completed", date: "2025-08-20" },
    { orderId: "ORD2004", customer: "Priya Singh", total: 980, status: "Completed", date: "2025-08-21" },
];

const pillCls = (s) =>
    s === "Completed"
        ? "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
        : "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-neutral-700 bg-neutral-100 ring-neutral-600/20";

const CompleteTable = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return mockData.filter(
            (o) =>
                o.orderId.toLowerCase().includes(q) ||
                o.customer.toLowerCase().includes(q) ||
                o.date.includes(q)
        );
    }, [filterText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    // keep table height stable (pad rows)
    const pad = Math.max(rowsPerPage - pageRows.length, 0);

    return (
        <div className={`${cls.card} mt-2`}>
            {/* Header filter (reusable) */}
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
                    placeholder="Search completed orders..."
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-neutral-100">
                        <tr>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Order ID</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Customer</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Total</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Status</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Date</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-300">
                        {pageRows.map((o) => (
                            <tr key={o.orderId} className="hover:bg-primary-white">
                                <td className="px-4 py-2 text-sm text-primary-black">{o.orderId}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{o.customer}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">₹{o.total}</td>
                                <td className="px-4 py-2">
                                    <span className={pillCls(o.status)}>{o.status}</span>
                                </td>
                                <td className="px-4 py-2 text-sm text-primary-black">{o.date}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => console.log("View completed order:", o)}
                                        className={`${cls.btn} ${cls.btnPrimary}`}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pageRows.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-neutral-700">
                                    No completed orders found
                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRows={filtered.length}
                selectedCount={0}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default CompleteTable;
