'use client'

import Divider from "@components/divider/divider"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import PatientBanner from "../patientBanner"
import ServiceType from "./components/form inputs/serviceType"
import ServiceOutcome from "./components/form inputs/serviceOutcome.tsx"
import TypeofAttendance from "./components/form inputs/typeofAttendance"
import Specialties from "./components/form inputs/specialties"
import Diagnosis from "./components/form inputs/diagnosis"
import MedicalProcedures from "./components/form inputs/medicalProcedures"
import Drugs from "./components/form inputs/drugs"
import LabTests from "./components/form inputs/labTests"
import Button from "@components/button/button"
import OutlineButton from "@components/button/outlineButton"
import { MdSaveAs } from "react-icons/md"
import { useClaimsFormContext } from "../../context/context"
import Sidenav from "./components/side-nav"
import { gradientClass } from "@/utils/constants"

const Form = ({
    setShowClaimsDetails
}: {
    setShowClaimsDetails: (show: boolean) => void
}) => {
    const { draftLoading, formik, handleDraftSubmitMutation, isDraftSubmissionPending } = useClaimsFormContext()

    const handleShowClaims = async (e: any) => {
        e.preventDefault();
        const errors = await formik.validateForm();
        if (Object.keys(errors).length !== 0)
            return formik.handleSubmit()
        setShowClaimsDetails(true)
    };

    return (
        <div className="flex justify-center relative">
            <div className="w-[700px] rounded-2xl">
                {
                    draftLoading ?
                        <div className="flex items-center justify-center w-full h-[500px] flex-col gap-2">
                            <div className="normal-loader !bg-main-primary" />
                            <Text textColor={theme.colors.text.primary}>
                                Loading Draft...
                            </Text>
                        </div>
                        :
                        <form onSubmit={handleShowClaims} className="flex flex-col gap-2 w-full overflow-y-auto">
                            <Text
                                className={gradientClass + " pl-1"}
                                size={theme.text.size.HM}
                                bold={theme.text.bold.md2}
                            >
                                Claims Form
                            </Text>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-col gap-6 w-full">
                                    <ServiceType />
                                    <ServiceOutcome />
                                    <TypeofAttendance />
                                    <Specialties />
                                    <MedicalProcedures />
                                    <Diagnosis />
                                    <Drugs />
                                    <LabTests />
                                </div>
                            </div>
                            <div className="flex w-full justify-end gap-2">
                                <OutlineButton
                                    text="Save Draft"
                                    type="button"
                                    icon={<MdSaveAs size={15} />}
                                    onClick={() => handleDraftSubmitMutation(formik.values)}
                                    loading={isDraftSubmissionPending}
                                />
                                <Button
                                    text="Preview Claim"
                                    className="!bg-main-primary !w-[120px]"
                                />
                            </div>
                        </form>
                }
            </div>
        </div>
    )
}
export default Form