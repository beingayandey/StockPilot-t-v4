import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

const mockRoles = [
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
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return mockRoles.filter(
            (r) =>
                r.role.toLowerCase().includes(q) ||
                r.status.toLowerCase().includes(q) ||
                r.createdAt.includes(q)
        );
    }, [filterText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    return (
        <div className={`${cls.card} mt-2`}>
            {/* Header filter */}
            <div className="border-b border-neutral-300">
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
            </div>

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
                                        onClick={() => console.log("Edit role:", r)}
                                        className={`${cls.btn} ${cls.btnPrimary} mr-2`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => console.log("Delete role:", r)}
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
        </div>
    );
};

export default Roles;
