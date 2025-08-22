import React from "react";
import { cls } from "./cls";

export default function SeoCard({ metaTitle, setMetaTitle, metaDescription, setMetaDescription }) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>SEO (Optional)</h3>
            </div>
            <div className={cls.body}>
                <div>
                    <label className={cls.label}>Meta Title</label>
                    <input
                        className={cls.input}
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="If empty, uses product name"
                    />
                </div>
                <div>
                    <label className={cls.label}>Meta Description</label>
                    <textarea
                        rows={3}
                        className={cls.textarea}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Short SEO description..."
                    />
                </div>
            </div>
        </div>
    );
}
