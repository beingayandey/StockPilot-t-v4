// src/components/common/TableFilter.jsx
import React from "react";

const TableFilter = ({ filterText, setFilterText, rowsPerPage, setRowsPerPage, placeholder = "Search..." }) => {
    return (
        <div className="flex items-center gap-5 justify-between p-2 border-b border-neutral-300">
            {/* Search Box */}
            <input
                type="text"
                placeholder={placeholder}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="px-2 py-1 border border-black-variant-two text-primary-black bg-primary-white 
                   focus:outline-none placeholder:text-neutral-400 rounded-md text-sm"
            />

            {/* Rows per page */}
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
    );
};

export default TableFilter;
