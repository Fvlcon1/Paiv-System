'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "./data"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TypographyBold } from "@styles/style.types"
import { IRecentVisitsTable } from "../utils/type"
import NoData from "@components/NoData/noData"
import RecentVisitsDetails from "./recent visit details/recentVisitsDetails"
import {useState } from "react"

const Table = ({
    data,
    error,
    isLoading,
    isError
} : {
    data : IRecentVisitsTable[]
    error: Error | null,
    isLoading : boolean,
    isError : boolean
}) => {
    const {getHeaderGroups, getRowModel} = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })
    const [selectedVisit, setSelectedVisit] = useState<IRecentVisitsTable>()
    const [displayRecentVisitsDetails, setDisplayRecentVisitsDetails] = useState(false)

    return (
        <>
            <RecentVisitsDetails 
                data={selectedVisit}
                display={displayRecentVisitsDetails}
                setDisplay={setDisplayRecentVisitsDetails}
            />
            <div className="overflow-hidden w-full rounded-lg border border-border-primary bg-bg-primary">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        {
                            getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {
                                        headerGroup.headers.map((header) => (
                                            <th className="px-6 py-2 text-left tracking-wider border-b-[1px] border-border-primary border-solid" key={header.id}>
                                                <Text
                                                    bold={TypographyBold.sm2}
                                                    textColor={theme.colors.text.secondary}
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
                                        onClick={()=>{
                                            setDisplayRecentVisitsDetails(true)
                                            setSelectedVisit(data[index])
                                        }}
                                    >
                                        {
                                            row.getVisibleCells().map((cell) => {
                                                return (
                                                    <td className="px-6 py-1 whitespace-nowrap text-sm" key={cell.id}>
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