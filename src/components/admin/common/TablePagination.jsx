// src/components/common/TablePagination.jsx
import React from "react";

const TablePagination = ({ currentPage, totalPages, totalRows, selectedCount, onPageChange }) => {
    return (
        <div className="flex items-center justify-between p-1 border-t border-neutral-300">
            <div className="text-sm text-neutral-900">
                {selectedCount} of {totalRows} row(s) selected.
            </div>
            <div className="flex items-center gap-2">
                <button
                    className="px-3 py-2 text-sm border border-neutral-300 text-primary-black bg-primary-white rounded disabled:opacity-50"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="text-sm text-neutral-900">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-3 py-2 text-sm border border-neutral-300 text-primary-black bg-primary-white rounded disabled:opacity-50"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TablePagination;
