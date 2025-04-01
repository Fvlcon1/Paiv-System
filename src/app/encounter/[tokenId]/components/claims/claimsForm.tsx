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

const ClaimsForm = ({
    close
} : {
    close : ()=>void
}) => {
    const [display, setDisplay] = useState(true)
    const {formik, isLoading, isClaimSubmissionPending} = useClaimsFormContext()
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        formik.handleSubmit();
    };
    
    return (
        <Overlay onClick={close}>
            <Container 
                display={display}
                setDisplay={setDisplay}
                onClose={close}
                className="!w-[700px] !h-[700px]"
            >
                {
                    isLoading ?
                    <div className="w-full flex h-full justify-center items-center"><div className="normal-loader"></div></div>
                    :
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full py-8 px-8 overflow-y-auto">
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
                        <div className="flex w-full justify-end">
                            <Button 
                                text="Submit Claim"
                                className="!bg-main-primary !w-[120px]"
                                loading={isClaimSubmissionPending}
                            />
                        </div>
                    </form>
                }
            </Container>
        </Overlay>
    )
}
export default ClaimsForm