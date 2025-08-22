import { useTheme } from "@/app/styles/theme-context"
import Text from "@styles/components/text"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useReactTable, getCoreRowModel, flexRender, Table } from "@tanstack/react-table"
import NoData from "@components/NoData/noData"
import { ReactNode, useState } from "react"
import { gradientClass } from "@/utils/constants"

const TableV2 = ({
    data,
    error,
    isLoading,
    isError,
    columns,
    handleOnRowClick,
    title,
    className,
} : {
    data : any[]
    error: Error | null,
    isLoading : boolean,
    isError : boolean,
    columns : any,
    handleOnRowClick? : (dataItem : any)=>void,
    title? : string | ReactNode
    className? : string,
}) => {
    const { theme } = useTheme()
    const [isScrolling, setIsScrolling] = useState(false);

    const { getHeaderGroups, getRowModel } = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="">
            <table className="w-full min-w-[800px] border-separate border-spacing-0">
                {/* Table Head */}
                <thead className="">
                    {getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, colIndex) => (
                                <th
                                    key={header.id}
                                    className={`text-left border-b-[1px] cursor-pointer border-solid border-border-primary 
                                        ${colIndex === 0 ? 'sticky left-0 bg-white max-w-[50px]' : ''}
                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}`
                                    }
                                    onClick={header.column.getToggleSortingHandler()}
                                    style={{
                                        minWidth: colIndex === 0 ? '150px' : '150px',
                                        maxWidth: colIndex === 0 ? '150px' : '150px',
                                    }}
                                >
                                    <div className={`py-[15px] ${colIndex === 0 ? 'px-[10px]' : 'px-[30px]'} flex h-full items-center gap-1`}>
                                        <Text
                                            ellipsis
                                            className={gradientClass}
                                            bold={theme.text.bold.md}
                                        >
                                            {
                                                header.isPlaceholder
                                                    ? null
                                                    : flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </Text>
                                        {
                                            // colIndex !== 0 && (
                                            //     {
                                            //         asc: <FaSortUp size={13} color={theme.colors.main.primary} />,
                                            //         desc: <FaSortDown size={13} color={theme.colors.main.primary} />,
                                            //     }[header.column.getIsSorted() as string]
                                            //     ??
                                            //     <FaSort size={13} color={theme.colors.bg.quantinary} />
                                            // )
                                        }
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className={`${isLoading ? "opacity-50" : ""}`}>
                    {getRowModel().rows.map((row, index) => (
                        <tr
                            key={row.id}
                            className={`${isLoading ? "cursor-wait" : "cursor-pointer"} ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""} group hover:bg-bg-secondary duration-500`}
                            onClick={handleOnRowClick ? () => handleOnRowClick(data[index]) : () => { }}
                        >
                            {row.getVisibleCells().map((cell, colIndex) => (
                                <td
                                    key={cell.id}
                                    className={`border-b-[1px] border-solid border-border-primary py-2 duration-500 group-hover:bg-bg-secondary
                                                        ${index % 2 === 0 ? "bg-bg-primary-lighter" : ""}
                
                                                        ${colIndex === 0 && isScrolling ? 'after:content-[""] after:absolute after:top-0 after:right-[-8px] duration-1000 after:h-full after:w-2 after:bg-gradient-to-r after:from-black/15 after:to-transparent' : ''}
                                                    `}
                                    style={{
                                        minWidth: colIndex === 0 ? '150px' : '150px',
                                        maxWidth: colIndex === 0 ? '150px' : '150px',
                                    }}
                                >
                                    <div className={`${colIndex === 0 ? 'px-[10px]' : 'px-[30px]'} w-full flex h-full items-center gap-1`}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableV2