import React from "react";
import { cls } from "./cls";

export default function PricingInventoryCard({
    price, setPrice, compareAt, setCompareAt, discountPct, setDiscountPct,
    finalPrice, stock, stepStock, setStockSafe
}) {
    return (
        <div className={cls.card}>
            <div className={cls.cardHeader}>
                <h3 className={cls.sectionTitle}>Pricing & Inventory</h3>
            </div>
            <div className={cls.body}>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className={cls.label}>Price *</label>
                        <input
                            type="number" min={0}
                            className={cls.input}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                    <div>
                        <label className={cls.label}>Compare at</label>
                        <input
                            type="number" min={0}
                            className={cls.input}
                            value={compareAt}
                            onChange={(e) => setCompareAt(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div>
                    <label className={cls.label}>Discount % (optional)</label>
                    <input
                        type="number" min={0} max={100}
                        className={cls.input}
                        value={discountPct}
                        onChange={(e) => setDiscountPct(e.target.value)}
                        placeholder="e.g., 10"
                    />
                    <p className="text-[11px] text-neutral-700 mt-1">
                        Final price: <span className="font-semibold">₹{finalPrice}</span>
                    </p>
                </div>

                <div>
                    <label className={cls.label}>Stock</label>
                    <div className="inline-flex items-center gap-1">
                        <button
                            onClick={() => stepStock(-1)}
                            className="h-7 w-7 grid place-items-center rounded border border-neutral-300 bg-primary-white text-neutral-900"
                        >−</button>
                        <input
                            type="number" min={0}
                            className={`${cls.input} w-20 text-center`}
                            value={stock}
                            onChange={(e) => setStockSafe(e.target.value)}
                        />
                        <button
                            onClick={() => stepStock(+1)}
                            className="h-7 w-7 grid place-items-center rounded border border-neutral-300 bg-primary-white text-neutral-900"
                        >+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
