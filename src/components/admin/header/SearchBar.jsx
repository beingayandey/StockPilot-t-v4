import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const SearchBar = ({ onOpen }) => (
    <div className="relative w-full max-w-[300px] max-h-[30px]">
        <div
            className="cursor-pointer ps-2 py-1 rounded-[var(--radius-sm)] h-full flex items-center gap-2 bg-light-variant-one"
            onClick={onOpen}
        >
            <MagnifyingGlass size={20} className="text-primary-black" />
            <span className="text-primary-black text-[length:var(--font-small)]">
                Search ...
            </span>
        </div>
    </div>
);

export default SearchBar;
