// src/components/tools/backupExport/BackupExport.jsx
import React, { useState, useMemo } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// Mock backup types
const backupTypes = ["Full", "Users", "Orders"];

// Mock initial backups
const mockBackups = Array.from({ length: 8 }, (_, i) => ({
    id: `BKP00${i + 1}`,
    name: `Backup_${i + 1}`,
    type: backupTypes[i % 3],
    createdAt: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

const BackupExport = () => {
    const [backups, setBackups] = useState(mockBackups);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [backupName, setBackupName] = useState("");
    const [backupType, setBackupType] = useState("Full");

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return backups.filter(
            (b) =>
                b.id.toLowerCase().includes(q) ||
                b.name.toLowerCase().includes(q) ||
                b.type.toLowerCase().includes(q)
        );
    }, [filterText, backups]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    const handleCreateBackup = () => {
        const newBackup = {
            id: `BKP${String(backups.length + 1).padStart(3, "0")}`,
            name: backupName || `Backup_${backups.length + 1}`,
            type: backupType,
            createdAt: new Date().toISOString().split("T")[0],
        };
        setBackups((prev) => [newBackup, ...prev]);
        setShowModal(false);
        setBackupName("");
        setBackupType("Full");
        console.log("Backup created:", newBackup);
    };

    const handleDeleteBackup = (id) => {
        setBackups((prev) => prev.filter((b) => b.id !== id));
    };

    return (
        <div className={`${cls.card} mt-2`}>
            <div className="flex justify-between items-center p-2 border-b border-neutral-300">
                <h2 className="text-lg font-semibold text-primary-black">Backup / Export</h2>
                <button
                    className={`${cls.btn} ${cls.btnPrimary}`}
                    onClick={() => setShowModal(true)}
                >
                    Take Backup
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white rounded-md p-6 w-[300px]">
                        <h3 className="text-lg font-semibold mb-4">Create Backup</h3>
                        <input
                            type="text"
                            placeholder="Backup Name"
                            value={backupName}
                            onChange={(e) => setBackupName(e.target.value)}
                            className="w-full border border-neutral-300 rounded-md px-2 py-1 mb-3 focus:outline-none focus:ring-2 focus:ring-primary-black"
                        />
                        <select
                            value={backupType}
                            onChange={(e) => setBackupType(e.target.value)}
                            className="w-full border border-neutral-300 rounded-md px-2 py-1 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-black"
                        >
                            {backupTypes.map((t) => (
                                <option key={t} value={t}>
                                    {t} Backup
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end gap-2">
                            <button
                                className={`${cls.btn} ${cls.btnSecondary}`}
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button className={`${cls.btn} ${cls.btnPrimary}`} onClick={handleCreateBackup}>
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filter */}
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
                placeholder="Search backups..."
            />

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-neutral-100">
                        <tr>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                Backup ID
                            </th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                Name
                            </th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                Type
                            </th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                Created At
                            </th>
                            <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-300">
                        {pageRows.map((b) => (
                            <tr key={b.id} className="hover:bg-primary-white">
                                <td className="px-4 py-2 text-sm text-primary-black">{b.id}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{b.name}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{b.type}</td>
                                <td className="px-4 py-2 text-sm text-primary-black">{b.createdAt}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className={`${cls.btn} ${cls.btnPrimary}`}
                                        onClick={() => console.log("Download backup:", b)}
                                    >
                                        Download
                                    </button>
                                    <button
                                        className={`${cls.btn} ${cls.btnSecondary}`}
                                        onClick={() => handleDeleteBackup(b.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pageRows.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-neutral-700">
                                    No backups found
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

export default BackupExport;