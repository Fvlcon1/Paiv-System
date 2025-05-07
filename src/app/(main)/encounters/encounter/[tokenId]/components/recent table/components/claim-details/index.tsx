import { useEffect } from "react"
import useClaims from "./hooks/useClaims"
import ClaimSummary from "../claim-summary/claim-summary"
import { useState } from "react"

const ClaimsDetails = ({
    isVisible,
    close
} : {
    isVisible : boolean
    close : () => void
}) => {
    const { getClaimsMutation, claimDetails, getClaimsLoading } = useClaims()
    
    useEffect(() => {
        getClaimsMutation()
    }, [])

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