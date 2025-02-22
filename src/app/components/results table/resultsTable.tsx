'use client'

import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import Pagination from "./components/pagination"
import { useContext, useEffect, useState } from "react"
import { FaListUl } from "react-icons/fa"
import { IoGrid } from "react-icons/io5"
import { Tooltip } from "antd"
import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import { mainContext } from "@/app/context/context"
import useSearchResults from "./utils/useSearchResults"

const ResultsTable = () => {
  const [pageSize, setPageSize] = useState(15)
  const [pageNumber, setPageNumber] = useState(1)
  const [view, setView] = useState<"list" | "grid">("list")

    return (
        <div className="w-full flex flex-col px-[30px] gap-[15px] items-center">
          <div className="w-full min-[800px] max-w-[1024px] flex items-center justify-between">
            <Text
              textColor={theme.colors.text.primary}
              bold={TypographyBold.md}
            >
              Results
            </Text>
            <div className="flex items-center gap-2">
              <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
                <HiAdjustmentsHorizontal 
                  color={theme.colors.text.primary}
                />
              </div>
              <Pagination 
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
                setPageNumber={setPageNumber}
              />
              <div className="flex h-[33px] p-1 border-[1px] border-solid border-border-tetiary rounded-lg gap-[1px]">
                <Tooltip title='List'>
                  <div 
                    className={`${view === 'list' ? 'bg-bg-tetiary' : ''} p-1 px-2 rounded-md hover:bg-bg-tetiary cursor-pointer duration-150`}
                    onClick={()=>setView("list")}
                  >
                    <FaListUl
                      size={13}
                      color={view === "list" ? theme.colors.text.primary : theme.colors.text.tetiary}
                      className="mt-[1px]"
                    />
                  </div>
                </Tooltip>
                <Tooltip title="Grid">
                  <div 
                    className={`${view === 'grid' ? 'bg-bg-tetiary' : ''} p-1 px-2 rounded-md hover:bg-bg-tetiary cursor-pointer duration-150`}
                    onClick={()=>setView("grid")}
                  >
                    <IoGrid
                      size={13}
                      color={view === "grid" ? theme.colors.text.primary : theme.colors.text.tetiary}
                      className="mt-[1px]"
                    />
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
          <Table />
        </div>
    )
}
export default ResultsTable