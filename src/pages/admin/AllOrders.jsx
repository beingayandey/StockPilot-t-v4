// src/pages/admin/AllOrders.jsx
import React, { useState } from "react";
import OrdersTable from "../../components/admin/allOrders/OrdersTable";

import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";

const AllOrders = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    // Sample Data (production এ backend/Firebase থেকে আসবে)
    const [orders] = useState(
        Array.from({ length: 100 }, (_, i) => ({
            id: `ORD${i + 1}`,
            customer: `Customer ${i + 1}`,
            total: (i + 1) * 10.99,
            status: ["Success", "Pending", "Cancelled"][i % 3],
            date: `2025-08-${i + 1}`,
        }))
    );

    // Filtering
    const filteredOrders = orders.filter(
        (o) =>
            o.customer.toLowerCase().includes(filterText.toLowerCase()) ||
            o.id.toLowerCase().includes(filterText.toLowerCase()) ||
            o.status.toLowerCase().includes(filterText.toLowerCase())
    );

    // Pagination
    const indexOfLast = currentPage * rowsPerPage;
    const indexOfFirst = indexOfLast - rowsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

    return (
        <div className="p-3">
            <h1 className="text-base font-semibold text-primary-black mb-3">
                All Orders
            </h1>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm">
                <TableFilter
                    filterText={filterText}
                    setFilterText={setFilterText}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                    setCurrentPage={setCurrentPage}
                />

                <OrdersTable data={currentOrders} />

                {/* Pagination */}
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={filteredOrders.length}
                    selectedCount={currentOrders.length}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AllOrders;
