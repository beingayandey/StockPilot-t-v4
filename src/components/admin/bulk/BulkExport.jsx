import React from "react";
import { cls } from "../addProduct/cls";

const BulkExport = () => {
    const handleExport = (type) => {
        // TODO: fetch real data & export CSV/XLSX
        alert(`Exporting as ${type}`);
    };

    return (
        <div className="p-3 flex flex-col gap-2">
            <button
                onClick={() => handleExport("CSV")}
                className={`${cls.btn} ${cls.btnPrimary}`}
            >
                Export Products (CSV)
            </button>
            <button
                onClick={() => handleExport("XLSX")}
                className={`${cls.btn} ${cls.btnPrimary}`}
            >
                Export Products (XLSX)
            </button>
            <button
                onClick={() => handleExport("Stock CSV")}
                className={`${cls.btn} ${cls.btnGhost}`}
            >
                Export Stock Report
            </button>
        </div>
    );
};

export default BulkExport;
