import { AnimatePresence } from "framer-motion"
import { useEncounterContext } from "../context/encounter.context"
import { ViewState } from "../utils/types"
import CaptureContainer from "./capture container/captureContainer"
import VeficationFailed from "./capture container/components/verificationFailed"
import Instructions from "./instructions/instructions"
import VerificationSelection from "./verification selection/verificationSelection"
import VerificationSuccessfulContainer from "./verification successful container/verificationSuccessfulContainer"
import FingerPrint from "./fingerprint/fingerprint"

const VerificationStates = () => {
    const {viewState} = useEncounterContext()
    return (
        <AnimatePresence>
            {
                viewState === ViewState.VERIFICATION_SELECTION
                ? <VerificationSelection key={1} />
                : viewState === ViewState.FINGERPRINT
                ? <FingerPrint key={2} />
                : viewState === ViewState.INSTRUCTIONS
                ? <Instructions key={3} />
                : viewState === ViewState.CAPTURE
                ? <CaptureContainer key={4} />
                : viewState === ViewState.VERIFICATION_SUCCESS
                ? <VerificationSuccessfulContainer key={5} />
                : viewState === ViewState.VERIFICATION_FAILED
                ? <VeficationFailed key={6} />
                : <></>
            }
        </AnimatePresence>
    )
}
export default VerificationStates