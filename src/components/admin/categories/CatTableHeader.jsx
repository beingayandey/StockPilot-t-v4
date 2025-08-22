// src/pages/admin/categories/table/CatTableHeader.jsx
import React from "react";
import { CaretUp, CaretDown } from "@phosphor-icons/react";

export default function CatTableHeader({
    columns, sortBy, sortOrder, onSort, allSelected, toggleAll
}) {
    return (
        <thead className="bg-neutral-100">
            <tr>
                <th className="px-2 py-2">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="rounded border-neutral-300" />
                </th>
                {columns.map((col) => (
                    <th key={col.key} className="px-2 py-2 text-left text-sm font-semibold text-primary-black">
                        {col.sortable ? (
                            <button onClick={() => onSort(col.key)} className="flex items-center gap-1 hover:text-neutral-900">
                                {col.label}
                                {sortBy === col.key && (sortOrder === "asc" ? <CaretUp size={14} /> : <CaretDown size={14} />)}
                            </button>
                        ) : col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}
