import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex space-x-3 text-[length:var(--font-small)]">
                <li>
                    <Link to="/" className="text-[var(--color-primary-black)] hover:text-[var(--color-primary)]">
                        Home
                    </Link>
                </li>
                {pathnames.map((name, index) => {
                    const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
                    const isLast = index === pathnames.length - 1;
                    return (
                        <li key={name} className="flex items-center space-x-1">
                            <span className="text-[var(--color-black-variant-one)]">/</span>
                            {isLast ? (
                                <span className="px-3 font-medium capitalize">{decodeURIComponent(name)}</span>
                            ) : (
                                <Link to={routeTo} className="px-3 capitalize hover:text-[var(--color-primary)]">
                                    {decodeURIComponent(name)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
