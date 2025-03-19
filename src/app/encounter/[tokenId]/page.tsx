'use client'

import Button from "@components/button/button"
import Text from "@styles/components/text"
import { TypographyBold, TypographySize } from "@styles/style.types"
import theme from "@styles/theme"
import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import TopSection from "./components/topSection"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { mainContext } from "@/app/context/context"
import toast from "react-hot-toast"
import { useEncounterContext } from "./context/encounter.context"
import { IEncounterDetails, ViewState } from "./utils/types"
import VerificationStates from "./components/verificationStates"
import useRecentVisits from "./components/recent table/utils/useRecentVisits"
import { INhisDetails } from "@/app/components/results table/utils/type"
import NoData from "@components/NoData/noData"
import RecentTable from "./components/recent table/recentTable"
import { DispositionViewState } from "@/app/utils/types"
import Disposition from "./components/disposition/disposition"
import { getTime, getRelativeTime } from "@/utils/getDate"

const Encounter = () => {
    const { tokenId } = useParams();
    const { viewState, setViewState, setDispositionViewState, getEncounterMutation, getEncounterPending, encounterData } = useEncounterContext();

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
            <VerificationStates />
            <Disposition />
            <div className="flex flex-col gap-6">
                <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center pt-[30px] h-[300px] flex items-center">
                    <div className="max-w-[1024px] w-full flex flex-col justify-center gap-6">
                        <TopSection />
                    </div>
                </div>
                <div className="w-full flex justify-center gap-1">
                    <div className="max-w-[1024px] w-full flex flex-col gap-6">
                        <div className="flex gap-2">
                            <Button
                                text="Verify Visit"
                                className="!bg-main-primary"
                                onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                                disabled={encounterData.verification_status === true}
                            />
                            <Button
                                text="Close Encounter"
                                disabled={encounterData.final_time !== null}
                                onClick={() => setDispositionViewState(DispositionViewState.SELECT_DISPOSITION)}
                            />
                        </div>
                        <RecentTable />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Encounter;