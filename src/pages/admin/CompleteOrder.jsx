import React from "react";
import CompleteTable from "../../components/admin/complete/CompleteTable";

const CompleteOrder = () => {
    return (
        <div className="p-3">
            <span className="text-base font-semibold text-primary-black">Completed Orders</span>
            <CompleteTable />
        </div>
    );
};

export default CompleteOrder;
