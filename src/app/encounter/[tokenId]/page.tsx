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
import { ViewState } from "./utils/types"
import VerificationStates from "./components/verificationStates"
import useRecentVisits from "./components/recent table/utils/useRecentVisits"
import { INhisDetails } from "@/app/components/results table/utils/type"
import NoData from "@components/NoData/noData"
import RecentTable from "./components/recent table/recentTable"
import { DispositionViewState } from "@/app/utils/types"

const Encounter = () => {
    const { tokenId } = useParams();
    const { nhisDetails } = useContext(mainContext);
    const { viewState, setViewState, setNhisDetails, setDispositionViewState } = useEncounterContext();
    const { getNHISDetails } = useRecentVisits();
    const [userDetails, setUserDetails] = useState<INhisDetails>();

    const getEncounter = async () => {
        if (!tokenId) return null; // Ensure tokenId exists before fetching
        const response = await protectedApi.GET(`api/encounter/${tokenId}`);
        return response.verification_record;
    };

    const { mutate: getEncounterMutation, isPending, data } = useMutation({
        mutationFn: getEncounter,
        onSuccess: (data) => {
            if (data) {
                const userDetails = getNHISDetails(data);
                setUserDetails(userDetails);
            }
        },
        onError: () => {
            toast.error("Something happened, Please try again later");
        }
    });

    useEffect(() => {
        if (tokenId) {
            getEncounterMutation();
        }
    }, [tokenId]);

    useEffect(() => {
        console.log({ data });
    }, [data]);

    if (isPending) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="normal-loader"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <NoData />
            </div>
        );
    }

    return (
        <>
            <VerificationStates />
            <div className="flex flex-col gap-6">
                <div className="w-full bg-[#ffffff05] border-b-[1px] border-solid border-b-border-tetiary justify-center pt-[30px] h-[300px] flex items-center">
                    <div className="max-w-[1024px] w-full flex flex-col justify-center gap-6">
                        <TopSection userDetails={userDetails} />
                    </div>
                </div>
                <div className="w-full flex justify-center gap-1">
                    <div className="max-w-[1024px] w-full flex flex-col gap-6">
                        <div className="flex gap-2">
                            <Button
                                text="Verify Visit"
                                className="!bg-main-primary"
                                onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                                disabled={data.verification_status === true}
                            />
                            <Button
                                text="Close Encounter"
                                disabled={data.final_time}
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