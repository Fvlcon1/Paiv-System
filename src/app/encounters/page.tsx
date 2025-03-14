'use client'

import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import Table from "./components/table"
import { useContext, useEffect, useRef, useState } from "react"
import Controls from "./components/controls"
import Button from "@components/button/button"
import TopSection from "./components/topSection"
import { AnimatePresence } from "framer-motion"
import useRecentVisits from "./utils/useEncounter/useRecentVisits"
import ClaimsForm from "./components/claims/components/claimsForm"
import { useEncounterContext } from "./context/encounterContext"

const Encounters = () => {
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [view, setView] = useState<"list" | "grid">("list")
    const {showClaims, setShowClaims} = useEncounterContext()
    const {getRecentVisits, recentVisitsTableData, isLoading, isError, error} = useRecentVisits()

    useEffect(()=>{
      getRecentVisits({})
    },[])

    useEffect(()=>{
      console.log({recentVisitsTableData})
    },[recentVisitsTableData])

    return (
        <>
            {
                showClaims &&
                <ClaimsForm
                    close={()=>setShowClaims(false)}
                />
            }
            <AnimatePresence>
                <div className="flex flex-col gap-10 items-center">
                    <TopSection />
                    <div className="w-full max-w-[1024px] flex flex-col gap-3">
                        <div className="w-full flex items-center justify-end">
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
                        />
                    </div>
                </div>
            </AnimatePresence>
        </>
    )
}
export default Encounters