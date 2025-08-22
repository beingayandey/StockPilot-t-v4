import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import APTableFooter from "./APTableFooter";
import APTableBody from "./APTableBody";

import APTableHeader from "./APTableHeader";

// Mock product data
const mockProducts = Array.from({ length: 100 }, (_, i) => ({
    id: `P${Math.random().toString(36).substring(2, 4)}${i + 1}`,
    name: `Technical Gadget ${Math.random().toString(36).substring(2, 9)}`,
    price: (i + 1) * 10,
    stock: 5 + i % 10,
    image: `https://picsum.photos/id/${i + 1}/40/40`
}));

const columns = [
    { key: "image", label: "Image", sortable: false },
    { key: "id", label: "Product ID", sortable: true },
    { key: "name", label: "Product Name", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "actions", label: "Actions", sortable: false }
];

const AllProducts = () => {
    const [data, setData] = useState(mockProducts);
    const [filterText, setFilterText] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [bulkDelta, setBulkDelta] = useState(0); // bulk +/- input
    const MAX_QTY = 9999;

    // single row: set absolute quantity
    const setQuantity = (id, next) => {
        const qty = Math.max(0, Math.min(Number(next) || 0, MAX_QTY));
        setData(prev => prev.map(r => (r.id === id ? { ...r, stock: qty } : r)));
    };

    // single row: +/- delta
    const addQuantity = (id, delta) => {
        setData(prev => prev.map(r =>
            r.id === id ? { ...r, stock: Math.max(0, Math.min((r.stock || 0) + delta, MAX_QTY)) } : r
        ));
    };

    // bulk: apply delta to all selected
    const applyBulkAdjust = () => {
        const d = Number(bulkDelta) || 0;
        if (!d || selectedRows.length === 0) return;
        setData(prev => prev.map(r =>
            selectedRows.includes(r.id)
                ? { ...r, stock: Math.max(0, Math.min((r.stock || 0) + d, MAX_QTY)) }
                : r
        ));
        setBulkDelta(0);
    };

    // Filter + Sort
    const filteredAndSortedData = useMemo(() => {
        let filtered = data.filter(
            (item) =>
                item.id.toLowerCase().includes(filterText.toLowerCase()) ||
                item.name.toLowerCase().includes(filterText.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];
            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            return sortOrder === "asc"
                ? aValue < bValue
                    ? -1
                    : aValue > bValue
                        ? 1
                        : 0
                : aValue > bValue
                    ? -1
                    : aValue < bValue
                        ? 1
                        : 0;
        });

        return filtered;
    }, [filterText, sortBy, sortOrder, data]);

    const totalRows = filteredAndSortedData.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handleSort = (column) => {
        setSortBy(column);
        setSortOrder(sortBy === column && sortOrder === "asc" ? "desc" : "asc");
        setCurrentPage(1);
    };

    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    const toggleAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(paginatedData.map((row) => row.id));
        } else {
            setSelectedRows([]);
        }
    };

    const deleteSelected = () => {
        setData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
        setSelectedRows([]);
    };

    const deleteSingle = (id) => {
        setData((prev) => prev.filter((row) => row.id !== id));
    };

    return (
        <>
            <div className="flex justify-between mb-2">
                <span className="text-base font-semibold mt-5 mb-2 text-primary-black inline-block">
                    All Products
                </span>



                <div className="flex items-center gap-2">
                    {/* Bulk adjust toolbar */}
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-neutral-700">Adjust</span>
                        <input
                            type="number"
                            value={bulkDelta}
                            onChange={e => setBulkDelta(e.target.value)}
                            className="w-20 px-2 py-1 border border-black-variant-two rounded-md text-sm bg-primary-white text-primary-black"
                            placeholder="+5 / -3"
                        />
                        <button
                            onClick={applyBulkAdjust}
                            disabled={selectedRows.length === 0 || Number(bulkDelta) === 0}
                            className="px-3 py-1.5 text-sm rounded bg-primary text-white disabled:opacity-50"
                            title="Apply to selected rows"
                        >
                            Apply
                        </button>
                    </div>

                    {selectedRows.length > 0 && (
                        <button
                            onClick={deleteSelected}
                            className="bg-red-600 text-white px-3 py-1.5 rounded text-sm"
                        >
                            Bulk Delete ({selectedRows.length})
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-light-variant-eleven rounded border border-neutral-300 shadow-sm w-full">
                {/* Filter + Rows per page */}
                <div className="flex items-center justify-between p-2 border-b border-neutral-300">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="px-2 py-1 border border-black-variant-two text-primary-black bg-primary-white focus:outline-none placeholder:text-neutral-400 rounded-md text-sm"
                    />
                    <select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        className="p-1 border rounded-md text-sm bg-primary-white border-black-variant-two text-primary-black focus:outline-none"
                    >
                        {[10, 50, 100, 1000].map((val) => (
                            <option key={val} value={val}>
                                {val} rows
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <motion.table

                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        variants={{ show: { transition: { staggerChildren: 0.02 } } }}
                        className="w-full"
                    >
                        <APTableHeader
                            columns={columns}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            allSelected={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                            toggleAll={toggleAll}
                        />
                        <APTableBody
                            data={paginatedData}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                            deleteSingle={deleteSingle}
                            setQuantity={setQuantity}
                            addQuantity={addQuantity}
                        />
                    </motion.table>
                </div>

                <APTableFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    selectedCount={selectedRows.length}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default AllProducts;
