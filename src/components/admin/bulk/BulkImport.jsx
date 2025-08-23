import React from "react";
import { cls } from "../addProduct/cls";


const BulkImport = ({ file, onFileChange, previewData }) => {
    return (
        <div className="p-3">
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    accept=".csv,.xlsx"
                    onChange={onFileChange}
                    className={cls.input}
                />
                <a
                    href="/sample-template.csv"
                    download
                    className={`${cls.btn} ${cls.btnGhost}`}
                >
                    Download Template
                </a>
            </div>

            {file && (
                <div className="mt-3">
                    <p className="text-sm text-neutral-600 mb-1">
                        Preview from <b>{file.name}</b>
                    </p>
                    <div className="overflow-x-auto border rounded">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-200 text-left">
                                <tr>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {previewData.map((row) => (
                                    <tr key={row.id} className="border-t">
                                        <td className="p-2">{row.id}</td>
                                        <td className="p-2">{row.name}</td>
                                        <td className="p-2">{row.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button className={`${cls.btn} ${cls.btnPrimary} mt-3`}>
                        Confirm Import
                    </button>
                </div>
            )}
        </div>
    );
};

export default BulkImport;
