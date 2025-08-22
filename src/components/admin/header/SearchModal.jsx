import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MagnifyingGlass, FileText, User } from "@phosphor-icons/react";

const suggestions = [
    { icon: FileText, label: "Queries", href: "#" },
    { icon: User, label: "Customers", href: "#" },
];

const SearchModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    // Close modal on ESC key or clicking outside
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Modal Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-[var(--color-primary-black)]/20 backdrop-blur-sm z-50"
            />

            {/* Search Modal */}
            <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
                ref={modalRef}
            >
                <div className="bg-[var(--color-light-variant-one)] rounded-xl shadow-2xl border border-[var(--neutral-200)] overflow-hidden mx-4">
                    {/* Search Input */}
                    <div className="p-4 border-b border-[var(--neutral-200)]">
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search..."
                                className="w-full px-4 pl-10 py-3 bg-[var(--color-primary-white)] border border-[var(--neutral-200)] outline-none text-[var(--color-primary-black)] placeholder-[var(--color-black-variant-one)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all"
                                autoFocus
                            />
                            <MagnifyingGlass
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-black-variant-one)]"
                            />
                        </div>
                    </div>

                    {/* Modal Header */}
                    <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--neutral-200)] bg-[var(--color-light-variant-one)]">
                        <span className="text-[var(--color-black-variant-one)] text-sm font-medium">
                            Recommended
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[var(--color-black-variant-one)]">
                            <kbd className="px-2 py-1 bg-[var(--color-primary-black)] text-[var(--color-primary-white)] rounded text-xs font-mono">
                                Esc
                            </kbd>
                        </div>
                    </div>

                    {/* Suggestions List */}
                    <div className="py-2">
                        {suggestions.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="flex justify-between items-center cursor-pointer hover:bg-[var(--neutral-100)] px-4 py-3 transition-colors group"
                                    onClick={onClose}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[var(--neutral-200)] flex items-center justify-center group-hover:bg-[var(--color-primary)]/10 transition-colors">
                                            <IconComponent
                                                size={16}
                                                className="text-[var(--color-primary-black)] group-hover:text-[var(--color-primary)]"
                                            />
                                        </div>
                                        <span className="text-[var(--color-primary-black)] font-medium text-sm">
                                            {item.label}
                                        </span>
                                    </div>
                                    <svg
                                        className="w-4 h-4 text-[var(--color-black-variant-one)] group-hover:text-[var(--color-primary-black)]"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </a>
                            );
                        })}
                    </div>

                    {/* Modal Footer */}
                    <div className="px-4 py-3 border-t border-[var(--neutral-200)] bg-[var(--neutral-100)]">
                        <div className="flex items-center justify-center">
                            <span className="text-xs text-[var(--color-black-variant-one)]">
                                Type to search or use arrow keys to navigate
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default SearchModal;
