import { useMainContext } from "@/app/context/context"
import { DispositionViewState } from "@/app/utils/types"
import { AnimatePresence } from "framer-motion"
import NhisDetails from "./components/nhisDetails"
import SelectDisposition from "./components/selectDisposition"
import Instructions from "./components/instructions"
import CaptureContainer from "./components/capture container/captureContainer"
import VeficationFailed from "./components/capture container/components/verificationFailed"
import VerificationSuccessfulContainer from "./components/verification successful container/verificationSuccessfulContainer"
import { useEncounterContext } from "../../context/encounter.context"

const Disposition = () => {
    const {dispositionViewState} = useEncounterContext()

    return (
        <AnimatePresence>
            {
                dispositionViewState === DispositionViewState.NHIS_DETAILS ? 
                <NhisDetails key={0} />
                : dispositionViewState === DispositionViewState.SELECT_DISPOSITION ? 
                <SelectDisposition key={1} />
                : dispositionViewState === DispositionViewState.INSTRUCTIONS ? 
                <Instructions key={3} />
                : dispositionViewState === DispositionViewState.CAPTURE ? 
                <CaptureContainer key={4} />
                : dispositionViewState === DispositionViewState.VERIFICATION_SUCCESS ? 
                <VerificationSuccessfulContainer key={5} />
                : dispositionViewState === DispositionViewState.VERIFICATION_FAILED ? 
                <VeficationFailed key={6} />
                :
                <></>
            }
        </AnimatePresence>
    )
}
export default Disposition