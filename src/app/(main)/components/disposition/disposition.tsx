import { useMainContext } from "@/app/context/context"
import { DispositionViewState } from "@/app/utils/types"
import { AnimatePresence } from "framer-motion"
import NhisDetails from "./components/nhisDetails"
import SelectDisposition from "./components/selectDisposition"
import Instructions from "./components/instructions"
import CaptureContainer from "./components/capture container/captureContainer"
import VeficationFailed from "./components/capture container/components/verificationFailed"
import VerificationSuccessfulContainer from "./components/verification successful container/verificationSuccessfulContainer"

const Disposition = () => {
    const {dispositionViewState} = useMainContext()

    return (
        <AnimatePresence>
            {
                dispositionViewState === DispositionViewState.NHIS_DETAILS ? 
                <NhisDetails />
                // : dispositionViewState === DispositionViewState.SELECT_DISPOSITION ? 
                // <SelectDisposition />
                : dispositionViewState === DispositionViewState.INSTRUCTIONS ? 
                <Instructions />
                : dispositionViewState === DispositionViewState.CAPTURE ? 
                <CaptureContainer />
                : dispositionViewState === DispositionViewState.VERIFICATION_SUCCESS ? 
                <VerificationSuccessfulContainer />
                : dispositionViewState === DispositionViewState.VERIFICATION_FAILED ? 
                <VeficationFailed />
                :
                <></>
            }
        </AnimatePresence>
    )
}
export default Disposition