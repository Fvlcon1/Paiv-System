'use client'

import { useParams } from "next/navigation"
import { useEffect, } from "react"
import TopSection from "./components/top section/topSection"
import { useEncounterContext } from "./context/encounter.context"
import VerificationStates from "./components/verificationStates"
import NoData from "@components/NoData/noData"
import RecentTable from "./components/recent table/recentTable"
import Disposition from "./components/disposition/disposition"
import { AnimatePresence } from "framer-motion"
import ClaimsFormLayout from "./components/claims/claimsFormLayout"
import Slidein from "@styles/components/slidein"
import Crumbs from "./components/crumbs"

const Encounter = () => {
    const { tokenId } = useParams();
    const { getEncounterMutation, getEncounterPending, encounterData, encounterDetails, showClaims, setShowClaims } = useEncounterContext();

    useEffect(() => {
        if (tokenId) {
            getEncounterMutation();
        }
    }, [tokenId]);

    if (getEncounterPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="normal-loader"></div>
            </div>
        );
    }

    if (!encounterData) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <NoData />
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {
                    showClaims &&
                    <ClaimsFormLayout
                        close={() => setShowClaims(false)}
                    />
                }
            </AnimatePresence>
            <VerificationStates />
            <Disposition />
            <Slidein
                className="flex flex-col gap-6 px-8"
                direction="right"
            >
                <div className="w-full flex flex-col justify-center gap-6 border-b-[1px] border-solid border-b-border-primary py-[30px]">
                    <Crumbs />
                    <TopSection />
                </div>
                <div className="w-full flex justify-center gap-1">
                    <div className="w-full flex flex-col gap-6">
                        <RecentTable />
                    </div>
                </div>
            </Slidein>
        </>
    );
};

export default Encounter;