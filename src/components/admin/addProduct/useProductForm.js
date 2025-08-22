import { useMemo, useRef, useState } from "react";

const slugify = (s) =>
    s.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

export function useProductForm() {
    const [name, setName] = useState("");
    const slug = useMemo(() => slugify(name), [name]);

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [compareAt, setCompareAt] = useState("");
    const [discountPct, setDiscountPct] = useState("");
    const [stock, setStock] = useState(0);

    const stepStock = (d) => setStock((s) => Math.max(0, (Number(s) || 0) + d));
    const setStockSafe = (v) => setStock(() => Math.max(0, Math.floor(Number(v) || 0)));

    const [categories, setCategories] = useState([]);
    const [categoryInput, setCategoryInput] = useState("");
    const addCategory = () => {
        const v = categoryInput.trim();
        if (!v) return;
        if (!categories.includes(v)) setCategories((p) => [...p, v]);
        setCategoryInput("");
    };
    const removeCategory = (v) => setCategories((p) => p.filter((c) => c !== v));

    const [tags, setTags] = useState([]);
    const [tagsInput, setTagsInput] = useState("");
    const onTagsBlur = () => {
        if (!tagsInput.trim()) return;
        const parts = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
        const merged = Array.from(new Set([...tags, ...parts]));
        setTags(merged);
        setTagsInput("");
    };
    const removeTag = (t) => setTags((p) => p.filter((x) => x !== t));

    const [status, setStatus] = useState("draft");
    const [visibility, setVisibility] = useState("public");
    const [scheduleAt, setScheduleAt] = useState("");

    const [files, setFiles] = useState([]);         // { file, url }
    const dropRef = useRef(null);
    const addFiles = (fl) => {
        const mapped = fl.map((f) => ({ file: f, url: URL.createObjectURL(f) }));
        setFiles((prev) => [...prev, ...mapped]);
    };
    const onDrop = (e) => { e.preventDefault(); addFiles(Array.from(e.dataTransfer.files || [])); };
    const onPick = (e) => addFiles(Array.from(e.target.files || []));
    const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

    const finalPrice = useMemo(() => {
        const p = parseFloat(price) || 0;
        const ca = parseFloat(compareAt) || 0;
        if (discountPct !== "" && !isNaN(discountPct)) {
            const d = Math.max(0, Math.min(100, Number(discountPct)));
            return +(p * (1 - d / 100)).toFixed(2);
        }
        if (ca > p && ca > 0) return p;
        return p;
    }, [price, compareAt, discountPct]);

    // dummy actions (UI only)
    const onSaveDraft = () => { };
    const onPublish = () => { };
    const onReset = () => {
        setName(""); setDescription(""); setPrice(""); setCompareAt(""); setDiscountPct("");
        setStock(0); setCategories([]); setTags([]); setFiles([]);
        setStatus("draft"); setVisibility("public"); setScheduleAt("");
    };

    return {
        // state
        name, slug, description, price, compareAt, discountPct, finalPrice,
        stock, categories, categoryInput, tags, tagsInput,
        status, visibility, scheduleAt, files, dropRef,

        // setters / handlers
        setName, setDescription, setPrice, setCompareAt, setDiscountPct,
        stepStock, setStockSafe,
        setCategoryInput, addCategory, removeCategory,
        setTagsInput, onTagsBlur, removeTag,
        setStatus, setVisibility, setScheduleAt,
        onDrop, onPick, removeFile,

        // actions (UI-only)
        onSaveDraft, onPublish, onReset,
    };
}
