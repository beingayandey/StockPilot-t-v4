// src/components/users/AllUsers.jsx
import React, { useMemo, useState } from "react";
import TableFilter from "../../components/admin/common/TableFilter";
import TablePagination from "../../components/admin/common/TablePagination";
import { cls } from "../../components/admin/addProduct/cls";

// ✅ Mock Roles (Later replace with Firestore roles collection)
const mockRoles = ["Admin", "Manager", "Customer", "Support"];

const mockUsers = Array.from({ length: 40 }, (_, i) => ({
    id: `USR10${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : "Customer",
    status: i % 2 === 0 ? "Active" : "Inactive",
    createdAt: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

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

const AllUsers = () => {
    const [users, setUsers] = useState(mockUsers);
    const [filterText, setFilterText] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = useMemo(() => {
        const q = filterText.toLowerCase();
        return users.filter(
            (u) =>
                u.id.toLowerCase().includes(q) ||
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.role.toLowerCase().includes(q) ||
                u.status.toLowerCase().includes(q)
        );
    }, [filterText, users]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const start = (currentPage - 1) * rowsPerPage;
    const pageRows = filtered.slice(start, start + rowsPerPage);

    // ✅ Handle role change
    const handleRoleChange = (userId, newRole) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        console.log(`Role for ${userId} updated to ${newRole}`);
    };

    return (
        <>
            <div className="p-3">
                <span className="text-base font-semibold text-primary-black">All Users</span>

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
                            placeholder="Search users..."
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-100">
                                <tr>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                        User ID
                                    </th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                        Name
                                    </th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                        Email
                                    </th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                        Role
                                    </th>
                                    <th className="px-4 py-2 text-xs font-semibold text-primary-black border-b border-neutral-300">
                                        Status
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
                                {pageRows.map((u) => (
                                    <tr key={u.id} className="hover:bg-primary-white">
                                        <td className="px-4 py-2 text-sm text-primary-black">{u.id}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{u.name}</td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{u.email}</td>

                                        {/* ✅ Role dropdown */}
                                        <td className="px-4 py-2 text-sm text-primary-black">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                                className="border border-neutral-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-black"
                                            >
                                                {mockRoles.map((r) => (
                                                    <option key={r} value={r}>
                                                        {r}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>

                                        <td className="px-4 py-2">
                                            <span className={pillCls(u.status)}>{u.status}</span>
                                        </td>
                                        <td className="px-4 py-2 text-sm text-primary-black">{u.createdAt}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => console.log("View user:", u)}
                                                className={`${cls.btn} ${cls.btnPrimary}`}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {pageRows.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="px-4 py-6 text-center text-neutral-700"
                                        >
                                            No users found
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
            </div>
        </ >

    );
};

export default AllUsers;
