'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns, data } from "./components/data"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TypographyBold } from "@styles/style.types"

const ResultsTable = () => {
    const {getHeaderGroups, getRowModel} = useReactTable({
        data:data,
        columns : columns,
        getCoreRowModel:getCoreRowModel()
    })
    console
    return (
        <>
            <table className="w-full min-[800px] max-w-[1024px] border-separate border-spacing-0">
                <thead className="bg-bg-secondary px-2">
                    {
                        getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header, index) => (
                                        <th className={`text-left border-y-[1px] border-solid border-border-primary ${index === 0 ? 'rounded-l-xl border-l-[1px]' : ''} ${index === headerGroup.headers.length - 1 ? 'rounded-r-xl border-r-[1px]' : ''}`} key={header.id}>
                                            <div className={`py-[15px] mt-[-5px] ${index === 0 ? 'pl-[30px]' : ''}`}>
                                                <Text
                                                    textColor={theme.colors.text.primary}
                                                    bold={TypographyBold.md}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : typeof header.column.columnDef.header === 'function'
                                                        ? header.column.columnDef.header(header.getContext()) // Call function if it's a header renderer
                                                        : header.column.columnDef.header} {/* Directly render if it's a string */}
                                                </Text>
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        getRowModel().rows.map((row, index) => (
                            <tr className={`${index % 2 === 1 ? 'bg-bg-secondary' : ''}`} key={row.id}>
                                {
                                    row.getVisibleCells().map((cell, index) => (
                                        <td className={`py-[16px] ${index === 0 ? 'pl-[40px] rounded-l-xl' : ''}`} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default ResultsTable