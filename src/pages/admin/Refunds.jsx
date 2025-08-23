// src/components/refunds/Refunds.jsx
import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

const mockRefunds = Array.from({ length: 100 }, (_, i) => ({
    refundId: `REF${i + 1}`,
    orderId: `ORD${i + 1}`,
    customer: `Customer ${i + 1}`,
    amount: i % 2 === 0 ? 450 : 1200,
    status: i % 2 === 0 ? "Processed" : "Pending",
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

const pillCls = (s) =>
    s === "Processed"
        ? "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20"
        : "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/20";

const Refunds = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return mockRefunds.filter(
            (r) =>
                r.refundId.toLowerCase().includes(q) ||
                r.orderId.toLowerCase().includes(q) ||
                r.customer.toLowerCase().includes(q) ||
                r.date.includes(q)
        );
    }, [filterText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

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
                    placeholder="Search refunds..."
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-neutral-100">
                        <tr>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Refund ID</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Order ID</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Customer</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Amount</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Status</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Date</th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-300">
                        {pageRows.map((r) => (
                            <tr key={r.refundId} className="hover:bg-primary-white">
                                <td className="px-4 py-2 text-sm text-primary-black">{r.refundId}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{r.orderId}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{r.customer}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">₹{r.amount}</td>
                                <td className="px-4 py-2">
                                    <span className={pillCls(r.status)}>{r.status}</span>
                                </td>
                                <td className="px-4 py-2 text-sm text-primary-black">{r.date}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => console.log("View refund:", r)}
                                        className={`${cls.btn} ${cls.btnPrimary}`}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pageRows.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-6 text-center text-neutral-700">
                                    No refunds found
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

export default Refunds;
