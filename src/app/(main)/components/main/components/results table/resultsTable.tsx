'use client'

import { useContext, useEffect, useState } from "react"
import Slidein from "@styles/components/slidein"
import Controls from "@components/table/controls"
import { mainContext } from "@/app/context/context"
import { SearchContext } from "@/app/context/searchContext"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { columns } from "./components/data"
import Table from "@components/table/table"

const RecentTable = () => {
  const [pageSize, setPageSize] = useState(15)
  const [pageNumber, setPageNumber] = useState(1)
  const [view, setView] = useState<"list" | "grid">("list")
  const {searchMembersResult} = useContext(mainContext)
  const {isLoading, isError, error} = useContext(SearchContext)

  const {getHeaderGroups, getRowModel} = useReactTable({
      data:searchMembersResult,
      columns : columns,
      getCoreRowModel:getCoreRowModel()
  })

  return (
    <>
      <Slidein className="w-full flex flex-col items-center">
        <div className="flex gap-[15px] flex-col min-w-[800px] w-full py-4">
          <div className="w-full">
            <Controls
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              view={view}
              setView={setView}
            />
          </div>
          <Table
            data={searchMembersResult}
            isError={isError}
            isLoading={isLoading}
            error={error}
            columns={columns}
          />
        </div>
      </Slidein>
    </>
    )
}
export default RecentTable