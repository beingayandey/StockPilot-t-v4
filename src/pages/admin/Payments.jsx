// src/components/payments/Payments.jsx
import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

const mockPayments = Array.from({ length: 50 }, (_, i) => ({
    txnId: `TXN90${i + 1}`,
    orderId: `ORD10${i + 1}`,
    customer: `Customer ${i + 1}`,
    amount: (i + 1) * 10,
    method: ["UPI", "Card", "NetBanking"][i % 3],
    status: ["Success", "Pending", "Failed"][i % 3],
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
}));

const pillCls = (s) => {
    switch (s) {
        case "Success":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20";
        case "Pending":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/20";
        case "Failed":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20";
        default:
            return "";
    }
};

const Payments = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return mockPayments.filter(
            (p) =>
                p.txnId.toLowerCase().includes(q) ||
                p.orderId.toLowerCase().includes(q) ||
                p.customer.toLowerCase().includes(q) ||
                p.method.toLowerCase().includes(q) ||
                p.date.includes(q)
        );
    }, [filterText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    return (
        <>


            <div className="p-3">
                <span className="text-base font-semibold text-primary-black">Payments</span>

                <div className={`${cls.card} mt-2`}>
                    {/* Header filter */}
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
                            placeholder="Search payments..."
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-100">
                                <tr>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Txn ID</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Order ID</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Customer</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Amount</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Method</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Status</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Date</th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-neutral-300">
                                {pageRows.map((p) => (
                                    <tr key={p.txnId} className="hover:bg-primary-white">
                                        <td className="px-4 py-2 text-sm text-primary-black">{p.txnId}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{p.orderId}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{p.customer}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">₹{p.amount}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{p.method}</td>
                                        <td className="px-4 py-2">
                                            <span className={pillCls(p.status)}>{p.status}</span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{p.date}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => console.log("View payment:", p)}
                                                className={`${cls.btn} ${cls.btnPrimary}`}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {pageRows.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-6 text-center text-neutral-700">
                                            No payments found
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
            </div>
        </>
    );
};

export default Payments;
