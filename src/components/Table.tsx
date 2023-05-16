import Client from "../core/Client";
import { EditIcon, TrashIcon } from "./Icons";

interface TableProps {
    clients: Client[];
    clientSelected?: (client: Client) => void;
    clientDeleted?: (client: Client) => void;
}

export default function Table(props: TableProps) {

    const showActions = props.clientSelected || props.clientDeleted;

    function renderHeader() {
        return (
            <tr>
                <th className={`text-left p-4`}>Id</th>
                <th className={`text-left p-4`}>Name</th>
                <th className={`text-left p-4`}>Age</th>
                {showActions ? <th className={`p-4`}>Actions</th> : false}
            </tr>
        );
    }

    function renderData() {
        return props.clients?.map((client, idx) => {
            return (
                <tr key={client.id}
                    className={`
                        ${idx % 2 === 0 ? 'bg-gray-400' : 'bg-gray-300'}
                    `}
                >
                    <td className={`text-left p-4 font-bold`}>{client.id}</td>
                    <td className={`text-left p-4 font-bold`}>{client.name}</td>
                    <td className={`text-left p-4 font-bold`}>{client.age}</td>
                    {showActions ? renderActions(client) : false}
                </tr>
            );
        });
    }

    function renderActions(client: Client) {
        return (
            <td className={`flex justify-center`}>
                {
                    props.clientSelected ? (
                        <button className={`flex justify-center items-center text-green-600 rounded-full hover:bg-gray-50 p-2 m-1`}
                            onClick={() => props.clientSelected?.(client)}
                        >
                            {EditIcon}
                        </button>
                    ) : false
                }
                {
                    props.clientDeleted ? (
                        <button className={`flex justify-center items-center text-red-500 rounded-full hover:bg-gray-50 p-2 m-1`}
                            onClick={() => props.clientDeleted?.(client)}
                        >
                            {TrashIcon}
                        </button>
                    ) : false
                }
            </td>
        );
    }

    return (
        <table className={`w-full rounded-xl overflow-hidden`}>
            <thead className={`
                bg-gray-700 text-white
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    );
}
