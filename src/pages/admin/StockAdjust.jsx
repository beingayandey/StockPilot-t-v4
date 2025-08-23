// src/pages/admin/StockAdjust.jsx
import React, { useMemo, useState } from "react";
import { cls } from "../../components/admin/addProduct/cls";
import StockTableHeader from "../../components/admin/stockAdjust/StockTableHeader";
import StockTableBody from "../../components/admin/stockAdjust/StockTableBody";

import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";

const mockProducts = [
    { id: "P001", name: "Laptop Pro", slug: "laptop-pro", stock: 12 },
    { id: "P002", name: "Wireless Mouse", slug: "wireless-mouse", stock: 40 },
    { id: "P003", name: "Keyboard", slug: "keyboard", stock: 25 },
    { id: "P004", name: "USB-C Charger", slug: "usb-c-charger", stock: 5 },
    { id: "P005", name: "HD Monitor", slug: "hd-monitor", stock: 7 },
];

const StockAdjust = function () {
    const [data, setData] = useState(mockProducts);
    const [filterText, setFilterText] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return data.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.slug.toLowerCase().includes(q) ||
                String(p.stock).includes(q)
        );
    }, [data, filterText]);

    const totalRows = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
    const startIndex = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(startIndex, startIndex + rowsPerPage);

    const toggleRow = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };
    const toggleAll = (e) => {
        if (e.target.checked) setSelectedRows(pageRows.map((r) => r.id));
        else setSelectedRows([]);
    };

    const handleAdjust = (id, diff, reason) => {
        setData((prev) =>
            prev.map((p) =>
                p.id === id
                    ? { ...p, stock: Math.max(0, p.stock + diff), reason }
                    : p
            )
        );
    };

    return (
        <div className="p-3">
            <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-primary-black">
                    Stock Adjustment
                </span>
                {selectedRows.length > 0 && (
                    <button
                        className={`${cls.btn} ${cls.btnGhost} text-danger border-danger`}
                    >
                        Bulk Adjust ({selectedRows.length})
                    </button>
                )}
            </div>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm">
                <TableFilter
                    filterText={filterText}
                    setFilterText={setFilterText}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <StockTableHeader
                            allSelected={
                                selectedRows.length === pageRows.length && pageRows.length > 0
                            }
                            toggleAll={toggleAll}
                        />
                        <StockTableBody
                            data={pageRows}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                            startIndex={startIndex}
                            onAdjust={handleAdjust}
                        />
                    </table>
                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    selectedCount={selectedRows.length}
                    onPageChange={setCurrentPage}
                />

            </div>

            <div className="mt-3 flex justify-end gap-2">
                <button className={`${cls.btn} ${cls.btnGhost}`}>Cancel</button>
                <button className={`${cls.btn} ${cls.btnPrimary}`}>
                    Save Adjustments
                </button>
            </div>
        </div>
    );
};

export default StockAdjust;
