'use client'

import { AnimatePresence } from "framer-motion"
import MFACode from "./components/MFACode"
import MFASelection from "./components/MFASelection"
import { useMFAContext } from "./context/mfaContext"
import { MFAViewStates } from "./utils/types"
import MobileAuthenticator from "./components/mobile auth/MobileAuthenticator"
import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const MFA = () => {
    const {viewState, setViewState} = useMFAContext()
    const [isEmail2faEnabled, setIsEmail2faEnabled] = useState(false)

    const checkMfaStatus = async () => {
        const response = await protectedApi.GET("mfa/check-status")
        return response
    }

    const {mutate : checkMfaStatusMutation, isPending} = useMutation({
        mutationFn : checkMfaStatus,
        onSuccess : ({email_2fa_enabled, totp_2fa_enabled})=>{
            if(email_2fa_enabled){
                setIsEmail2faEnabled(email_2fa_enabled)
                setViewState(MFAViewStates.EMAIL)
            } else if(totp_2fa_enabled) {
                setViewState(MFAViewStates.MOBILE_APP)
            } else {
                setViewState(MFAViewStates.MFA_SELECTION)
            }
        }
    })

    useEffect(()=>{
        checkMfaStatusMutation()
    },[])

    return (
        <>
            <AnimatePresence>
                {
                    isPending ?
                    <div className="w-full h-screen flex justify-center items-center"><div className="normal-loader"></div></div>
                    :
                    viewState === MFAViewStates.MFA_SELECTION ?
                    <MFASelection />
                    : viewState === MFAViewStates.EMAIL ?
                    <MFACode email_2fa_enabled={isEmail2faEnabled} />
                    : viewState === MFAViewStates.MOBILE_APP &&
                    <MobileAuthenticator />
                }
            </AnimatePresence>
        </>
    )
}
export default MFA