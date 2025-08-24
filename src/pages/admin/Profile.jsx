import React, { useState } from "react";
import { cls } from "../../components/admin/addProduct/cls"; // your cls.js


const mockProfile = {
    name: "Ayan Sharma",
    email: "ayan@example.com",
    role: "Admin",
    status: "Active",
    image: "https://picsum.photos/80/80?random=1",
};

const Profile = () => {
    const [profile, setProfile] = useState(mockProfile);
    const [imagePreview, setImagePreview] = useState(profile.image);
    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
            setProfile((prev) => ({ ...prev, image: url }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!profile.name.trim()) newErrors.name = "Name is required";
        if (!profile.email.trim()) newErrors.email = "Email is required";
        // Simple email regex
        if (profile.email && !/^\S+@\S+\.\S+$/.test(profile.email))
            newErrors.email = "Invalid email";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;
        console.log("Profile saved:", profile);
        // TODO: Integrate with Firestore / backend
    };

    return (
        <div className="p-4 bg-neutral-100 min-h-screen font-sans">
            <div className={cls.card}>
                <div className={cls.cardHeader}>
                    <h2 className="text-sm font-semibold text-primary-black">My Profile</h2>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    {/* Profile Image */}
                    <div className="flex items-center gap-4">
                        <img
                            src={imagePreview}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border border-neutral-300"
                        />
                        <div>
                            <label
                                htmlFor="profileImage"
                                className={`${cls.btnGhost} text-xs px-2 py-1`}
                            >
                                Change Image
                            </label>
                            <input
                                id="profileImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-primary-black">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className={cls.input}
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-xs font-medium text-primary-black">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={cls.input}
                        />
                        {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                    </div>

                    {/* Role & Status */}
                    <div className="flex gap-4">
                        <div className="flex flex-col w-1/2">
                            <label className="text-xs font-medium text-primary-black">Role</label>
                            <select
                                value={profile.role}
                                onChange={(e) => handleChange("role", e.target.value)}
                                className={cls.select}
                            >
                                <option>Admin</option>
                                <option>User</option>
                                <option>Manager</option>
                            </select>
                        </div>

                        <div className="flex flex-col w-1/2">
                            <label className="text-xs font-medium text-primary-black">Status</label>
                            <select
                                value={profile.status}
                                onChange={(e) => handleChange("status", e.target.value)}
                                className={cls.select}
                            >
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button onClick={handleSave} className={`${cls.btn} ${cls.btnPrimary}`}>
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
