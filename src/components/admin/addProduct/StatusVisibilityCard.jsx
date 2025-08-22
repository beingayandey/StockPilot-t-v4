import React from "react";
import { cls } from "./cls";

export default function StatusVisibilityCard({
    status, setStatus, visibility, setVisibility, scheduleAt, setScheduleAt
}) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>Status & Visibility</h3>
            </div>
            <div className={cls.body}>
                <div>
                    <label className={cls.label}>Status</label>
                    <select className={cls.select} value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>
                <div>
                    <label className={cls.label}>Visibility</label>
                    <select className={cls.select} value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <div>
                    <label className={cls.label}>Schedule (optional)</label>
                    <input
                        type="datetime-local"
                        className={cls.input}
                        value={scheduleAt}
                        onChange={(e) => setScheduleAt(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
