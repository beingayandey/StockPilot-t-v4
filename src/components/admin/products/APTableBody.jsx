import { cls } from "../addProduct/cls";

const APTableBody = ({
    data,
    selectedRows,
    toggleRow,
    deleteSingle,
    setQuantity,
    addQuantity,
    openEditModal,
}) => {
    return (
        <tbody className="divide-y divide-gray-200">
            {data.map((row) => (
                <tr
                    key={row.id}
                    className={`transition duration-200 hover:bg-light-variant-one ${data.indexOf(row) % 2 === 0 ? "bg-primary-white" : "bg-light-variant-twelve"
                        }`}
                >
                    <td className="px-2 py-1.5">
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => toggleRow(row.id)}
                            className="rounded border-neutral-300"
                        />
                    </td>
                    <td className="px-2 py-1.5">
                        <img
                            src={row.image}
                            alt={row.name}
                            className="w-10 h-10 rounded object-cover"
                        />
                    </td>
                    <td className="px-2 py-1.5 text-xs font-medium text-primary-black">{row.id}</td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">
                        {row.name}
                    </td>
                    <td className="px-2 py-1.5 text-sm font-medium text-primary-black">
                        {row.price}
                    </td>
                    <td className="px-2 py-1.5">
                        <div className="inline-flex items-center gap-1">
                            <button
                                onClick={() => addQuantity(row.id, -1)}
                                className="h-7 w-7 grid place-items-center rounded border border-neutral-300 bg-primary-white text-neutral-900"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={row.stock}
                                onChange={(e) => setQuantity(row.id, e.target.value)}
                                className="w-16 h-7 text-sm px-2 border border-neutral-300 rounded bg-primary-white text-primary-black text-center"
                            />
                            <button
                                onClick={() => addQuantity(row.id, +1)}
                                className="h-7 w-7 grid place-items-center rounded border border-neutral-300 bg-primary-white text-neutral-900"
                            >
                                +
                            </button>
                        </div>
                    </td>
                    <td className="px-2 py-1.5 flex  gap-3">
                        <button
                            onClick={() => openEditModal(row)}
                            className={`${cls.btn} ${cls.btnPrimary}`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteSingle(row.id)}
                            className="text-red-600 hover:underline text-xs"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
            }
        </tbody >
    );
};

export default APTableBody;
