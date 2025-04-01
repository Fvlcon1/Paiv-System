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
import Controls from "./components/controls"

const ResultsTable = () => {
  const [pageSize, setPageSize] = useState(15)
  const [pageNumber, setPageNumber] = useState(1)
  const [view, setView] = useState<"list" | "grid">("list")

    return (
        <div className="w-full flex flex-col px-[30px] gap-[15px] items-center">
          <div className="flex gap-[15px] flex-col min-w-[800px] w-full max-w-[1024px]">
            <div className="flex gap-[15px] flex-col w-full">
              <div className="w-full flex items-center justify-between">
                <Text
                  textColor={theme.colors.text.primary}
                  bold={TypographyBold.md}
                >
                  Results
                </Text>
                <Controls 
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  view={view}
                  setView={setView}
                />
              </div>
            </div>
            <Table />
          </div>
        </div>
    )
}
export default ResultsTable