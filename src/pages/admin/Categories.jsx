// src/pages/admin/categories/CategoriesPage.jsx
import React, { useMemo, useState } from "react";
import { cls } from "../../components/admin/addProduct/cls"; // reuse compact classes
import CategoryForm from "../../components/admin/categories/CategoryForm";
import CatTableHeader from "../../components/admin/categories/CatTableHeader";
import CatTableBody from "../../components/admin/categories/CatTableBody";
import CatTableFooter from "../../components/admin/categories/CatTableFooter";

const mockCategories = [
    { id: "CAT001", name: "Electronics", slug: "electronics", parent: "", productCount: 128, status: "active", image: "" },
    { id: "CAT002", name: "Laptops", slug: "laptops", parent: "Electronics", productCount: 42, status: "active", image: "" },
    { id: "CAT003", name: "Accessories", slug: "accessories", parent: "Electronics", productCount: 76, status: "active", image: "" },
    { id: "CAT004", name: "Home & Kitchen", slug: "home-kitchen", parent: "", productCount: 63, status: "hidden", image: "" },
    { id: "CAT005", name: "Audio", slug: "audio", parent: "Electronics", productCount: 35, status: "active", image: "" },
    { id: "CAT006", name: "Gaming", slug: "gaming", parent: "Electronics", productCount: 21, status: "active", image: "" },
];

const columns = [
    { key: "image", label: "Image", sortable: false },
    { key: "slug", label: "Slug", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "parent", label: "Parent", sortable: true },
    { key: "productCount", label: "Products", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "index", label: "#", sortable: false },
    { key: "actions", label: "Actions", sortable: false }
];

const Categories = function () {
    const [data, setData] = useState(mockCategories);
    const [filterText, setFilterText] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const setStatusFor = (id, next) => {
        setData(prev => prev.map(r => (r.id === id ? { ...r, status: next } : r)));
    };
    const toggleStatus = (id) => {
        setData(prev => prev.map(r =>
            r.id === id ? { ...r, status: r.status === "active" ? "hidden" : "active" } : r
        ));
    };

    // bulk helpers (optional)
    const bulkSetStatus = (next) => {
        if (selectedRows.length === 0) return;
        setData(prev => prev.map(r =>
            selectedRows.includes(r.id) ? { ...r, status: next } : r
        ));
    };

    const filteredAndSorted = useMemo(() => {
        let f = data.filter((x) => {
            const q = filterText.toLowerCase();
            return (
                x.name.toLowerCase().includes(q) ||
                x.slug.toLowerCase().includes(q) ||
                (x.parent || "").toLowerCase().includes(q) ||
                String(x.productCount).includes(q) ||
                x.status.toLowerCase().includes(q)
            );
        });
        f.sort((a, b) => {
            const av = (a[sortBy] ?? "").toString().toLowerCase();
            const bv = (b[sortBy] ?? "").toString().toLowerCase();
            if (av < bv) return sortOrder === "asc" ? -1 : 1;
            if (av > bv) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        return f;
    }, [data, filterText, sortBy, sortOrder]);

    const totalRows = filteredAndSorted.length;
    const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
    const startIndex = (currentPage - 1) * rowsPerPage;
    const pageRows = filteredAndSorted.slice(startIndex, startIndex + rowsPerPage);

    const handleSort = (key) => {
        setSortBy(key);
        setSortOrder((prev) => (sortBy === key && prev === "asc" ? "desc" : "asc"));
        setCurrentPage(1);
    };

    const toggleRow = (id) => {
        setSelectedRows((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
    };
    const toggleAll = (e) => {
        if (e.target.checked) setSelectedRows(pageRows.map((r) => r.id));
        else setSelectedRows([]);
    };

    const deleteSingle = (id) => {
        setData((p) => p.filter((r) => r.id !== id));
        setSelectedRows((p) => p.filter((x) => x !== id));
    };
    const deleteSelected = () => {
        setData((p) => p.filter((r) => !selectedRows.includes(r.id)));
        setSelectedRows([]);
    };

    const openCreate = () => { setEditing(null); setDrawerOpen(true); };
    const openEdit = (row) => { setEditing(row); setDrawerOpen(true); };

    const saveCategory = (cat) => {
        setData((prev) => {
            const exists = prev.some((x) => x.id === cat.id);
            return exists ? prev.map((x) => (x.id === cat.id ? cat : x)) : [cat, ...prev];
        });
        setDrawerOpen(false);
    };

    return (
        <div className="p-3">

            <div className="flex items-center justify-between mb-2">
                <span className="text-base font-semibold text-primary-black">Categories</span>
                <div className="flex items-center gap-2">
                    {selectedRows.length > 0 && (
                        <>
                            <button
                                onClick={() => bulkSetStatus("active")}
                                className="px-2.5 py-1.5 rounded text-xs bg-light-variant-eleven border border-neutral-300 text-primary-black"
                            >
                                Mark Active
                            </button>
                            <button
                                onClick={() => bulkSetStatus("hidden")}
                                className="px-2.5 py-1.5 rounded text-xs bg-neutral-100 border border-neutral-300 text-neutral-900"
                            >
                                Mark Hidden
                            </button>


                        </>
                    )}

                </div>
                <div className="flex gap-2">
                    {selectedRows.length > 0 && (
                        <button onClick={deleteSelected} className={`${cls.btn} ${cls.btnGhost} text-danger border-danger`}>
                            Bulk Delete ({selectedRows.length})
                        </button>
                    )}
                    <button onClick={openCreate} className={`${cls.btn} ${cls.btnPrimary}`}>Add Category</button>
                </div>
            </div>

            <div className="bg-neutral-100 rounded border border-neutral-300 shadow-sm w-full">
                {/* Filter + Rows per page */}
                <div className="flex items-center justify-between p-2 border-b border-neutral-300">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="px-2 py-1 border border-black-variant-two text-primary-black bg-primary-white focus:outline-none placeholder:text-neutral-400 rounded-md text-sm"
                    />
                    <select
                        value={rowsPerPage}
                        onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="p-1 border rounded-md text-sm bg-primary-white border-black-variant-two text-primary-black focus:outline-none"
                    >
                        {[10, 50, 100, 1000].map((v) => <option key={v} value={v}>{v} rows</option>)}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <CatTableHeader
                            columns={columns}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            allSelected={selectedRows.length === pageRows.length && pageRows.length > 0}
                            toggleAll={toggleAll}
                        />
                        <CatTableBody
                            data={pageRows}
                            selectedRows={selectedRows}
                            toggleRow={toggleRow}
                            deleteSingle={deleteSingle}
                            startIndex={startIndex}
                            columns={columns}
                            rowsPerPage={rowsPerPage}
                            onToggleStatus={toggleStatus}
                        />
                    </table>
                </div>

                <CatTableFooter
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows}
                    selectedCount={selectedRows.length}
                    onPageChange={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={(v) => { setRowsPerPage(v); setCurrentPage(1); }}
                />
            </div>

            <CategoryForm
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSave={saveCategory}
                initial={editing}
                allCategories={data}
            />
        </div>
    );
}

export default Categories;