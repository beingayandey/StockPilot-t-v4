// src/pages/admin/categories/table/CatTableFooter.jsx
import React from "react";

export default function CatTableFooter({
    currentPage, totalPages, totalRows, selectedCount, onPageChange,
    rowsPerPage, setRowsPerPage
}) {
    return (
        <div className="flex items-center justify-between p-2 border-t border-neutral-300">
            <div className="text-xs text-neutral-900">
                {selectedCount} of {totalRows} row(s) selected.
            </div>

            <div className="flex items-center gap-2">
                <span className="text-xs">Show</span>
                <select
                    className="border rounded px-2 py-1 text-xs bg-primary-white border-black-variant-two text-primary-black"
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                    {[10, 50, 100, 1000].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
                <span className="text-xs">entries</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    className="px-2.5 py-1 text-xs border border-neutral-300 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(1)}
                >First</button>
                <button
                    className="px-2.5 py-1 text-xs border border-neutral-300 rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >Prev</button>
                <span className="text-xs px-1">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-2.5 py-1 text-xs border border-neutral-300 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >Next</button>
                <button
                    className="px-2.5 py-1 text-xs border border-neutral-300 rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(totalPages)}
                >Last</button>
            </div>
        </div>
    );
}
