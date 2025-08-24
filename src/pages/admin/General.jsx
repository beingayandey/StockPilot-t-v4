// src/components/settings/general/General.jsx
import React, { useState } from "react";
import { cls } from "../../components/admin/addProduct/cls";

const General = () => {
    const [siteName, setSiteName] = useState("My Admin Panel");
    const [timezone, setTimezone] = useState("GMT+5:30");
    const [currency, setCurrency] = useState("INR");
    const [contactEmail, setContactEmail] = useState("support@example.com");

    const handleSave = () => {
        console.log("Saved settings:", { siteName, timezone, currency, contactEmail });
    };

    return (
        <div className={`${cls.card} mt-2 p-4`}>
            <h2 className="text-lg font-semibold mb-4 text-primary-black">General Settings</h2>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Site Name</label>
                    <input
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Timezone</label>
                    <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    >
                        <option value="GMT+5:30">GMT+5:30</option>
                        <option value="GMT+0">GMT+0</option>
                        <option value="GMT+1">GMT+1</option>
                        <option value="GMT+8">GMT+8</option>
                    </select>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Default Currency</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label className="w-40 text-sm font-medium text-primary-black">Contact Email</label>
                    <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="flex-1 border border-neutral-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-black"
                    />
                </div>

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

export default General;
