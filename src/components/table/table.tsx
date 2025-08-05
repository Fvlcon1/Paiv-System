import { useTheme } from "@/app/styles/theme-context"
import Text from "@styles/components/text"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import NoData from "@components/NoData/noData"

const Table = ({
    data,
    error,
    isLoading,
    isError,
    columns,
    handleOnRowClick,
    title
} : {
    data : any[]
    error: Error | null,
    isLoading : boolean,
    isError : boolean,
    columns : any,
    handleOnRowClick? : (dataItem : any)=>void,
    title? : string
}) => {
    const { theme } = useTheme()

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="flex flex-col max-w-[var(--max-page-width)] w-full bg-main-primary/5 rounded-2xl mt-2">
            {
                title &&
                <div className="flex py-2.5 px-3 items-center gap-1 w-full">
                    <HiMagnifyingGlass color={theme.colors.text.secondary} />
                    <Text>
                        {title}
                    </Text>
                </div>
            }

            <div className="flex flex-col justify-between w-full bg-bg-primary max-h-[400px] overflow-y-auto rounded-2xl border border-border-primary">
                <table className="w-full">
                    <thead className="">
                        {
                            getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <th className="px-6 py-2 text-left tracking-wider border-b-[1px] border-border-primary border-solid" key={header.id}>
                                                <Text
                                                    bold={theme.text.bold.md}
                                                    textColor={theme.colors.text.tetiary}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : typeof header.column.columnDef.header === 'function'
                                                            ? header.column.columnDef.header(header.getContext())
                                                            : header.column.columnDef.header}
                                                </Text>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    {
                        !isLoading && data.length ?
                            <tbody className="bg-bg-primary divide-y divide-border-primary">
                                {
                                    getRowModel().rows.map((row, index) => (
                                        <tr
                                            className={`${index % 2 === 1 ? "bg-gray-50" : ""} hover:bg-bg-secondary cursor-pointer transition-colors duration-200`}
                                            key={row.id}
                                            onClick={handleOnRowClick ? () => handleOnRowClick(data[index]) : () => { }}
                                        >
                                            {
                                                row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm" key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                            :
                            <></>
                    }
                </table>
                {
                    isLoading ?
                        <div className="h-[100px] w-full justify-center flex items-center">
                            <div className="normal-loader"></div>
                        </div>
                        :
                        !data.length && <NoData />
                }
            </div>
        </div>
    )
}

export default Table
