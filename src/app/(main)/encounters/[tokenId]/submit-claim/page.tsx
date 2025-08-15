'use client'

import { useEffect, useState } from "react"
import { useClaimsFormContext } from "./context/context"
import ClaimDetails from "./components/claimDetails/claimDetails"
import { IClaimsDetailType } from "./utils/types"
import { convertToClaimsDetails } from "./utils/convertToClaimsDetails"
import Form from "./components/form/form"
import Crumbs from "./components/form/components/crumbs"
import Sidenav from "./components/form/components/side-nav"
import { IoIosAlarm } from "react-icons/io"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { getRelativeTime } from "@/utils/getDate"
import SlideIn from "@styles/components/slidein"

const ClaimsForm = () => {
    const { formik, isClaimSubmissionPending, handleDraftSubmitMutation, isDraftSubmissionPending, draftLoading } = useClaimsFormContext()
    const [showClaimsDetails, setShowClaimsDetails] = useState(false)
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType>()

    useEffect(() => {
        const claimsDetails = convertToClaimsDetails(formik.values)
        setClaimDetails(claimsDetails)
    }, [formik.values])

    const LastUpdated = () => {
        return (
            <div className="flex flex-col gap-1.5 ml-4.5 pl-2 py-1 border-l-[3px] border-bg-quantinary">
                <div className="flex items-center gap-1 w-fit">
                    {/* <IoIosAlarm size={14} color={theme.colors.text.tetiary} /> */}
                    <Text textColor={theme.colors.text.tetiary}>
                        Last Updated
                    </Text>
                </div>
                <div className="flex gap-2">
                    <Text>
                        {getRelativeTime(new Date("2025-08-10T15:02:46.000Z"))} &nbsp; -
                    </Text>
                    <Text bold={theme.text.bold.md}>
                        Dennis Boachie
                    </Text>
                </div>
            </div>
        )
    }

    return (
        <>
            <ClaimDetails
                isVisible={showClaimsDetails}
                close={() => setShowClaimsDetails(false)}
                claimDetails={claimDetails}
                onSubmit={formik.handleSubmit}
                loading={isClaimSubmissionPending}
            />
            <SlideIn direction="right" className="flex gap-8 p-4 px-4">
                <div className="flex flex-col gap-6 fixed">
                    <Crumbs />
                    <div className="flex flex-col gap-1">
                        <LastUpdated />
                        <Sidenav />
                    </div>
                </div>
                <div className="ml-[450px]">
                    <Form setShowClaimsDetails={setShowClaimsDetails} />
                </div>
            </SlideIn>
        </>
    )
}

export default ClaimsForm