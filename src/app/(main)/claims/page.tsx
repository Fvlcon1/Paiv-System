'use client'
import SlideIn from "@styles/components/slidein"
import TableHead from "./components/table-head"
import TableBodySorted from "./components/table-body-sorted"
import Top from "./components/top"
import ConfirmationModal from "@components/modals/confirmation-modal/confirmation-modal"
import { useClaimsContext } from "./context/claims-context"
import BatchDetailsSlider from "./components/batch-details-slider"

const HospitalPage = () => {
    const { showSubmitModal, setShowSubmitModal } = useClaimsContext()
    return (
        <>
            <BatchDetailsSlider />
            <ConfirmationModal
                isVisible={showSubmitModal}
                close={() => setShowSubmitModal(false)}
                onConfirm={() => { }}
            />
            <SlideIn
                direction="right"
                className="w-full flex flex-col gap-2 py-4"
            >
                <Top />
                <TableHead />
                <TableBodySorted />
            </SlideIn>
        </>
    )
}
export default HospitalPage