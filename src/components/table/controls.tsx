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
    handleReload
} : {
    setPageSize: Dispatch<SetStateAction<number>>
    setPageNumber: Dispatch<SetStateAction<number>>
    pageSize: number
    pageNumber: number
    setView: Dispatch<SetStateAction<"list" | "grid">>
    view: "list" | "grid"
    handleReload? : () => void
}) => {
    return (
        <div className="flex items-center gap-2">
            {
                handleReload ?
                <div 
                    className="flex h-[33px] items-center p-1 px-2 border-[1px] border-solid border-border-primary rounded-lg gap-[1px] cursor-pointer bg-bg-primary hover:bg-bg-tetiary"
                    onClick={handleReload}
                >
                    <IoReload color={theme.colors.text.primary}/>
                </div>
                : <></>
            }
            <div className="flex h-[33px] bg-bg-primary items-center p-1 px-2 border-[1px] border-solid border-border-primary rounded-lg gap-[1px] cursor-pointer hover:bg-bg-tetiary">
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
        </div>
    )
}
export default Controls