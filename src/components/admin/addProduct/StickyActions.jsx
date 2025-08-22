import React from "react";
import { cls } from "./cls";

export default function StickyActions({ onReset, onSaveDraft, onPublish }) {
    return (
        <div className="sticky bottom-0 left-0 right-0 mt-3 bg-primary-white/80 backdrop-blur border-t border-neutral-300 p-2 flex justify-end gap-2">
            <button onClick={onReset} className={`${cls.btn} ${cls.btnGhost}`}>Reset</button>
            <button onClick={onSaveDraft} className={`${cls.btn} ${cls.btnGhost}`}>Save Draft</button>
            <button onClick={onPublish} className={`${cls.btn} ${cls.btnPrimary}`}>Publish</button>
        </div>
    );
}
