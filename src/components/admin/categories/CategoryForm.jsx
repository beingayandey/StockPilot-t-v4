// src/pages/admin/categories/form/CategoryForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import { cls } from "../../admin/addProduct/cls";
import { slugify } from "./slugify";

export default function CategoryForm({
    open, onClose, onSave, initial, allCategories
}) {
    const [name, setName] = useState("");
    const slug = useMemo(() => slugify(name), [name]);
    const [parent, setParent] = useState("");
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("active"); // active | hidden
    const [desc, setDesc] = useState("");

    useEffect(() => {
        if (open) {
            setName(initial?.name || "");
            setParent(initial?.parent || "");
            setImage(initial?.image || "");
            setStatus(initial?.status || "active");
            setDesc(initial?.desc || "");
        }
    }, [open, initial]);

    const handleSubmit = () => {
        if (!name.trim()) return;
        onSave({
            id: initial?.id || `CAT_${Date.now()}`,
            name: name.trim(),
            slug,
            parent: parent || "",
            image,
            status,
            desc,
            productCount: initial?.productCount || 0,
            createdAt: initial?.createdAt || Date.now(),
        });
    };

    return (
        <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
            {/* backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/20 transition ${open ? "opacity-100" : "opacity-0"}`}
            />
            {/* drawer */}
            <div
                className={`absolute right-0 top-0 h-full w-full max-w-md bg-primary-white border-l border-neutral-300 shadow-xl
          transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="p-2 border-b border-neutral-300 flex items-center justify-between">
                    <h3 className="text-[13px] font-semibold text-primary-black">
                        {initial ? "Edit Category" : "Add Category"}
                    </h3>
                    <button onClick={onClose} className={`${cls.btn} ${cls.btnGhost}`}>Close</button>
                </div>

                <div className="p-2 space-y-2">
                    <div>
                        <label className={cls.label}>Name *</label>
                        <input className={cls.input} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label className={cls.label}>Slug</label>
                        <input className={`${cls.input} opacity-90`} value={slug} readOnly />
                    </div>

                    <div>
                        <label className={cls.label}>Parent</label>
                        <select
                            className={cls.select}
                            value={parent}
                            onChange={(e) => setParent(e.target.value)}
                        >
                            <option value="">— None —</option>
                            {allCategories
                                .filter((c) => !initial || c.id !== initial.id)
                                .map((c) => (
                                    <option key={c.id} value={c.name}>{c.name}</option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className={cls.label}>Image URL (optional)</label>
                        <input
                            className={cls.input}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://..."
                        />
                        {image && (
                            <div className="mt-2">
                                <img src={image} alt="preview" className="w-16 h-16 rounded object-cover border border-neutral-300" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={cls.label}>Status</label>
                        <select className={cls.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="active">Active</option>
                            <option value="hidden">Hidden</option>
                        </select>
                    </div>

                    <div>
                        <label className={cls.label}>Description</label>
                        <textarea
                            rows={3}
                            className={cls.textarea}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            placeholder="Optional short description"
                        />
                    </div>
                </div>

                <div className="p-2 border-t border-neutral-300 flex justify-end gap-2">
                    <button onClick={onClose} className={`${cls.btn} ${cls.btnGhost}`}>Cancel</button>
                    <button onClick={handleSubmit} className={`${cls.btn} ${cls.btnPrimary}`}>
                        {initial ? "Update" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    );
}
