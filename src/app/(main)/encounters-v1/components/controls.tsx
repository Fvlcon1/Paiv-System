import { HiAdjustmentsHorizontal } from "react-icons/hi2"
import Pagination from "./pagination"
import { Tooltip } from "antd"
import { FaListUl } from "react-icons/fa"
import theme from "@styles/theme"
import { IoGrid, IoReload } from "react-icons/io5"
import { Dispatch, SetStateAction } from "react"

const Controls = ({
    setPageSize,
    setPageNumber,
    pageSize,
    pageNumber,
    setView,
    view,
    refresh
} : {
    setPageSize: Dispatch<SetStateAction<number>>
    setPageNumber: Dispatch<SetStateAction<number>>
    pageSize: number
    pageNumber: number
    setView: Dispatch<SetStateAction<"list" | "grid">>
    view: "list" | "grid"
    refresh : ()=>void
}) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-primary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
                <IoReload
                    color={theme.colors.text.primary}
                    onClick={refresh}
                />
            </div>
            <div className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-primary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
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
            <div className="flex h-[33px] p-1 border-[1px] border-solid border-border-primary rounded-lg gap-[1px]">
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
    )
}
export default Controls