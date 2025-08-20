import React from "react";
import { BellIcon } from "@phosphor-icons/react";

const NotificationsButton = ({ onClick }) => (
    <span onClick={onClick} className="cursor-pointer">
        <BellIcon size={20} className="text-primary-black" />
    </span>
);

export default NotificationsButton;
