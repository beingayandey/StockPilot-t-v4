// src/pages/admin/Pending.jsx
import React, { useState, useMemo } from "react";
import PendingFilter from "../../components/admin/pending/PendingFilter";
import PendingTable from "../../components/admin/pending/PendingTable";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";


const mockOrders = [
    { orderId: "ORD101", customer: "Rohit Das", total: 520.0, status: "Pending", date: "2025-08-21" },
    { orderId: "ORD102", customer: "Mitali Sen", total: 1240.5, status: "Processing", date: "2025-08-22" },
    { orderId: "ORD103", customer: "Amit Roy", total: 875.0, status: "Pending", date: "2025-08-22" },
    { orderId: "ORD104", customer: "Rina Gupta", total: 420.0, status: "Processing", date: "2025-08-23" },
];

const Pending = () => {
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtered orders
    const filteredOrders = useMemo(() => {
        return mockOrders.filter((o) => {
            const matchStatus = ["Pending", "Processing"].includes(o.status);
            const matchText =
                o.customer.toLowerCase().includes(filterText.toLowerCase()) ||
                o.orderId.toLowerCase().includes(filterText.toLowerCase());
            return matchStatus && matchText;
        });
    }, [filterText]);

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
    const paginatedData = filteredOrders.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div className="p-4">
            <TableFilter
                filterText={filterText}
                setFilterText={setFilterText}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                setCurrentPage={setCurrentPage}
            />
            <PendingTable
                data={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRows={filteredOrders.length}
                selectedCount={paginatedData.length}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Pending;