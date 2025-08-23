// src/pages/admin/ProductLogs.jsx
import React, { useState } from "react";
import { cls } from "../../components/admin/addProduct/cls";
import LogsTable from "../../components/admin/productLogs/LogsTable";

import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";

const ProductLogs = function () {
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    const [logs] = useState([
        // এখানে তুমি Firebase/Backend থেকে data আনবে
        {
            id: "L001",
            product: "Laptop Pro",
            action: "Stock Adjusted",
            qty: -2,
            user: "Admin",
            date: "2025-08-21 14:32",
        },
        {
            id: "L002",
            product: "Mouse",
            action: "Bulk Import",
            qty: +50,
            user: "Admin",
            date: "2025-08-22 10:12",
        },
        {
            id: "L003",
            product: "Keyboard",
            action: "Stock Adjusted",
            qty: -1,
            user: "Manager",
            date: "2025-08-22 15:45",
        },
        // Imagine hundreds/thousands more logs...
    ]);

    // Filtering
    const filteredLogs = logs.filter(
        (l) =>
            l.product.toLowerCase().includes(filterText.toLowerCase()) ||
            l.action.toLowerCase().includes(filterText.toLowerCase()) ||
            l.user.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination slice
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

    return (
        <div className="p-3">
            <h1 className="text-base font-semibold text-primary-black mb-3">
                Product Logs
            </h1>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm">

                {/* Filters */}
                <TableFilter
                    filterText={filterText}
                    setFilterText={setFilterText}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setCurrentPage={setCurrentPage}
                />

                {/* Logs Table */}
                <LogsTable data={currentLogs} />

                {/* Pagination Controls */}
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={filteredLogs.length}
                    selectedCount={currentLogs.length}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductLogs;
