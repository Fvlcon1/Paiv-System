'use client'

import Container from "@components/container/container"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { useFormik } from "formik"
import { useState } from "react"
import validationSchema from "../utils/validationSchema"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import Divider from "@components/divider/divider"
import { GiCaduceus } from "react-icons/gi"
import Button from "@components/button/button"
import { DropdownItem } from "@/utils/@types"

const ClaimsForm = ({
    close
} : {
    close : ()=>void
}) => {
    const [display, setDisplay] = useState(true)
    const [patientSearchValue, setPatientSearchValue] = useState("")

    const formik = useFormik({
        initialValues: {
          primaryDiagnosis: "",
          secondaryDiagnosis: "",
          medicalProcedures: [],
          drugs: [{ name: "", strength: "", dosage: "", quantity: 1 }],
          labTests: [],
          consumables: [],
          serviceType: "",
        },
        validationSchema,
        onSubmit: async (values) => {
          console.log("Form Submitted:", values);
        },
    });

    const mainConditionItems: DropdownItem[] = [
        { key: "I10", label: "Hypertension (I10)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I10") },
        { type: "divider", key: "divider-1" },
        { key: "E11", label: "Type 2 Diabetes Mellitus (E11)", onClick: () => formik.setFieldValue("primaryDiagnosis", "E11") },
        { type: "divider", key: "divider-2" },
        { key: "N18", label: "Chronic Kidney Disease (N18)", onClick: () => formik.setFieldValue("primaryDiagnosis", "N18") },
        { type: "divider", key: "divider-3" },
        { key: "I25", label: "Ischemic Heart Disease (I25)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I25") },
        { type: "divider", key: "divider-4" },
        { key: "J45", label: "Asthma (J45)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J45") },
        { type: "divider", key: "divider-5" },
        { key: "J44", label: "Chronic Obstructive Pulmonary Disease (COPD) (J44)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J44") },
        { type: "divider", key: "divider-6" },
        { key: "J18", label: "Pneumonia (J18)", onClick: () => formik.setFieldValue("primaryDiagnosis", "J18") },
        { type: "divider", key: "divider-7" },
        { key: "I63", label: "Stroke (Cerebrovascular Accident) (I63)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I63") },
        { type: "divider", key: "divider-8" },
        { key: "I50", label: "Heart Failure (I50)", onClick: () => formik.setFieldValue("primaryDiagnosis", "I50") },
        { type: "divider", key: "divider-9" },
        { key: "K70", label: "Liver Disease (K70)", onClick: () => formik.setFieldValue("primaryDiagnosis", "K70") },
        { type: "divider", key: "divider-10" },
        { key: "A09", label: "Gastroenteritis (A09)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A09") },
        { type: "divider", key: "divider-11" },
        { key: "D64", label: "Anemia (D64)", onClick: () => formik.setFieldValue("primaryDiagnosis", "D64") },
        { type: "divider", key: "divider-12" },
        { key: "A15", label: "Tuberculosis (A15)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A15") },
        { type: "divider", key: "divider-13" },
        { key: "B54", label: "Malaria (B54)", onClick: () => formik.setFieldValue("primaryDiagnosis", "B54") },
        { type: "divider", key: "divider-14" },
        { key: "A41", label: "Sepsis (A41)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A41") },
        { type: "divider", key: "divider-15" },
        { key: "A90", label: "Dengue Fever (A90)", onClick: () => formik.setFieldValue("primaryDiagnosis", "A90") },
        { type: "divider", key: "divider-16" },
        { key: "U07.1", label: "COVID-19 (U07.1)", onClick: () => formik.setFieldValue("primaryDiagnosis", "U07.1") },
        { type: "divider", key: "divider-17" },
        { key: "K27", label: "Peptic Ulcer Disease (K27)", onClick: () => formik.setFieldValue("primaryDiagnosis", "K27") },
        { type: "divider", key: "divider-18" },
        { key: "G40", label: "Epilepsy (G40)", onClick: () => formik.setFieldValue("primaryDiagnosis", "G40") },
        { type: "divider", key: "divider-19" },
        { key: "C80", label: "Cancer (C80)", onClick: () => formik.setFieldValue("primaryDiagnosis", "C80") },
        { type: "divider", key: "divider-20" }
    ];    

    const secondaryConditionItems: DropdownItem[] = [
        { key: "E78", label: "Dyslipidemia (E78)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "E78") },
        { type: "divider", key: "divider-1" },
        { key: "G47", label: "Sleep Apnea (G47)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "G47") },
        { type: "divider", key: "divider-2" },
        { key: "M81", label: "Osteoporosis (M81)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "M81") },
        { type: "divider", key: "divider-3" },
        { key: "E03", label: "Hypothyroidism (E03)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "E03") },
        { type: "divider", key: "divider-4" },
        { key: "R10", label: "Abdominal Pain (R10)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "R10") },
        { type: "divider", key: "divider-5" },
        { key: "J30", label: "Allergic Rhinitis (J30)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "J30") },
        { type: "divider", key: "divider-6" },
        { key: "F41", label: "Anxiety Disorder (F41)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "F41") },
        { type: "divider", key: "divider-7" },
        { key: "F32", label: "Depression (F32)", onClick: () => formik.setFieldValue("secondaryDiagnosis", "F32") },
        { type: "divider", key: "divider-8" }
    ];

    const medicalProcedureItems: DropdownItem[] = [
        { key: "99123", label: "CT Scan (99123)", onClick: () => formik.setFieldValue("medicalProcedures", "99123") },
        { type: "divider", key: "divider-1" },
        { key: "93000", label: "Electrocardiogram (ECG) (93000)", onClick: () => formik.setFieldValue("medicalProcedures", "93000") },
        { type: "divider", key: "divider-2" },
        { key: "72148", label: "MRI Scan (72148)", onClick: () => formik.setFieldValue("medicalProcedures", "72148") },
        { type: "divider", key: "divider-3" },
        { key: "85025", label: "Complete Blood Count (CBC) (85025)", onClick: () => formik.setFieldValue("medicalProcedures", "85025") },
        { type: "divider", key: "divider-4" },
        { key: "31600", label: "Endoscopy (31600)", onClick: () => formik.setFieldValue("medicalProcedures", "31600") },
        { type: "divider", key: "divider-5" },
        { key: "99213", label: "General Consultation (99213)", onClick: () => formik.setFieldValue("medicalProcedures", "99213") },
        { type: "divider", key: "divider-6" }
    ];

    const labTestItems: DropdownItem[] = [
        { key: "R79.0", label: "Blood Glucose Test (R79.0)", onClick: () => formik.setFieldValue("labTests", "R79.0") },
        { type: "divider", key: "divider-1" },
        { key: "Z13.6", label: "Lipid Profile Test (Z13.6)", onClick: () => formik.setFieldValue("labTests", "Z13.6") },
        { type: "divider", key: "divider-2" },
        { key: "Z11.3", label: "HIV Screening (Z11.3)", onClick: () => formik.setFieldValue("labTests", "Z11.3") },
        { type: "divider", key: "divider-3" },
        { key: "Z11.4", label: "Hepatitis B Screening (Z11.4)", onClick: () => formik.setFieldValue("labTests", "Z11.4") },
        { type: "divider", key: "divider-4" },
        { key: "R10.9", label: "Urine Analysis (R10.9)", onClick: () => formik.setFieldValue("labTests", "R10.9") },
        { type: "divider", key: "divider-5" },
        { key: "Z01.89", label: "Electrolyte Panel (Z01.89)", onClick: () => formik.setFieldValue("labTests", "Z01.89") },
        { type: "divider", key: "divider-6" }
    ];

    const consumableItems: DropdownItem[] = [
        { key: "C1", label: "Syringe (C1)", onClick: () => formik.setFieldValue("consumables", "C1") },
        { type: "divider", key: "divider-1" },
        { key: "C2", label: "Gloves (C2)", onClick: () => formik.setFieldValue("consumables", "C2") },
        { type: "divider", key: "divider-2" },
        { key: "C3", label: "Face Mask (C3)", onClick: () => formik.setFieldValue("consumables", "C3") },
        { type: "divider", key: "divider-3" },
        { key: "C4", label: "IV Fluids (C4)", onClick: () => formik.setFieldValue("consumables", "C4") },
        { type: "divider", key: "divider-4" },
        { key: "C5", label: "Catheter (C5)", onClick: () => formik.setFieldValue("consumables", "C5") },
        { type: "divider", key: "divider-5" }
    ];

    const serviceTypeItems: DropdownItem[] = [
        { key: "OPD", label: "Outpatient Consultation (OPD)", onClick: () => formik.setFieldValue("serviceType", "OPD") },
        { type: "divider", key: "divider-1" },
        { key: "IPD", label: "Inpatient Admission (IPD)", onClick: () => formik.setFieldValue("serviceType", "IPD") },
        { type: "divider", key: "divider-2" },
        { key: "ER", label: "Emergency Services (ER)", onClick: () => formik.setFieldValue("serviceType", "ER") },
        { type: "divider", key: "divider-3" },
        { key: "S1", label: "Surgery (S1)", onClick: () => formik.setFieldValue("serviceType", "S1") },
        { type: "divider", key: "divider-4" },
        { key: "L1", label: "Laboratory Services (L1)", onClick: () => formik.setFieldValue("serviceType", "L1") },
        { type: "divider", key: "divider-5" },
        { key: "T1", label: "Telemedicine (T1)", onClick: () => formik.setFieldValue("serviceType", "T1") },
        { type: "divider", key: "divider-6" }
    ];

    
    
    return (
        <Overlay onClick={close}>
            <Container 
                display={display}
                setDisplay={setDisplay}
                onClose={close}
                className="!w-[700px] !h-[700px]"
            >
                <div className="flex flex-col gap-6 w-full py-8 px-8 overflow-y-auto">
                    <div className="flex flex-col w-full gap-2">
                        <Text 
                            fontfamily="greater-theory"
                            className="pl-1"
                        >
                            Add Claim
                        </Text>
                        <Divider />
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <div className="flex flex-col pl-1">
                            <Text 
                                fontfamily="greater-theory"
                            >
                                Select Patient
                            </Text>
                            <Text
                                textColor={theme.colors.text.tetiary}
                            >
                                Search for a patient by name, NHIS ID, or token. The patient must be checked in and checked out before submitting a claim.
                            </Text>
                        </div>
                        <Dropdown >
                            <Input
                                value={patientSearchValue}
                                setValue={setPatientSearchValue}
                                placeholder="Search by name, NHIS ID, or token"
                                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                            />
                        </Dropdown>
                    </div>
                    <Divider />
                    <div className="flex flex-col gap-2 w-full">
                        <Text
                            fontfamily="greater-theory"
                            className="!pl-1"
                        >
                            Diagnosis & Treatment Details
                        </Text>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Primary Diagnosis
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select the main condition diagnosed (ICD-10 code).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1 !h-[300px]"
                                    outterContainerClassName="flex-1"
                                    menuItems={mainConditionItems}
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select primary diagnosis"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Secondary Diagnosis
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select any additional conditions diagnosed (if applicable).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                    menuItems={secondaryConditionItems}
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select secondary diagnosis"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Medical Procedures
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select any procedures performed during treatment (procedure codes).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select medical procedure"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Drugs
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select prescribed medications (generic name, strength, dosage).
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select prescribed drugs"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Lab Tests
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select laboratory tests conducted during diagnosis.
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                    menuItems={labTestItems}
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select lab tests"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>

                            <Divider />

                            <div className="w-full flex flex-col justify-between gap-2">
                                <div className="flex flex-col pl-1">
                                    <Text>
                                        Consumables
                                    </Text>
                                    <Text textColor={theme.colors.text.tetiary}>
                                        Select medical consumables used during treatment.
                                    </Text>
                                </div>
                                <Dropdown 
                                    className="flex-1"
                                    outterContainerClassName="flex-1"
                                >
                                    <Input
                                        value={patientSearchValue}
                                        setValue={setPatientSearchValue}
                                        placeholder="Select consumables"
                                        className="!flex !flex-1"
                                        PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                        PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                    />
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button 
                            text="Submit Claim"
                            className="!bg-main-primary"
                        />
                    </div>
                </div>
            </Container>
        </Overlay>
    )
}
export default ClaimsForm
