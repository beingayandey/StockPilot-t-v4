// src/components/reports/topProductsCustomers/TopProducts&Customers.jsx
import React, { useState, useMemo } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock Top Products
const mockProducts = Array.from({ length: 30 }, (_, i) => ({
    id: `PRD${100 + i}`,
    name: `Product ${i + 1}`,
    category: i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Clothing" : "Accessories",
    sold: Math.floor(Math.random() * 500) + 50,
    revenue: Math.floor(Math.random() * 20000) + 1000,
}));

// ✅ Mock Top Customers
const mockCustomers = Array.from({ length: 30 }, (_, i) => ({
    id: `CUS${100 + i}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    orders: Math.floor(Math.random() * 20) + 1,
    totalSpent: Math.floor(Math.random() * 5000) + 500,
}));

const TopProductsCustomers = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const combined = [...mockProducts.map(p => ({ type: "Product", ...p })), ...mockCustomers.map(c => ({ type: "Customer", ...c }))];

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return combined.filter(item => {
            if (item.type === "Product") {
                return item.id.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
            } else {
                return item.id.toLowerCase().includes(q) || item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q);
            }
        });
    }, [filterText, combined]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    return (
        <div className="p-3">
            <span className="text-base font-semibold text-primary-black">Top Products &amp; Customers</span>
            <div className={`${cls.card} mt-2`}>
                {/* Header filter */}
                <div className="border-b border-neutral-300">
                    <TableFilter
                        filterText={filterText}
                        setFilterText={(v) => { setFilterText(v); setCurrentPage(1); }}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={(n) => { setRowsPerPage(n); setCurrentPage(1); }}
                        placeholder="Search top products/customers..."
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className={cls.th}>ID</th>
                                <th className={cls.th}>Type</th>
                                <th className={cls.th}>Name</th>
                                <th className={cls.th}>Category / Email</th>
                                <th className={cls.th}>Orders / Sold</th>
                                <th className={cls.th}>Revenue / Total Spent</th>
                                <th className={cls.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-300">
                            {pageRows.map((item) => (
                                <tr key={item.id} className="hover:bg-primary-white">
                                    <td className="px-4 py-2 text-sm text-primary-black">{item.id}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{item.type}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{item.name}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">
                                        {item.type === "Product" ? item.category : item.email}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-primary-black">
                                        {item.type === "Product" ? item.sold : item.orders}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-primary-black">
                                        {item.type === "Product" ? `$${item.revenue}` : `$${item.totalSpent}`}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className={`${cls.btn} ${cls.btnPrimary}`}
                                            onClick={() => console.log("View item:", item)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-neutral-700">
                                        No items found
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

export default TopProductsCustomers;
