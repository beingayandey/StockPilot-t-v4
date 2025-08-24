// src/components/reports/sales/Sales.jsx
import React, { useState, useMemo } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock Sales Data
const mockSales = Array.from({ length: 50 }, (_, i) => ({
    id: `SAL100${i + 1}`,
    product: `Product ${i + 1}`,
    customer: `Customer ${i + 1}`,
    amount: (Math.random() * 500 + 50).toFixed(2),
    status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Refunded",
    date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

const statusCls = (s) => {
    switch (s) {
        case "Completed":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20";
        case "Pending":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/20";
        case "Refunded":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20";
        default:
            return "";
    }
};

const Sales = () => {
    const [sales, setSales] = useState(mockSales);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return sales.filter(
            (s) =>
                s.id.toLowerCase().includes(q) ||
                s.product.toLowerCase().includes(q) ||
                s.customer.toLowerCase().includes(q) ||
                s.status.toLowerCase().includes(q)
        );
    }, [filterText, sales]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    return (
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
                        placeholder="Search sales..."
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className={cls.th}>Sale ID</th>
                                <th className={cls.th}>Product</th>
                                <th className={cls.th}>Customer</th>
                                <th className={cls.th}>Amount ($)</th>
                                <th className={cls.th}>Status</th>
                                <th className={cls.th}>Date</th>
                                <th className={cls.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-300">
                            {pageRows.map((s) => (
                                <tr key={s.id} className="hover:bg-primary-white">
                                    <td className="px-4 py-2 text-sm text-primary-black">{s.id}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{s.product}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{s.customer}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{s.amount}</td>
                                    <td className="px-4 py-2">
                                        <span className={statusCls(s.status)}>{s.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{s.date}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className={`${cls.btn} ${cls.btnPrimary}`}
                                            onClick={() => console.log("View sale:", s)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-neutral-700">
                                        No sales found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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

export default Sales;
