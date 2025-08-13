import { useEffect } from "react"
import useClaims from "./hooks/useClaims"
import ClaimSummary from "../claim-summary/claim-summary"
import { useState } from "react"
import { useEncounterContext } from "../../../../context/encounter.context"

const ClaimsDetails = ({
    isVisible,
    close
} : {
    isVisible : boolean
    close : () => void
}) => {
    const { getClaimsMutation, claimDetails, getClaimsLoading } = useClaims()
    const {encounterDetails} = useEncounterContext()
    
    useEffect(() => {
        if (encounterDetails?.claimSubmissionAt) {
            getClaimsMutation()
        }
    }, [encounterDetails])

    return (
        <>
            <ClaimSummary 
                claimDetails={claimDetails}
                isVisible={isVisible}
                close={close}
                loading={getClaimsLoading}
            />
        </>
    )
}
export default ClaimsDetails