import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

const initialRoles = [
    { id: 1, role: "Admin", users: 3, status: "Active", createdAt: "2025-01-15" },
    { id: 2, role: "Manager", users: 5, status: "Active", createdAt: "2025-02-01" },
    { id: 3, role: "Staff", users: 12, status: "Inactive", createdAt: "2025-03-10" },
    { id: 4, role: "Support", users: 7, status: "Active", createdAt: "2025-05-05" },
    { id: 5, role: "Auditor", users: 2, status: "Inactive", createdAt: "2025-06-21" },
];

const pillCls = (s) => {
    switch (s) {
        case "Active":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-green-700 bg-green-50 ring-green-600/20";
        case "Inactive":
            return "inline-flex items-center px-2 py-1.5 rounded-md text-[11px] font-medium ring-1 ring-inset text-red-700 bg-red-50 ring-red-600/20";
        default:
            return "";
    }
};

const Roles = () => {
    const [roles, setRoles] = useState(initialRoles);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModal, setShowModal] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [formData, setFormData] = useState({ role: "", status: "Active" });

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return roles.filter(
            (r) =>
                r.role.toLowerCase().includes(q) ||
                r.status.toLowerCase().includes(q) ||
                r.createdAt.includes(q)
        );
    }, [filterText, roles]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    const handleSave = () => {
        if (editingRole) {
            // update
            setRoles((prev) =>
                prev.map((r) =>
                    r.id === editingRole.id
                        ? { ...r, role: formData.role, status: formData.status }
                        : r
                )
            );
        } else {
            // create
            const newRole = {
                id: roles.length + 1,
                role: formData.role,
                users: 0,
                status: formData.status,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setRoles((prev) => [...prev, newRole]);
        }
        setShowModal(false);
        setEditingRole(null);
        setFormData({ role: "", status: "Active" });
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this role?")) {
            setRoles((prev) => prev.filter((r) => r.id !== id));
        }
    };

    return (
        <div className="p-3">
            <span className="text-base font-semibold text-primary-black">Payments</span>
            <div className={`${cls.card} mt-2`}>
                {/* Header filter */}
                <div className="flex items-center justify-between border-b border-neutral-300 px-4 py-3">
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
                        placeholder="Search roles..."
                    />

                    <button
                        onClick={() => {
                            setEditingRole(null);
                            setFormData({ role: "", status: "Active" });
                            setShowModal(true);
                        }}
                        className={`${cls.btn} ${cls.btnPrimary}`}
                    >
                        + Add Role
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-neutral-100">
                            <tr>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Role</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Assigned Users</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Status</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Created At</th>
                                <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-300">
                            {pageRows.map((r) => (
                                <tr key={r.id} className="hover:bg-primary-white">
                                    <td className="px-4 py-2 text-sm text-primary-black">{r.role}</td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{r.users}</td>
                                    <td className="px-4 py-2">
                                        <span className={pillCls(r.status)}>{r.status}</span>
                                    </td>
                                    <td className="px-4 py-2 text-sm text-primary-black">{r.createdAt}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => {
                                                setEditingRole(r);
                                                setFormData({ role: r.role, status: r.status });
                                                setShowModal(true);
                                            }}
                                            className={`${cls.btn} ${cls.btnPrimary} mr-2`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className={`${cls.btn} ${cls.btnDanger}`}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {pageRows.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-neutral-700">
                                        No roles found
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

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white rounded-sm shadow-lg w-96 p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                {editingRole ? "Edit Role" : "Add Role"}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Role Name</label>
                                    <input
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) =>
                                            setFormData({ ...formData, role: e.target.value })
                                        }
                                        className="w-full border border-neutral-300 rounded px-3 py-2 mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) =>
                                            setFormData({ ...formData, status: e.target.value })
                                        }
                                        className="w-full border border-neutral-300 rounded px-3 py-2 mt-1"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className={`${cls.btn} ${cls.btnSecondary}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className={`${cls.btn} ${cls.btnPrimary}`}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default Roles;
