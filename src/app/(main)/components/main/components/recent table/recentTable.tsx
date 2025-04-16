'use client'

import useRecentVisits from "./utils/useRecentVisits"
import { useEffect, useState } from "react"
import Slidein from "@styles/components/slidein"
import Controls from "@components/table/controls"
import { columns } from "./components/data"
import RecentVisitsDetails from "./components/recent visit details/recentVisitsDetails"
import { useEncounterContext } from "@/app/(main)/encounters/context/encounterContext"
import { IRecentVisitsTable } from "@/app/(main)/encounters/utils/type"
import Table from "./components/table"

const RecentTable = () => {
  const {getRecentVisits, recentVisitsTableData, isLoading, isError, error} = useRecentVisits()
  const [pageSize, setPageSize] = useState(15)
  const [pageNumber, setPageNumber] = useState(1)
  const [view, setView] = useState<"list" | "grid">("list")
  const [selectedVisit, setSelectedVisit] = useState<IRecentVisitsTable>()
  const {setShowEncounterDetails, showEncounterDetilas} = useEncounterContext()
  
  useEffect(()=>{
    getRecentVisits({})
  },[])

  useEffect(()=>{
    console.log({recentVisitsTableData})
  },[recentVisitsTableData])

  const handleOnRowCLick = (data : any) => {
    setSelectedVisit(data)
    setShowEncounterDetails(true)
  }

  return (
    <>
      {/* <RecentVisitsDetails
          data={selectedVisit}
          display={showEncounterDetilas}
          setDisplay={setShowEncounterDetails}
      /> */}
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
            // columns={columns}
            // handleOnRowCLick={handleOnRowCLick}
          />
        </div>
      </Slidein>
    </>
    )
}
export default RecentTable