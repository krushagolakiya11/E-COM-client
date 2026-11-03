import { useQuery } from "@tanstack/react-query";
import { flexRender } from "@tanstack/react-table";
import {
    legacyCreateColumnHelper,
    getCoreRowModel,
    useLegacyTable,
} from "@tanstack/react-table/legacy";
import { getUser, type User } from "../../api/userApi";

const columnHelper = legacyCreateColumnHelper<User>();

const columns = [
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor("first_name",{
        header: "First Name",
    }),
    columnHelper.accessor("last_name", {
        header: "Lase name",
    }),
    columnHelper.accessor("email",{
        header: "Email",
    }),
    columnHelper.accessor("gender",{
        header: "Gender",
    }),
    columnHelper.accessor("phone",{
        header: "Phone",
        cell: (info) => info.getValue() ?? "-",
    }),
    columnHelper.accessor("is_verified", {
        header: "Is Verified",
        cell: (info) => info.getValue() ? "Yes" : "no",
    }),
];

function Users(){
    const {
        data: users = [],
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: getUser
    });

    const table = useLegacyTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if(isLoading){
        return <p className="p-6">Loading users...</p>
    }
    if(isError){
        return(
            <div className="p-6">
                <p className="text-red-600">Error: {error.message}</p>
                <button
                    onClick={() => refetch()}
                    className="mt-3 rounded bg-indigo-900 px-4 py-2 text-white"
                >
                    Retry
                </button>
            </div>
            
        )
    }

    return(
        <div className="p-6">
            <div className="mb-5 flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                    Users
                </h1>
                <button
                    onClick={() => refetch()}
                    className="rounded bg-indigo-900 px-4 py-2 text-white hover:bg-indigo-800"
                >
                    Refresh
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                        }
                                    </th>
                                ))}

                            </tr>
                        ))}
                    </thead>

                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-t hover:bg-slate-50"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="p-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="p-6 text-center text-slate-500"
                                >
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>


                </table>
            </div>
        </div>
    )
}

export default Users;