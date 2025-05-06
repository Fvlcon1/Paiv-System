'use client'

import Container from "@components/container/container"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { useEffect, useState } from "react"
import Divider from "@components/divider/divider"
import Button from "@components/button/button"
import { useClaimsFormContext } from "./context/context"
import Diagnosis from "./components/form inputs/diagnosis"
import MedicalProcedures from "./components/form inputs/medicalProcedures"
import Drugs from "./components/form inputs/drugs"
import LabTests from "./components/form inputs/labTests"
import PatientBanner from "./components/patientBanner"
import { MdSaveAs } from "react-icons/md"
import ClaimDetails from "./components/claimDetails/claimDetails"
import { IClaimsDetailType } from "./utils/types"
import OutlineButton from "@components/button/outlineButton"
import ServiceType from "./components/form inputs/serviceType"
import ServiceOutcome from "./components/form inputs/serviceOutcome.tsx"
import TypeofAttendance from "./components/form inputs/typeofAttendance"
import Specialties from "./components/form inputs/specialties"
import '@ant-design/v5-patch-for-react-19';
import { convertToClaimsDetails } from "./utils/convertToClaimsDetails"

const ClaimsForm = ({
    close
} : {
    close : ()=>void
}) => {
    const {formik, isClaimSubmissionPending} = useClaimsFormContext()
    const [showClaimsDetails, setShowClaimsDetails] = useState(false)
    const [claimDetails, setClaimDetails] = useState<IClaimsDetailType>()

    const handleShowClaims = async (e:any) => {
        e.preventDefault();
        const errors = await formik.validateForm();
        if (Object.keys(errors).length !== 0)
            return formik.handleSubmit()
        setShowClaimsDetails(true)
    };

    useEffect(()=>{
        const claimsDetails = convertToClaimsDetails(formik.values)
        setClaimDetails(claimsDetails)
    },[formik.values])
    
    return (
        <>
            <ClaimDetails 
                isVisible={showClaimsDetails}
                close={()=>setShowClaimsDetails(false)}
                claimDetails={claimDetails}
                onSubmit={formik.handleSubmit}
                loading={isClaimSubmissionPending}
            />
            <Overlay onClick={close}>
                <Container
                    close={close}
                    className="!w-[700px] !h-[90%]"
                >
                    {
                        <form onSubmit={handleShowClaims} className="flex flex-col gap-6 w-full py-8 px-8 overflow-y-auto">
                            <div className="flex flex-col w-full gap-2">
                                <Text 
                                    fontfamily="greater-theory"
                                    className="pl-1"
                                >
                                    Add Claim
                                </Text>
                                <Divider />
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full">
                                <Text
                                    fontfamily="greater-theory"
                                    className="!pl-1"
                                >
                                    Diagnosis & Treatment Details
                                </Text>
                                <div className="flex flex-col gap-6 w-full">
                                    <PatientBanner />
                                    <Divider />
                                    <ServiceType />
                                    <Divider />
                                    <ServiceOutcome />
                                    <Divider />
                                    <TypeofAttendance />
                                    <Divider />
                                    <Specialties />
                                    <Divider />
                                    <Diagnosis />
                                    <Divider />
                                    <MedicalProcedures />
                                    <Divider />
                                    <Drugs />
                                    <Divider />
                                    <LabTests />
                                    <Divider />
                                </div>
                            </div>
                            <div className="flex w-full justify-end gap-2">
                                <OutlineButton 
                                    text="Save Draft"
                                    type="button"
                                    icon={<MdSaveAs size={15} />}
                                />
                                <Button 
                                    text="Submit Claim"
                                    className="!bg-main-primary !w-[120px]"
                                />
                            </div>
                        </form>
                    }
                </Container>
            </Overlay>
        </>
    )
}

export default ClaimsForm