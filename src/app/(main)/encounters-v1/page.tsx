'use client'

import Table from "./components/table"
import { useEffect, useState } from "react"
import TopSection from "./components/topSection"
import useRecentVisits from "./utils/useEncounter/useRecentVisits"
import { useEncounterContext } from "./context/encounterContext"
import ClaimsForm from "../components/claimsForm/claimsForm"
import Slidein from "@styles/components/slidein"
import Controls from "@components/table/controls"

const Encounters = () => {
    const [view, setView] = useState<"list" | "grid">("list")
    const { showClaims, setShowClaims } = useEncounterContext()
    const { getRecentVisits, recentVisitsTableData, isLoading, isError, error, pageSize, pageNumber, setPageSize, setPageNumber, isRefetching } = useRecentVisits()
    const [manualRefetching, setManualRefetching] = useState(false)

    const handleManualRefetch = async () => {
        setManualRefetching(true);
        try {
            await getRecentVisits();
        } finally {
            setManualRefetching(false);
        }
    };

    let firstload = false
    useEffect(() => {
        if(!firstload){
            firstload = true
            return
        }
        setManualRefetching(false)
    }, [pageNumber, pageSize])

    useEffect(() => {
        if (!isRefetching)
            setManualRefetching(false)
    }, [isRefetching])

    return (
        <>
            {
                showClaims &&
                <ClaimsForm
                    close={() => setShowClaims(false)}
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
                                handleReload={handleManualRefetch}
                            />
                        </div>
                        <Table
                            data={recentVisitsTableData}
                            isError={isError}
                            isLoading={isLoading || manualRefetching}
                            error={error}
                        />
                    </div>
                </Slidein>
            </div>
        </>
    )
}
export default Encounters