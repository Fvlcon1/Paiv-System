import { AnimatePresence } from "framer-motion"
import { useEncounterContext } from "../context/encounter.context"
import { ViewState } from "../utils/types"
import CaptureContainer from "./capture container/captureContainer"
import VeficationFailed from "./capture container/components/verificationFailed"
import Instructions from "./instructions/instructions"
import VerificationSelection from "./verification selection/verificationSelection"
import VerificationSuccessfulContainer from "./verification successful container/verificationSuccessfulContainer"

const VerificationStates = () => {
    const {viewState} = useEncounterContext()
    return (
        <AnimatePresence>
            {
                viewState === ViewState.VERIFICATION_SELECTION
                ? <VerificationSelection key={1} />
                : viewState === ViewState.INSTRUCTIONS
                ? <Instructions key={2} />
                : viewState === ViewState.CAPTURE
                ? <CaptureContainer key={3} />
                : viewState === ViewState.VERIFICATION_SUCCESS
                ? <VerificationSuccessfulContainer key={4} />
                : viewState === ViewState.VERIFICATION_FAILED
                ? <VeficationFailed key={5} />
                : <></>
            }
        </AnimatePresence>
    )
}
export default VerificationStates