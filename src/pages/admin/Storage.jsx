// src/components/storage/Storage.jsx
import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock storage files (replace with Firebase Storage later)
const mockFiles = Array.from({ length: 25 }, (_, i) => ({
    id: `FILE${i + 1}`,
    name: `product_image_${i + 1}.jpg`,
    type: "image/jpeg",
    size: `${Math.floor(Math.random() * 200 + 50)} KB`,
    uploadedAt: new Date(Date.now() - i * 86400000)
        .toISOString()
        .split("T")[0],
}));

const Storage = () => {
    const [files, setFiles] = useState(mockFiles);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return files.filter(
            (f) =>
                f.id.toLowerCase().includes(q) ||
                f.name.toLowerCase().includes(q) ||
                f.type.toLowerCase().includes(q)
        );
    }, [filterText, files]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    const handleDelete = (fileId) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            setFiles((prev) => prev.filter((f) => f.id !== fileId));
            console.log("Deleted file:", fileId);
        }
    };

    const handleUpload = (e) => {
        const newFiles = Array.from(e.target.files).map((file, i) => ({
            id: `FILE_NEW_${Date.now()}_${i}`,
            name: file.name,
            type: file.type,
            size: `${Math.floor(file.size / 1024)} KB`,
            uploadedAt: new Date().toISOString().split("T")[0],
        }));
        setFiles((prev) => [...newFiles, ...prev]);
        e.target.value = null;
        console.log("Uploaded files:", newFiles);
    };

    return (
        <div className={`${cls.card} mt-2`}>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-300 p-2">
                <input
                    type="file"
                    multiple
                    onChange={handleUpload}
                    className="px-2 py-1 border rounded-md text-sm bg-primary-white border-black-variant-two text-primary-black cursor-pointer"
                />
            </div>

            <TableFilter
                filterText={filterText}
                setFilterText={(v) => {
                    setFilterText(v);
                    setCurrentPage(1);
                }}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={(n) => {
                    setRowsPerPage(n);
                    setCurrentPage(1);
                }}
                placeholder="Search files..."
            />

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-neutral-100">
                        <tr>
                            <th className={cls.th}>
                                File ID
                            </th>
                            <th className={cls.th}>
                                Name
                            </th>
                            <th className={cls.th}>
                                Type
                            </th>
                            <th className={cls.th}>
                                Size
                            </th>
                            <th className={cls.th}>
                                Uploaded At
                            </th>
                            <th className={cls.th}>
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-300">
                        {pageRows.map((f) => (
                            <tr key={f.id} className="hover:bg-primary-white">
                                <td className="px-4 py-2 text-sm text-primary-black">{f.id}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{f.name}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{f.type}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{f.size}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{f.uploadedAt}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(f.id)}
                                        className={`${cls.btn} ${cls.btnRed}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pageRows.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-neutral-700">
                                    No files found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRows={filtered.length}
                selectedCount={0}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Storage;
