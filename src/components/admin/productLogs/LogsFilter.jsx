// src/components/productLogs/LogsFilter.jsx
import React from "react";
import { cls } from "../addProduct/cls";

const LogsFilter = ({
    filterText,
    setFilterText,
    rowsPerPage,
    setRowsPerPage,
    setCurrentPage,
}) => {
    return (
        <div className="flex items-center justify-between gap-2 p-2 border-b border-neutral-300">
            <div className="w-[30%] min-w-50">
                <input
                    type="text"
                    placeholder="Search logs..."
                    value={filterText}
                    onChange={(e) => {
                        setFilterText(e.target.value);
                        setCurrentPage(1); // filter করলে প্রথম পেজে reset
                    }}
                    className={`${cls.input} flex-1`}
                />
            </div>
            <div className="w-30">
                <select
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                    className={`${cls.select} w-24`}
                >
                    {[10, 25, 50, 100].map((v) => (
                        <option key={v} value={v}>
                            {v} rows
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LogsFilter;
