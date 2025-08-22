import React from "react";
import { cls } from "./cls";

export default function ProductInfoCard({ name, setName, slug, description, setDescription }) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>Product Info</h3>
            </div>
            <div className={cls.body}>
                <div>
                    <label className={cls.label}>Product Name *</label>
                    <input
                        className={cls.input}
                        placeholder="e.g., Mechanical Keyboard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className={cls.label}>Slug</label>
                    <input className={`${cls.input} opacity-90`} value={slug} readOnly />
                    <p className="text-[11px] text-neutral-700 mt-1">Auto-generated from name</p>
                </div>

                <div>
                    <label className={cls.label}>Description</label>
                    <textarea
                        rows={4}
                        className={cls.textarea}
                        placeholder="Short & clear description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
