import useRecentVisits from "@/app/(main)/components/main/components/recent table/utils/useRecentVisits"
import Controls from "@components/table/controls"
import Table from "@components/table/table3"
import Slidein from "@styles/components/slidein"
import { useState } from "react"
import { columns } from "./data"

const ClaimsTable = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const {getRecentVisits, recentVisitsTableData, isLoading, isError, error} = useRecentVisits()

    return (
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
                    data={recentVisitsTableData}
                    isError={isError}
                    isLoading={isLoading}
                    error={error}
                    columns={columns}
                />
            </div>
        </Slidein>
    )
}
export default ClaimsTable