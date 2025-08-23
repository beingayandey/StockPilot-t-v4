// src/pages/admin/categories/table/CatTableBody.jsx
import React from "react";

export default function CatTableBody({
    data, selectedRows, toggleRow, deleteSingle, startIndex, columns, rowsPerPage
}) {
    const pad = Math.max(rowsPerPage - data.length, 0);
    const colSpan = columns.length + 1; // + checkbox column

    const pillCls = (s) =>
        s === "active"
            ? "text-green-700 bg-green-50 ring-green-600/20"
            : "text-neutral-700 bg-neutral-100 ring-neutral-600/20";


    return (
        <tbody className="divide-y divide-gray-200">
            {data.map((row, i) => (
                <tr key={row.id} className="hover:bg-primary-white">
                    <td className="px-2 py-1.5">
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRow(row.id)}
                            className="rounded border-neutral-300"
                        />
                    </td>

                    <td className="px-2 py-1.5">
                        {row.image ? (
                            <img src={row.image} alt={row.name} className="w-9 h-9 rounded object-cover border border-neutral-300" />
                        ) : (
                            <div className="w-9 h-9 rounded bg-light-variant-eleven border border-neutral-300 grid place-items-center text-[10px] text-neutral-700">
                                IMG
                            </div>
                        )}
                    </td>

                    <td className="px-2 py-1.5 text-xs font-medium  text-black-variant-one">{row.slug}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">{row.name}</td>
                    <td className="px-2 py-1.5 text-sm text-primary-black">{row.parent || "—"}</td>
                    <td className="px-2 py-1.5 text-sm">{row.productCount}</td>
                    <td className="px-2 py-1.5">
                        <button
                            onClick={() => onToggleStatus(row.id)}
                            className={`inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset ${pillCls(row.status)}`}
                            aria-label={`Toggle status for ${row.name}`}
                        >
                            {row.status === "active" ? "Active" : "Hidden"}
                        </button>
                    </td>
                    <td className="px-2 py-1.5 text-xs text-neutral-700">
                        #{startIndex + i + 1}
                    </td>
                    <td className="px-2 py-1.5">
                        <button onClick={() => deleteSingle(row.id)} className="text-red-600 hover:underline text-xs">
                            Delete
                        </button>
                    </td>
                </tr>
            ))}


        </tbody>
    );
}
