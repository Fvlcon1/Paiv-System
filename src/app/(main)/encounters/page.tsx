'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import { useContext, useEffect, useRef, useState } from "react"
import TopSection from "./components/topSection"
import { AnimatePresence } from "framer-motion"
import useRecentVisits from "./utils/useEncounter/useRecentVisits"
import { useEncounterContext } from "./context/encounterContext"
import ClaimsForm from "../components/claimsForm/claimsForm"
import Slidein from "@styles/components/slidein"
import Controls from "@components/table/controls"
import { columns } from "./components/data"

const Encounters = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const {showClaims, setShowClaims} = useEncounterContext()
    const {getRecentVisits, recentVisitsTableData, isLoading, isError, error} = useRecentVisits()

    useEffect(()=>{
      getRecentVisits({})
    },[])

    return (
        <>
            {
                showClaims &&
                <ClaimsForm
                    close={()=>setShowClaims(false)}
                />
            }

            <div className="w-full px-8 pt-4 flex flex-col">

                {/* Top Section */}
                <TopSection />

                {/* Table Section */}
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
                                handleReload={()=>getRecentVisits({})}
                            />
                        </div>
                        <Table
                            data={recentVisitsTableData}
                            isError={isError}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </Slidein>
            </div>
        </>
    )
}
export default Encounters