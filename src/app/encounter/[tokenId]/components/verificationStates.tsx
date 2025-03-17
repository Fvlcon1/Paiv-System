import { useEncounterContext } from "../context/encounter.context"
import { ViewState } from "../utils/types"
import CaptureContainer from "./capture container/captureContainer"
import Instructions from "./instructions/instructions"
import VerificationSelection from "./verification selection/verificationSelection"
import VerificationSuccessfulContainer from "./verification successful container/verificationSuccessfulContainer"

const VerificationStates = () => {
    const {viewState} = useEncounterContext()
    return (
        viewState === ViewState.VERIFICATION_SELECTION
        ? <VerificationSelection />
        : viewState === ViewState.INSTRUCTIONS
        ? <Instructions />
        : viewState === ViewState.CAPTURE
        ? <CaptureContainer />
        : viewState === ViewState.VERIFICATION_SUCCESS
        ? <VerificationSuccessfulContainer />
        : <></>
    )
}
export default VerificationStates