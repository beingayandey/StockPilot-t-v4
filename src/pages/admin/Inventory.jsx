// src/components/reports/inventory/Inventory.jsx
import React, { useState, useMemo } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock Inventory Data (Low Stock)
const mockInventory = Array.from({ length: 40 }, (_, i) => ({
    id: `PRD${100 + i}`,
    name: `Product ${i + 1}`,
    category: i % 3 === 0 ? "Electronics" : i % 3 === 1 ? "Clothing" : "Accessories",
    stock: Math.floor(Math.random() * 5) + 1, // 1-5 stock
    supplier: `Supplier ${i + 1}`,
    lastRestock: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

const stockCls = (stock) => {
    if (stock <= 2) return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20";
    return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-yellow-700 bg-yellow-50 ring-yellow-600/20";
};

const Inventory = () => {
    const [items, setItems] = useState(mockInventory);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return items.filter(
            (i) =>
                i.id.toLowerCase().includes(q) ||
                i.name.toLowerCase().includes(q) ||
                i.category.toLowerCase().includes(q) ||
                i.supplier.toLowerCase().includes(q)
        );
    }, [filterText, items]);

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
                        placeholder="Search products..."
                    />
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className={cls.th}>Product ID</th>
                                <th className={cls.th}>Name</th>
                                <th className={cls.th}>Category</th>
                                <th className={cls.th}>Stock</th>
                                <th className={cls.th}>Supplier</th>
                                <th className={cls.th}>Last Restock</th>
                                <th className={cls.th}>Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-300">
                            {pageRows.map((i) => (
                                <tr key={i.id} className="hover:bg-primary-white">
                                    <td className="px-4 py-2 text-sm text-primary-black">{i.id}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{i.name}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{i.category}</td>
                                    <td className="px-4 py-2">
                                        <span className={stockCls(i.stock)}>{i.stock}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{i.supplier}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{i.lastRestock}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            className={`${cls.btn} ${cls.btnPrimary}`}
                                            onClick={() => console.log("View product:", i)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-6 text-center text-neutral-700">
                                        No products found
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

export default Inventory;
