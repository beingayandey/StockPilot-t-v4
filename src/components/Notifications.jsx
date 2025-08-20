import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
    {
        id: 1,
        title: "New Task Assigned",
        message: "You have been assigned a new task by your manager.",
        time: "2 hours ago",
        read: false,
    },
    {
        id: 2,
        title: "New Message",
        message: "You have a new message from John Doe.",
        time: "1 hour ago",
        read: false,
    },
    {
        id: 3,
        title: "New Comment",
        message: "Someone commented on your post.",
        time: "30 minutes ago",
        read: false,
    },
    {
        id: 4,
        title: "New Follower",
        message: "You have a new follower.",
        time: "20 minutes ago",
        read: false,
    },
    {
        id: 5,
        title: "New Project Created",
        message: "A new project has been created.",
        time: "10 minutes ago",
        read: false,
    },
];

const Notifications = ({ isOpen, setIsOpen }) => {
    return (
        <>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isOpen ? "var(--notifcation-width)" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="notification-outer fixed right-0 top-0 z-50 h-full shadow-[var(--sidebar-boxshadow)] bg-primary-white overflow-hidden"
            >
                {/* AnimatePresence ensures content mounts/unmounts cleanly */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="notification-content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-5"
                        >
                            <span className="notification-heading text-[length:var(--font-small)] font-bold text-primary-black">
                                Notifications
                            </span>

                            <div className="notification-list mt-5">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="notification-item bg-light-variant-two rounded p-3 mb-3 flex flex-col gap-2"
                                    >
                                        <h4 className="notification-title text-primary-black font-medium bg-light-variant-three p-1 px-2 rounded text-[length:var(--font-small)]">
                                            {notification.title}
                                        </h4>
                                        <p className="notification-message text-primary-black text-[length:var(--font-small)]">
                                            {notification.message}
                                        </p>
                                        <span className="notification-time text-primary-black text-[length:var(--font-extra-small)] bg-light-variant-four px-2 py-1 rounded">
                                            {notification.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Notifications;
