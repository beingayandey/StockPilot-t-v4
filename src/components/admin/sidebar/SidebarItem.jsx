import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import * as PhosphorIcons from "@phosphor-icons/react";

const SidebarItem = ({ menu, index, expanded, isOpen, toggleMenu }) => {
    const Icon = PhosphorIcons[menu.icon];
    const isDropdownOpen = isOpen === index;

    return (
        <li className="bg-[var(--color-primary-white)]">
            <Link
                to={menu.path}
                onClick={() => menu.children && expanded && toggleMenu(index)}
                className="flex justify-between items-center w-full px-3 py-2 rounded 
                  hover:bg-[var(--color-primary-black)] hover:text-[var(--color-primary-white)]
                  transition-all duration-300 ease-in-out"
            >
                <span className="flex items-center gap-2">
                    {Icon && <Icon size={20} weight="duotone" />}
                    {expanded && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="overflow-hidden whitespace-nowrap"
                        >
                            {menu.label}
                        </motion.span>
                    )}
                </span>
                {menu.children && expanded && (
                    <PhosphorIcons.CaretDown
                        size={16}
                        className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                )}
            </Link>

            <AnimatePresence>
                {menu.children && isDropdownOpen && (
                    <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-8 mt-1 overflow-hidden"
                    >
                        {menu.children.map((child, idx) => (
                            <li key={idx}>
                                <Link
                                    to={child.path}
                                    className="block relative px-3 py-1 rounded 
                            hover:bg-[var(--color-primary-black)] hover:text-[var(--color-primary-white)]
                            transition-all duration-300 ease-in-out
                            before:content-[''] before:absolute before:left-0 before:top-0 
                            before:w-[1px] before:h-full before:bg-[var(--black-variant-one)]"
                                >
                                    {child.label}
                                </Link>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </li>
    );
};

export default SidebarItem;
