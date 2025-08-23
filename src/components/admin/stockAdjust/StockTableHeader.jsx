// src/pages/admin/stock-adjust/StockTableHeader.jsx
import React from "react";

const StockTableHeader = function ({ allSelected, toggleAll }) {
    return (
        <thead className="bg-neutral-200">
            <tr className="text-left text-xs text-primary-black">
                <th className="p-2">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                </th>
                <th className="p-2">#</th>
                <th className="p-2">Product</th>
                <th className="p-2">Slug</th>
                <th className="p-2 text-right">Current Stock</th>
                <th className="p-2 text-right">Adjust (+/-)</th>
                <th className="p-2 text-right">New Stock</th>
                <th className="p-2">Reason</th>
                <th className="p-2">Actions</th>
            </tr>
        </thead>
    );
};

export default StockTableHeader;
