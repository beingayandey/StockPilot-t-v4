import React, { useState, useMemo } from 'react';
import { DotsThree, CaretUp, CaretDown } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import TableFooter from './TableFooter';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

const mockData = [
    {
        orderId: 'ORD001',
        customer: 'Ken Smith',
        total: 316.00,
        status: 'Success',
        date: '2025-08-20',
        product: 'Laptop Pro',
        stock: 12
    },
    {
        orderId: 'ORD002',
        customer: 'Carmella Jones',
        total: 721.00,
        status: 'Failed',
        date: '2025-08-19',
        product: 'Wireless Mouse',
        stock: 25
    },
    {
        orderId: 'ORD003',
        customer: 'Silas Brown',
        total: 874.00,
        status: 'Success',
        date: '2025-08-18',
        product: 'Smartphone X',
        stock: 8
    },
    {
        orderId: 'ORD004',
        customer: 'Monserrat Lee',
        total: 837.00,
        status: 'Processing',
        date: '2025-08-17',
        product: 'Headphones',
        stock: 15
    },
    {
        orderId: 'ORD005',
        customer: 'Abe Wilson',
        total: 242.00,
        status: 'Success',
        date: '2025-08-16',
        product: 'Keyboard',
        stock: 20
    },
    {
        orderId: 'ORD006',
        customer: 'Ayan Dey',
        total: 242.00,
        status: 'Success',
        date: '2025-08-16',
        product: 'Keyboard',
        stock: 20
    },
];
const columns = [
    { key: "orderId", label: "Order ID", sortable: true },
    { key: "customer", label: "Customer", sortable: true },
    { key: "total", label: "Total", sortable: true },
    { key: "status", label: "Status", sortable: false },
    { key: "date", label: "Date", sortable: true },
    { key: "product", label: "Product", sortable: true },
    { key: "stock", label: "Stock", sortable: true },
];
const RecentOrderTables = () => {
    const [filterText, setFilterText] = useState("");
    const [sortBy, setSortBy] = useState("orderId");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredAndSortedData = useMemo(() => {
        let filtered = mockData.filter(
            (item) =>
                item.orderId.toLowerCase().includes(filterText.toLowerCase()) ||
                item.customer.toLowerCase().includes(filterText.toLowerCase()) ||
                item.status.toLowerCase().includes(filterText.toLowerCase()) ||
                item.product.toLowerCase().includes(filterText.toLowerCase())
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
    }, [filterText, sortBy, sortOrder]);

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
            setSelectedRows(paginatedData.map((row) => row.orderId));
        } else {
            setSelectedRows([]);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Success":
                return "text-green-700 bg-green-50 ring-green-600/20";
            case "Failed":
                return "text-red-700 bg-red-50 ring-red-600/20";
            case "Processing":
                return "text-yellow-700 bg-yellow-50 ring-yellow-600/20";
            default:
                return "text-neutral-900 bg-neutral-100 ring-gray-600/20";
        }
    };

    return (
        <>
            <span className='text-base font-semibold mt-5 mb-2  text-primary-black inline-block'>Recent Orders</span>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm w-full">
                {/* Filter + Rows per page */}
                <div className="flex items-center justify-between p-2 border-b border-neutral-300">
                    <input
                        type="text"
                        placeholder="Filter orders..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="px-2 py-1 border border-black-variant-two text-primary-black bg-primary-white focus:outline-none placeholder:text-neutral-400 rounded-md text-sm"
                    />
                    <select
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                        className=" p-1 border rounded-md text-sm bg-primary-white border-black-variant-two text-primary-black focus:outline-none"
                    >
                        <option value={5}>5 rows</option>
                        <option value={10}>10 rows</option>
                        <option value={20}>20 rows</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <motion.table
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        variants={{ show: { transition: { staggerChildren: 0.02 } } }}
                        className="w-full "
                    >
                        <TableHeader
                            columns={columns}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            allSelected={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                            toggleAll={toggleAll}
                        />
                        <TableBody
                            data={paginatedData}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                            getStatusColor={getStatusColor}
                        />
                    </motion.table>
                </div>

                <TableFooter
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

export default RecentOrderTables;

