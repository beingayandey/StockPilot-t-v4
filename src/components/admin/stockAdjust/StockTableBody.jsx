// src/pages/admin/stock-adjust/StockTableBody.jsx
import React, { useState } from "react";
import { cls } from "../addProduct/cls";

const StockTableBody = function ({
    data,
    selectedRows,
    toggleRow,
    startIndex,
    onAdjust,
}) {
    const [changes, setChanges] = useState({});

    const handleChange = (id, field, value) => {
        setChanges((prev) => ({
            ...prev,
            [id]: { ...prev[id], [field]: value },
        }));
    };

    const applyChange = (row) => {
        const c = changes[row.id];
        if (!c || !c.diff) return;
        const diff = parseInt(c.diff, 10) || 0;
        const reason = c.reason || "";
        onAdjust(row.id, diff, reason);
        setChanges((prev) => {
            const copy = { ...prev };
            delete copy[row.id];
            return copy;
        });
    };

    return (
        <tbody>
            {data.map((row, idx) => {
                const c = changes[row.id] || {};
                const diff = parseInt(c.diff, 10) || 0;
                const newStock = row.stock + diff;

                return (
                    <tr
                        key={row.id}
                        className="border-t border-neutral-300 text-xs text-primary-black"
                    >
                        <td className="p-2">
                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => toggleRow(row.id)}
                            />
                        </td>
                        <td className="p-2">{startIndex + idx + 1}</td>
                        <td className="p-2">{row.name}</td>
                        <td className="p-2">{row.slug}</td>
                        <td className="p-2 text-right">{row.stock}</td>
                        <td className="p-2 text-right">
                            <input
                                type="number"
                                value={c.diff || ""}
                                onChange={(e) => handleChange(row.id, "diff", e.target.value)}
                                className={`${cls.input} w-20 text-right`}
                                placeholder="+/-"
                            />
                        </td>
                        <td className="p-2 text-right">{newStock}</td>
                        <td className="p-2">
                            <input
                                type="text"
                                value={c.reason || ""}
                                onChange={(e) => handleChange(row.id, "reason", e.target.value)}
                                className={`${cls.input} w-28`}
                                placeholder="Reason"
                            />
                        </td>
                        <td className="p-2">
                            <button
                                onClick={() => applyChange(row)}
                                className={`${cls.btn} ${cls.btnPrimary}`}
                            >
                                Apply
                            </button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default StockTableBody;
