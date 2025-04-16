'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TypographyBold } from "@styles/style.types"
import NoData from "@components/NoData/noData"
import { IClaims } from "../utils/types"
import { columns } from './claimsTable/data';

const Table = ({
    data,
    isLoading,
} : {
    data : IClaims[]
    isLoading : boolean,
}) => {
    const {getHeaderGroups, getRowModel} = useReactTable({
        data:data,
        columns : columns,
        getCoreRowModel:getCoreRowModel()
    })
    return (
        <>
            <div className="overflow-hidden w-full rounded-lg border border-border-primary bg-bg-primary">
                <table className="w-full">
                    <thead className="bg-bg-secondary">
                        {
                            getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <th className="px-6 py-2 text-left tracking-wider border-b-[1px] border-border-primary border-solid" key={header.id}>
                                                <Text
                                                    bold={TypographyBold.sm2}
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
                                        className="hover:bg-gray-50 cursor-pointer transition-colors duration-200" 
                                        key={row.id}
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
        </>
    )
}
export default Table