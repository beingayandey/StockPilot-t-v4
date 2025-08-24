// src/components/settings/paymentsTaxes/PaymentsTaxes.jsx
import React, { useState } from "react";
import { cls } from "../../components/admin/addProduct/cls";

const PaymentsTaxes = () => {
    const [taxRate, setTaxRate] = useState(18);
    const [currency, setCurrency] = useState("INR");
    const [paymentMethods, setPaymentMethods] = useState({
        paypal: true,
        stripe: false,
        razorpay: true,
    });

    const handleSave = () => {
        console.log("Saved payments settings:", { taxRate, currency, paymentMethods });
    };

    return (
        <div className={`${cls.card} mt-2 p-4`}>
            <h2 className="text-lg font-semibold mb-4 text-primary-black">Payments & Taxes</h2>

            <div className="space-y-4">
                {/* Tax Rate */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Tax Rate (%)</label>
                    <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    />
                </div>

                {/* Currency */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Currency</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    />
                </div>

                {/* Payment Methods */}
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Payment Methods</label>
                    <div className="flex flex-col gap-1">
                        {Object.keys(paymentMethods).map((method) => (
                            <label key={method} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={paymentMethods[method]}
                                    onChange={(e) =>
                                        setPaymentMethods((prev) => ({
                                            ...prev,
                                            [method]: e.target.checked,
                                        }))
                                    }
                                    className="w-4 h-4"
                                />
                                {method.charAt(0).toUpperCase() + method.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-4">
                    <button
                        onClick={handleSave}
                        className={`${cls.btn} ${cls.btnPrimary}`}
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentsTaxes;
