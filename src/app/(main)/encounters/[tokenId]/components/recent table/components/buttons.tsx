import Button from "@components/button/button"
import { useEncounterContext } from "../../../context/encounter.context";
import { ViewState } from "../../../utils/types";
import { DispositionViewState } from "@/app/utils/types";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const Buttons = ({
    setShowSubmittedClaims
} : {
    setShowSubmittedClaims : Dispatch<SetStateAction<boolean>>
}) => {
    const { tokenId } = useParams();
    const { setViewState, setDispositionViewState, getEncounterMutation, getEncounterPending, encounterData, encounterDetails, showClaims, setShowClaims } = useEncounterContext();
    const checkinFailed = encounterDetails?.checkinImageUrl && !encounterDetails.checkinStatus
    const checkinSuccessful = encounterDetails?.checkinStatus
    const checkoutSuccessful = encounterDetails?.checkoutStatus
    const checkoutTime = encounterDetails?.checkoutTime
    const claimSubmittedAt = encounterDetails?.claimSubmissionAt
    const showSubmitClaimButton = (checkinFailed || checkinSuccessful || checkoutSuccessful) && !claimSubmittedAt

    const router = useRouter()

    return (
        <div className="flex gap-2">
            {
                !checkinSuccessful &&
                <Button
                    text="Verify Visit"
                    onClick={() => setViewState(ViewState.VERIFICATION_SELECTION)}
                />
            }
            {
                checkinSuccessful && !checkoutTime &&
                <Button
                    text="Close Encounter"
                    onClick={() => setDispositionViewState(DispositionViewState.INSTRUCTIONS)}
                />
            }
            {
                // showSubmitClaimButton &&
                <Button
                    text="Submit Claim"
                    // onClick={()=>setShowClaims(true)}
                    onClick={()=>router.push(`${tokenId}/submit-claim`)}
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