import { DropdownItem } from "@/utils/@types";
import { useClaimsFormContext } from "../../context/context";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import useDrugs from "./useDrugs";
import useServices from './useServices';

const useDropdownItems = () => {
    const {formik, handleAddMedicalProcedure, handleAddLabTest, drugFormik} = useClaimsFormContext()
    const {drugItems} = useDrugs()
    const {serviceItems : labTestItems} = useServices()

    const mainConditionItems: DropdownItem[] = [
        { key: "I10", label: "Hypertension (I10)", onClick: () => formik.setFieldValue("diagnosis", "Hypertension") },
        { type: "divider", key: "divider-1" },
        { key: "E11", label: "Type 2 Diabetes Mellitus (E11)", onClick: () => formik.setFieldValue("diagnosis", "Type 2 Diabetes Mellitus") },
        { type: "divider", key: "divider-2" },
        { key: "N18", label: "Chronic Kidney Disease (N18)", onClick: () => formik.setFieldValue("diagnosis", "Chronic Kidney Disease") },
        { type: "divider", key: "divider-3" },
        { key: "I25", label: "Ischemic Heart Disease (I25)", onClick: () => formik.setFieldValue("diagnosis", "Ischemic Heart Disease") },
        { type: "divider", key: "divider-4" },
        { key: "J45", label: "Asthma (J45)", onClick: () => formik.setFieldValue("diagnosis", "Asthma") },
        { type: "divider", key: "divider-5" },
        { key: "J44", label: "Chronic Obstructive Pulmonary Disease (COPD) (J44)", onClick: () => formik.setFieldValue("diagnosis", "Chronic Obstructive Pulmonary Disease") },
        { type: "divider", key: "divider-6" },
        { key: "J18", label: "Pneumonia (J18)", onClick: () => formik.setFieldValue("diagnosis", "Pneumonia") },
        { type: "divider", key: "divider-7" },
        { key: "I63", label: "Stroke (Cerebrovascular Accident) (I63)", onClick: () => formik.setFieldValue("diagnosis", "Stroke (Cerebrovascular Accident)") },
        { type: "divider", key: "divider-8" },
        { key: "I50", label: "Heart Failure (I50)", onClick: () => formik.setFieldValue("diagnosis", "Heart Failure") },
        { type: "divider", key: "divider-9" },
        { key: "K70", label: "Liver Disease (K70)", onClick: () => formik.setFieldValue("diagnosis", "Liver Disease") },
        { type: "divider", key: "divider-10" },
        { key: "A09", label: "Gastroenteritis (A09)", onClick: () => formik.setFieldValue("diagnosis", "Gastroenteritis") },
        { type: "divider", key: "divider-11" },
        { key: "D64", label: "Anemia (D64)", onClick: () => formik.setFieldValue("diagnosis", "Anemia") },
        { type: "divider", key: "divider-12" },
        { key: "A15", label: "Tuberculosis (A15)", onClick: () => formik.setFieldValue("diagnosis", "Tuberculosis") },
        { type: "divider", key: "divider-13" },
        { key: "B54", label: "Malaria (B54)", onClick: () => formik.setFieldValue("diagnosis", "Malaria") },
        { type: "divider", key: "divider-14" },
        { key: "A41", label: "Sepsis (A41)", onClick: () => formik.setFieldValue("diagnosis", "Sepsis") },
        { type: "divider", key: "divider-15" },
        { key: "A90", label: "Dengue Fever (A90)", onClick: () => formik.setFieldValue("diagnosis", "Dengue Fever") },
        { type: "divider", key: "divider-16" },
        { key: "U07.1", label: "COVID-19 (U07.1)", onClick: () => formik.setFieldValue("diagnosis", "COVID-19") },
        { type: "divider", key: "divider-17" },
        { key: "K27", label: "Peptic Ulcer Disease (K27)", onClick: () => formik.setFieldValue("diagnosis", "Peptic Ulcer Disease") },
        { type: "divider", key: "divider-18" },
        { key: "G40", label: "Epilepsy (G40)", onClick: () => formik.setFieldValue("diagnosis", "Epilepsy") },
        { type: "divider", key: "divider-19" },
        { key: "C80", label: "Cancer (C80)", onClick: () => formik.setFieldValue("diagnosis", "Cancer") },
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

    return {
        mainConditionItems, 
        drugItems,
        serviceTypeItems,
        labTestItems,
        medicalProcedureItems
    }
}
export default useDropdownItems