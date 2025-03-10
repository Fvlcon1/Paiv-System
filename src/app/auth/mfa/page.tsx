'use client'

import { AnimatePresence } from "framer-motion"
import MFACode from "./components/MFACode"
import MFASelection from "./components/MFASelection"
import { useMFAContext } from "./context/mfaContext"
import { MFAViewStates } from "./utils/types"
import MobileAuthenticator from "./components/mobile auth/MobileAuthenticator"

const MFA = () => {
    const {viewState} = useMFAContext()
    return (
        <>
            <AnimatePresence>
                {
                    viewState === MFAViewStates.MFA_SELECTION ?
                    <MFASelection />
                    : viewState === MFAViewStates.EMAIL ?
                    <MFACode />
                    : viewState === MFAViewStates.MOBILE_APP &&
                    <MobileAuthenticator />
                }
            </AnimatePresence>
        </>
    )
}
export default MFA