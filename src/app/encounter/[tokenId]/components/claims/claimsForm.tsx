'use client'

import Container from "@components/container/container"
import Dropdown from "@components/dropdown/dropdown"
import Input from "@components/input/input"
import Overlay from "@components/overlay/overlay"
import Text from "@styles/components/text"
import { useFormik } from "formik"
import { useState } from "react"
import validationSchema from "./utils/validationSchema"
import theme from "@styles/theme"
import { FaChevronDown } from "react-icons/fa"
import Divider from "@components/divider/divider"
import { GiCaduceus } from "react-icons/gi"
import Button from "@components/button/button"
import { DropdownItem } from "@/utils/@types"
import Chip from "./components/chip/chip"
import { drugValidationSchema } from './utils/validationSchema';
import { useEncounterContext } from "../../context/encounter.context"
import { TypographyBold } from "@styles/style.types"

interface addClaimsType {
    encounterToken : string
    serviceType : string[]
    disgnosis : string
    drugs : {
        code : string,
        quantity : number
    }[]
    medicalProcedures : string[]
    labTests : string[]
}

const ClaimsForm = ({
    close
} : {
    close : ()=>void
}) => {
    const [display, setDisplay] = useState(true)
    const [patientSearchValue, setPatientSearchValue] = useState("")
    const [medicalProcedure, setMedicalProcedure] = useState<string>("")
    const {encounterDetails} = useEncounterContext()
    const [labTest, setLabtest] = useState("")

    const getInitials = (text: string): string => {
        const words = text.trim().split(' ');
        const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
        return initials;
    }          

    const formik = useFormik({
        initialValues: {
          diagnosis: "",
          medicalProcedures: [],
          drugs: [],
          labTests: [],
          serviceType: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("ddjfk")
            console.log("Form Submitted:", values);
        },
    });

    const handleAddDrug = () => {
        let drugs = formik.values.drugs

        //check if drug is already added
        if(drugs.find((item : any) => item.code === drugFormik.values.code)){
           drugs = handleRemoveDrug(drugFormik.values.code)
        }

        //add procedure
        const newDrugs = [...drugs, {code : drugFormik.values.code, quantity : drugFormik.values.quantity}]
        formik.setFieldValue("drugs", newDrugs)
        drugFormik.setFieldValue("code", "")
        drugFormik.setFieldValue("quantity", 1)
    }

    const drugFormik = useFormik({
        initialValues : {
            code : "",
            quantity : 1
        },
        validationSchema : drugValidationSchema,
        onSubmit : handleAddDrug
    })

    const handleRemoveMedicalProcedure = (procedure:string) => {
        const procedures = formik.values.medicalProcedures
        const newProcedures = procedures.filter((item) => item !== procedure)
        formik.setFieldValue("medicalProcedures", newProcedures)
    }

    const handleAddLabTest = (test:string) => {
        setLabtest("")
        const tests = formik.values.labTests

        //check if test is already added
        if(tests.find((item) => item === test))
            return

        //add test
        const newTests = [...tests, test]
        formik.setFieldValue("labTests", newTests)
    }

    const handleRemoveLabTest = (test:string) => {
        const tests = formik.values.labTests
        const newTests = tests.filter((item) => item !== test)
        formik.setFieldValue("labTests", newTests)
    }

    const handleAddMedicalProcedure = (procedure:string) => {
        setMedicalProcedure("")
        const procedures = formik.values.medicalProcedures

        //check if procedure is already added
        if(procedures.find((item) => item === procedure))
            return

        //add procedure
        const newProcedures = [...procedures, procedure]
        formik.setFieldValue("medicalProcedures", newProcedures)
    }

    const handleRemoveDrug = (drugName:string) => {
        const drugs = formik.values.drugs
        const newDrugs = drugs.filter((item : any) => item.code !== drugName)
        formik.setFieldValue("drugs", newDrugs)
        return newDrugs
    }

    const mainConditionItems: DropdownItem[] = [
        { key: "I10", label: "Hypertension (I10)", onClick: () => formik.setFieldValue("diagnosis", "I10") },
        { type: "divider", key: "divider-1" },
        { key: "E11", label: "Type 2 Diabetes Mellitus (E11)", onClick: () => formik.setFieldValue("diagnosis", "E11") },
        { type: "divider", key: "divider-2" },
        { key: "N18", label: "Chronic Kidney Disease (N18)", onClick: () => formik.setFieldValue("diagnosis", "N18") },
        { type: "divider", key: "divider-3" },
        { key: "I25", label: "Ischemic Heart Disease (I25)", onClick: () => formik.setFieldValue("diagnosis", "I25") },
        { type: "divider", key: "divider-4" },
        { key: "J45", label: "Asthma (J45)", onClick: () => formik.setFieldValue("diagnosis", "J45") },
        { type: "divider", key: "divider-5" },
        { key: "J44", label: "Chronic Obstructive Pulmonary Disease (COPD) (J44)", onClick: () => formik.setFieldValue("diagnosis", "J44") },
        { type: "divider", key: "divider-6" },
        { key: "J18", label: "Pneumonia (J18)", onClick: () => formik.setFieldValue("diagnosis", "J18") },
        { type: "divider", key: "divider-7" },
        { key: "I63", label: "Stroke (Cerebrovascular Accident) (I63)", onClick: () => formik.setFieldValue("diagnosis", "I63") },
        { type: "divider", key: "divider-8" },
        { key: "I50", label: "Heart Failure (I50)", onClick: () => formik.setFieldValue("diagnosis", "I50") },
        { type: "divider", key: "divider-9" },
        { key: "K70", label: "Liver Disease (K70)", onClick: () => formik.setFieldValue("diagnosis", "K70") },
        { type: "divider", key: "divider-10" },
        { key: "A09", label: "Gastroenteritis (A09)", onClick: () => formik.setFieldValue("diagnosis", "A09") },
        { type: "divider", key: "divider-11" },
        { key: "D64", label: "Anemia (D64)", onClick: () => formik.setFieldValue("diagnosis", "D64") },
        { type: "divider", key: "divider-12" },
        { key: "A15", label: "Tuberculosis (A15)", onClick: () => formik.setFieldValue("diagnosis", "A15") },
        { type: "divider", key: "divider-13" },
        { key: "B54", label: "Malaria (B54)", onClick: () => formik.setFieldValue("diagnosis", "B54") },
        { type: "divider", key: "divider-14" },
        { key: "A41", label: "Sepsis (A41)", onClick: () => formik.setFieldValue("diagnosis", "A41") },
        { type: "divider", key: "divider-15" },
        { key: "A90", label: "Dengue Fever (A90)", onClick: () => formik.setFieldValue("diagnosis", "A90") },
        { type: "divider", key: "divider-16" },
        { key: "U07.1", label: "COVID-19 (U07.1)", onClick: () => formik.setFieldValue("diagnosis", "U07.1") },
        { type: "divider", key: "divider-17" },
        { key: "K27", label: "Peptic Ulcer Disease (K27)", onClick: () => formik.setFieldValue("diagnosis", "K27") },
        { type: "divider", key: "divider-18" },
        { key: "G40", label: "Epilepsy (G40)", onClick: () => formik.setFieldValue("diagnosis", "G40") },
        { type: "divider", key: "divider-19" },
        { key: "C80", label: "Cancer (C80)", onClick: () => formik.setFieldValue("diagnosis", "C80") },
        { type: "divider", key: "divider-20" }
    ];

    const medicalProcedureItems: DropdownItem[] = [
        { key: "99123", label: "CT Scan (99123)", onClick: () => handleAddMedicalProcedure("CT Scan (99123)") },
        { type: "divider", key: "divider-1" },
        { key: "93000", label: "Electrocardiogram (ECG) (93000)", onClick: () => handleAddMedicalProcedure("Electrocardiogram (ECG) (93000)") },
        { type: "divider", key: "divider-2" },
        { key: "72148", label: "MRI Scan (72148)", onClick: () => handleAddMedicalProcedure("MRI Scan (72148)") },
        { type: "divider", key: "divider-3" },
        { key: "85025", label: "Complete Blood Count (CBC) (85025)", onClick: () => handleAddMedicalProcedure("Complete Blood Count (CBC) (85025)") },
        { type: "divider", key: "divider-4" },
        { key: "31600", label: "Endoscopy (31600)", onClick: () => handleAddMedicalProcedure("Endoscopy (31600)") },
        { type: "divider", key: "divider-5" },
        { key: "99213", label: "General Consultation (99213)", onClick: () => handleAddMedicalProcedure("General Consultation (99213)") },
        { type: "divider", key: "divider-6" }
    ];

    const labTestItems: DropdownItem[] = [
        { key: "R79.0", label: "Blood Glucose Test (R79.0)", onClick: () => handleAddLabTest("R79.0") },
        { type: "divider", key: "divider-1" },
        { key: "Z13.6", label: "Lipid Profile Test (Z13.6)", onClick: () => handleAddLabTest("Z13.6") },
        { type: "divider", key: "divider-2" },
        { key: "Z11.3", label: "HIV Screening (Z11.3)", onClick: () => handleAddLabTest("Z11.3") },
        { type: "divider", key: "divider-3" },
        { key: "Z11.4", label: "Hepatitis B Screening (Z11.4)", onClick: () => handleAddLabTest("Z11.4") },
        { type: "divider", key: "divider-4" },
        { key: "R10.9", label: "Urine Analysis (R10.9)", onClick: () => handleAddLabTest("R10.9") },
        { type: "divider", key: "divider-5" },
        { key: "Z01.89", label: "Electrolyte Panel (Z01.89)", onClick: () => handleAddLabTest("Z01.89") },
        { type: "divider", key: "divider-6" }
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

    const drugItems: DropdownItem[] = [
        { key: "Aspirin", label: "Aspirin (100mg)", onClick: () => drugFormik.setFieldValue("code", "Aspirin") },
        { type: "divider", key: "divider-1" },
        { key: "Paracetamol", label: "Paracetamol (500mg)", onClick: () => drugFormik.setFieldValue("code", "Paracetamol") },
        { type: "divider", key: "divider-2" },
        { key: "Ibuprofen", label: "Ibuprofen (200mg)", onClick: () => drugFormik.setFieldValue("code", "Ibuprofen") },
        { type: "divider", key: "divider-3" },
        { key: "Amoxicillin", label: "Amoxicillin (250mg)", onClick: () => drugFormik.setFieldValue("code", "Amoxicillin") },
        { type: "divider", key: "divider-4" },
        { key: "Lisinopril", label: "Lisinopril (10mg)", onClick: () => drugFormik.setFieldValue("code", "Lisinopril") },
        { type: "divider", key: "divider-5" },
        { key: "Metformin", label: "Metformin (500mg)", onClick: () => drugFormik.setFieldValue("code", "Metformin") },
        { type: "divider", key: "divider-6" },
        { key: "Simvastatin", label: "Simvastatin (20mg)", onClick: () => drugFormik.setFieldValue("code", "Simvastatin") },
        { type: "divider", key: "divider-7" },
        { key: "Atorvastatin", label: "Atorvastatin (40mg)", onClick: () => drugFormik.setFieldValue("code", "Atorvastatin") },
        { type: "divider", key: "divider-8" },
        { key: "Losartan", label: "Losartan (50mg)", onClick: () => drugFormik.setFieldValue("code", "Losartan") },
        { type: "divider", key: "divider-9" },
        { key: "Furosemide", label: "Furosemide (20mg)", onClick: () => drugFormik.setFieldValue("code", "Furosemide") },
        { type: "divider", key: "divider-10" },
        { key: "Hydrochlorothiazide", label: "Hydrochlorothiazide (25mg)", onClick: () => drugFormik.setFieldValue("code", "Hydrochlorothiazide") },
        { type: "divider", key: "divider-11" },
        { key: "Prednisone", label: "Prednisone (5mg)", onClick: () => drugFormik.setFieldValue("code", "Prednisone") },
        { type: "divider", key: "divider-12" },
        { key: "Omeprazole", label: "Omeprazole (20mg)", onClick: () => drugFormik.setFieldValue("code", "Omeprazole") },
        { type: "divider", key: "divider-13" },
        { key: "Gabapentin", label: "Gabapentin (300mg)", onClick: () => drugFormik.setFieldValue("code", "Gabapentin") },
        { type: "divider", key: "divider-14" },
        { key: "Clopidogrel", label: "Clopidogrel (75mg)", onClick: () => drugFormik.setFieldValue("code", "Clopidogrel") },
        { type: "divider", key: "divider-15" }
    ];      
    
    return (
        <Overlay onClick={close}>
            <Container 
                display={display}
                setDisplay={setDisplay}
                onClose={close}
                className="!w-[700px] !h-[700px]"
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full py-8 px-8 overflow-y-auto">
                    <div className="flex flex-col w-full gap-2">
                        <Text 
                            fontfamily="greater-theory"
                            className="pl-1"
                        >
                            Add Claim
                        </Text>
                        <Divider />
                    </div>
                    <div className="flex gap-1 py-1 pl-1 pr-3 rounded-full w-fit bg-bg-quantinary items-center">
                        <div className="rounded-full bg-green-700 flex h-[30px] w-[30px] justify-center items-center">
                            <Text
                                bold={TypographyBold.md2}
                            >
                                {getInitials(`${encounterDetails?.firstname} ${encounterDetails?.lastname}`)}
                            </Text>
                        </div>
                        <Text
                            bold={TypographyBold.md}
                        >
                            {`${encounterDetails?.firstname}${encounterDetails?.othernames ? ` ${encounterDetails?.othernames}` : ''} ${encounterDetails?.lastname}`}
                        </Text>
                    </div>
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
                                        Diagnosis
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
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            value={formik.values.diagnosis}
                                            onChange={formik.handleChange}
                                            name="diagnosis"
                                            placeholder="Select primary diagnosis"
                                            className="!flex !flex-1"
                                            PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                            PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                        />
                                        {
                                            formik.errors.diagnosis &&
                                            <Text textColor="#db3e1f">
                                                {formik.errors.diagnosis}
                                            </Text>
                                        }
                                    </div>
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
                                    menuItems={medicalProcedureItems}
                                >
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            value={medicalProcedure}
                                            setValue={setMedicalProcedure}
                                            placeholder="Select medical procedure"
                                            className="!flex !flex-1"
                                            PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                            PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                        />
                                        {
                                            formik.errors.medicalProcedures &&
                                            <Text textColor="#db3e1f">
                                                {formik.errors.medicalProcedures}
                                            </Text>
                                        }
                                    </div>
                                </Dropdown>
                                <div className="flex gap-2 flex-wrap">
                                    {
                                        formik.values.medicalProcedures.map((procedure, index) => (
                                            <Chip key={index} onClick={()=>handleRemoveMedicalProcedure(procedure)}>
                                                <Text key={index}>
                                                    {procedure}
                                                </Text>
                                            </Chip>
                                        ))
                                    }
                                </div>
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
                                <div className="flex gap-2 justify-between">
                                    <Dropdown 
                                        className="!w-full"
                                        outterContainerClassName="!w-[70%]"
                                        menuItems={drugItems}
                                    >
                                        <div className="flex flex-col gap-1">
                                            <Input
                                                value={drugFormik.values.code}
                                                onChange={drugFormik.handleChange}
                                                name="code"
                                                placeholder="Select prescribed drugs"
                                                className="!flex !w-full"
                                                PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                                PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                            />
                                            {
                                                drugFormik.errors.code &&
                                                <Text textColor="#db3e1f">
                                                    {drugFormik.errors.code}
                                                </Text>
                                            }
                                        </div>
                                    </Dropdown>
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            value={drugFormik.values.quantity}
                                            onChange={drugFormik.handleChange}
                                            name="quantity"
                                            placeholder="Quantity"
                                            type="number"
                                            className="!flex !h-fit"
                                        />
                                        {
                                            drugFormik.errors.quantity &&
                                            <Text textColor="#db3e1f">
                                                {drugFormik.errors.quantity}
                                            </Text>
                                        }
                                    </div>
                                    <Button 
                                        text="+"
                                        className="!w-fit !bg-green-700"
                                        onClick={(e) => drugFormik.handleSubmit()}
                                    />
                                </div>
                                {
                                    formik.errors.drugs &&
                                    <Text textColor="#db3e1f">
                                        {formik.errors.drugs}
                                    </Text>
                                }
                                <div className="flex gap-2 flex-wrap">
                                    {
                                        formik.values.drugs.map((drug, index) => (
                                            <Chip key={index} onClick={()=>handleRemoveDrug((drug as any).code)}>
                                                <Text key={index}>
                                                    {`${(drug as any).code} (Qty: ${(drug as any).quantity})`}
                                                </Text>
                                            </Chip>
                                        ))
                                    }
                                </div>
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
                                    <div className="flex flex-col gap-1">
                                        <Input
                                            value={patientSearchValue}
                                            setValue={setPatientSearchValue}
                                            placeholder="Select lab tests"
                                            className="!flex !flex-1"
                                            PostIcon={<FaChevronDown color={theme.colors.text.tetiary} size={12} />}
                                            PreIcon={<GiCaduceus color={theme.colors.text.tetiary} size={12} />}
                                        />
                                        {
                                            formik.errors.labTests &&
                                            <Text textColor="#db3e1f">
                                                {formik.errors.labTests}
                                            </Text>
                                        }
                                    </div>
                                </Dropdown>
                                <div className="flex gap-2 flex-wrap">
                                    {
                                        formik.values.labTests.map((test, index) => (
                                            <Chip key={index} onClick={()=>handleRemoveLabTest(test)}>
                                                <Text key={index}>
                                                    {test}
                                                </Text>
                                            </Chip>
                                        ))
                                    }
                                </div>
                            </div>

                            <Divider />
                        </div>
                    </div>
                    <div className="flex w-full justify-end">
                        <Button 
                            text="Submit Claim"
                            className="!bg-main-primary"
                            onClick={(e)=>formik.handleSubmit(e as any)}
                        />
                    </div>
                </form>
            </Container>
        </Overlay>
    )
}
export default ClaimsForm