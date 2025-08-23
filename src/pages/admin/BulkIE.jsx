// src/pages/admin/BulkIE.jsx
import React, { useState } from "react";
import { cls } from "../../components/admin/addProduct/cls";
import BulkImport from "../../components/admin/bulk/BulkImport";
import BulkExport from "../../components/admin/bulk/BulkExport";

const BulkIE = function () {
    const [file, setFile] = useState(null);
    const [previewData, setPreviewData] = useState([]);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (f) {
            setFile(f);
            // TODO: parse CSV/XLSX with PapaParse or SheetJS
            setPreviewData([
                { id: "P001", name: "Laptop Pro", stock: 12 },
                { id: "P002", name: "Mouse", stock: 5 },
            ]);
        }
    };

    return (
        <div className="p-3">
            <h1 className="text-base font-semibold text-primary-black mb-3">
                Bulk Import / Export
            </h1>

            {/* Import Section */}
            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm mb-4">
                <div className="p-3 border-b border-neutral-300 font-medium text-sm">
                    Import Products
                </div>
                <BulkImport
                    file={file}
                    onFileChange={handleFileChange}
                    previewData={previewData}
                />
            </div>

            {/* Export Section */}
            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm">
                <div className="p-3 border-b border-neutral-300 font-medium text-sm">
                    Export Data
                </div>
                <BulkExport />
            </div>
        </div>
    );
};

export default BulkIE;
