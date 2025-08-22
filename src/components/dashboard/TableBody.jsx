// components/TableBody.jsx
const TableBody = ({ data, selectedRows, toggleRow, getStatusColor }) => {
    return (
        <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
                <tr key={row.orderId} className="hover:bg-primary-white">
                    <td className="px-2 py-1.5">
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(row.orderId)}
                            onChange={() => toggleRow(row.orderId)}
                            className="rounded border-neutral-300"
                        />
                    </td>
                    <td className="px-2 py-1.5 text-xs font-medium text-secondary">{row.orderId}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">{row.customer}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">${row.total.toFixed(2)}</td>
                    <td className="px-2 py-1.5">
                        <span
                            className={`inline-flex items-center px-2 py-1.5 rounded-md text-xs font-medium  ring-1 ring-inset ${getStatusColor(
                                row.status
                            )}`}
                        >
                            {row.status}
                        </span>
                    </td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">{row.date}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">{row.product}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">{row.stock}</td>
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
