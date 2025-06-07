import Button from "@components/button/button"
import { useEncounterContext } from "../../../context/encounter.context";
import { ViewState } from "../../../utils/types";
import { DispositionViewState } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";

const Buttons = ({
    setShowSubmittedClaims
} : {
    setShowSubmittedClaims : Dispatch<SetStateAction<boolean>>
}) => {
    const { setViewState, setDispositionViewState, getEncounterMutation, getEncounterPending, encounterData, encounterDetails, showClaims, setShowClaims } = useEncounterContext();
    const checkinFailed = encounterDetails?.checkinImageUrl && !encounterDetails.checkinStatus
    const checkinSuccessful = encounterDetails?.checkinStatus
    const checkoutSuccessful = encounterDetails?.checkoutStatus
    const checkoutTime = encounterDetails?.checkoutTime
    const claimSubmittedAt = encounterDetails?.claimSubmissionAt
    const showSubmitClaimButton = (checkinFailed || checkinSuccessful || checkoutSuccessful) && !claimSubmittedAt

    return (
        <div className="flex gap-2">
            {
                !checkinSuccessful &&
                <Button
                    text="Verify Visit"
                    className="!bg-main-primary !h-[33px]"
                    onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                />
            }
            {
                checkinSuccessful && !checkoutTime &&
                <Button
                    text="Close Encounter"
                    className="!bg-main-primary"
                    onClick={() => setDispositionViewState(DispositionViewState.INSTRUCTIONS)}
                />
            }
            {
                // showSubmitClaimButton &&
                <Button
                    text="Submit Claim"
                    onClick={()=>setShowClaims(true)}
                />
            }
            {
                claimSubmittedAt &&
                <Button
                    text="View Claim"
                    onClick={()=>setShowSubmittedClaims(true)}
                />
            }
        </div>
    )
}
export default Buttons