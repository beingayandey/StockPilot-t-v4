import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import APTableBody from "./APTableBody";
import APTableHeader from "./APTableHeader";
import TableFilter from "../common/TableFilter";
import TablePagination from "../common/TablePagination";

// Mock product data
const mockProducts = Array.from({ length: 50 }, (_, i) => ({
    id: `P${i + 1}`,
    name: `Technical Gadget ${i + 1}`,
    price: (i + 1) * 10,
    stock: 5 + (i % 10),
    image: `https://picsum.photos/id/${i + 1}/40/40`,
}));

const columns = [
    // { key: "select", label: "", sortable: false },
    { key: "image", label: "Image", sortable: false },
    { key: "id", label: "Product ID", sortable: true },
    { key: "name", label: "Product Name", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
];

const AllProducts = () => {
    const [data, setData] = useState(mockProducts);
    const [filterText, setFilterText] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [bulkDelta, setBulkDelta] = useState(0);

    const [editProduct, setEditProduct] = useState(null); // selected product for modal

    const MAX_QTY = 9999;

    // Quantity functions
    const setQuantity = (id, next) => {
        const qty = Math.max(0, Math.min(Number(next) || 0, MAX_QTY));
        setData((prev) => prev.map((r) => (r.id === id ? { ...r, stock: qty } : r)));
    };

    const addQuantity = (id, delta) => {
        setData((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, stock: Math.max(0, Math.min(r.stock + delta, MAX_QTY)) } : r
            )
        );
    };

    // Bulk adjust
    const applyBulkAdjust = () => {
        const d = Number(bulkDelta) || 0;
        if (!d || selectedRows.length === 0) return;
        setData((prev) =>
            prev.map((r) =>
                selectedRows.includes(r.id)
                    ? { ...r, stock: Math.max(0, Math.min(r.stock + d, MAX_QTY)) }
                    : r
            )
        );
        setBulkDelta(0);
    };

    // Update Product (from modal)
    const updateProduct = (id, updated) => {
        setData((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
        setEditProduct(null); // close modal
    };

    const deleteSelected = () => {
        setData((prev) => prev.filter((row) => !selectedRows.includes(row.id)));
        setSelectedRows([]);
    };

    const deleteSingle = (id) => {
        setData((prev) => prev.filter((row) => row.id !== id));
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

    return (
        <>
            {/* Bulk controls */}
            <div className="flex justify-between mb-2">
                <span className="text-base font-semibold mt-5 mb-2 text-primary-black inline-block">
                    All Products
                </span>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-neutral-700">Adjust</span>
                        <input
                            type="number"
                            value={bulkDelta}
                            onChange={(e) => setBulkDelta(e.target.value)}
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

            {/* Table */}
            <div className="bg-light-variant-eleven rounded border border-neutral-300 shadow-sm w-full">
                <TableFilter
                    filterText={filterText}
                    setFilterText={setFilterText}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />

                <div className="overflow-x-auto">
                    <motion.table
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="w-full"
                    >
                        <APTableHeader
                            columns={columns}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            allSelected={
                                selectedRows.length === paginatedData.length &&
                                paginatedData.length > 0
                            }
                            toggleAll={toggleAll}
                        />
                        <APTableBody
                            data={paginatedData}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                            deleteSingle={deleteSingle}
                            setQuantity={setQuantity}
                            addQuantity={addQuantity}
                            openEditModal={setEditProduct} // pass function to open modal
                        />
                    </motion.table>
                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    selectedCount={selectedRows.length}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Edit Modal */}
            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-medium">Name</label>
                            <input
                                type="text"
                                value={editProduct.name}
                                onChange={(e) =>
                                    setEditProduct({ ...editProduct, name: e.target.value })
                                }
                                className="w-full px-2 py-1 border rounded"
                            />

                            <label className="text-sm font-medium">Price</label>
                            <input
                                type="number"
                                value={editProduct.price}
                                onChange={(e) =>
                                    setEditProduct({
                                        ...editProduct,
                                        price: Number(e.target.value),
                                    })
                                }
                                className="w-full px-2 py-1 border rounded"
                            />

                            <label className="text-sm font-medium">Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setEditProduct({ ...editProduct, image: url });
                                    }
                                }}
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setEditProduct(null)}
                                className="px-3 py-1.5 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    updateProduct(editProduct.id, {
                                        name: editProduct.name,
                                        price: editProduct.price,
                                        image: editProduct.image,
                                    })
                                }
                                className="px-3 py-1.5 rounded bg-primary text-white"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllProducts;
