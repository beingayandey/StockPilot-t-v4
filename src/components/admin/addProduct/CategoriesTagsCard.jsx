import React from "react";
import { cls } from "./cls";

export default function CategoriesTagsCard({
    categories, categoryInput, setCategoryInput, addCategory, removeCategory,
    tags, tagsInput, setTagsInput, onTagsBlur, removeTag
}) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>Categories & Tags</h3>
            </div>
            <div className={cls.body}>
                <div>
                    <label className={cls.label}>Add Category</label>
                    <div className="flex gap-2">
                        <input
                            className={cls.input}
                            value={categoryInput}
                            onChange={(e) => setCategoryInput(e.target.value)}
                            placeholder="e.g., Electronics"
                        />
                        <button onClick={addCategory} className={`${cls.btn} ${cls.btnGhost}`}>Add</button>
                    </div>
                    {categories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {categories.map((c) => (
                                <span key={c} className={`${cls.chip} flex items-center gap-1`}>
                                    {c}
                                    <button className="text-danger" onClick={() => removeCategory(c)}>×</button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <label className={cls.label}>Tags (comma separated)</label>
                    <input
                        className={cls.input}
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        onBlur={onTagsBlur}
                        placeholder="e.g., keyboard, mechanical, rgb"
                    />
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {tags.map((t) => (
                                <span key={t} className={`${cls.chip} flex items-center gap-1`}>
                                    {t}
                                    <button className="text-danger" onClick={() => removeTag(t)}>×</button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
