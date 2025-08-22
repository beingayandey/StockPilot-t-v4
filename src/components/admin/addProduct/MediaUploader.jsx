import React from "react";
import { cls } from "./cls";

export default function MediaUploader({ dropRef, onDrop, onPick, files, removeFile }) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>Media</h3>
            </div>
            <div className={cls.body}>
                <div
                    ref={dropRef}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    className="border-2 border-dashed border-neutral-300 rounded p-4 text-center bg-primary-white"
                >
                    <p className="text-xs text-neutral-900 mb-2">Drag & drop images here</p>
                    <label className={`${cls.btn} ${cls.btnGhost} inline-block cursor-pointer`}>
                        Choose Files
                        <input type="file" accept="image/*" multiple className="hidden" onChange={onPick} />
                    </label>
                </div>

                {files.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {files.map((f, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={f.url}
                                    alt={`media-${i}`}
                                    className="w-full h-20 object-cover rounded border border-neutral-300"
                                />
                                <button
                                    onClick={() => removeFile(i)}
                                    className="absolute top-1 right-1 px-1.5 py-0.5 text-[11px] rounded bg-danger text-white opacity-0 group-hover:opacity-100 transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
