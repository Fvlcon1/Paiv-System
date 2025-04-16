import { DropdownItem } from "@/utils/@types";
import { useClaimsFormContext } from "../../context/context";
import useDrugs from "./useDrugs";

const useDropdownItems = () => {
    const {formik, handleAddMedicalProcedure, handleAddLabTest, drugFormik} = useClaimsFormContext()
    const {drugItems} = useDrugs()
    // const {serviceItems : labTestItems} = useServices()
    // const {serviceItems : medicalProcedureItems} = useMedicalProcedures()

    const mainConditionItems: DropdownItem[] = [
        { key: "I10", label: "I10 - Chronic diarrhoea (> 2 weeks)", onClick: () => formik.setFieldValue("diagnosis", "I10") },
        { type: "divider", key: "divider-1" },
        { key: "bacterial_gastroenteritis", label: "bacterial_gastroenteritis", onClick: () => formik.setFieldValue("diagnosis", "bacterial_gastroenteritis") },
        { type: "divider", key: "divider-2" },
        { key: "N18", label: "N18 - Acute Hepatitis", onClick: () => formik.setFieldValue("diagnosis", "N18") },
        { type: "divider", key: "divider-3" },
        { key: "I25", label: "I25 - Plasma Cell Myeloma", onClick: () => formik.setFieldValue("diagnosis", "I25") },
        { type: "divider", key: "divider-4" },
        { key: "J45", label: "J45 - Asthma", onClick: () => formik.setFieldValue("diagnosis", "J45") },
        { type: "divider", key: "divider-5" },
        { key: "J44", label: "J44 - Chronic Obstructive Pulmonary Disease (COPD)", onClick: () => formik.setFieldValue("diagnosis", "J44") },
        { type: "divider", key: "divider-6" },
        { key: "J18", label: "J18 - Pneumonia (J18)", onClick: () => formik.setFieldValue("diagnosis", "J18 - Pneumonia") },
        { type: "divider", key: "divider-7" },
        { key: "I63", label: "I63 - Stroke (Cerebrovascular Accident) (I63)", onClick: () => formik.setFieldValue("diagnosis", "I63") },
    ];

    const medicalProcedureItems: DropdownItem[] = [
        { key: "99123", label: "Blood film for malaria parasites", onClick: () => handleAddMedicalProcedure("Blood film for malaria parasites") },
        { type: "divider", key: "divider-1" },
        { key: "INVE98D", label: "(INVE98D) Stool routine examination", onClick: () => handleAddMedicalProcedure("INVE98D") },
        { type: "divider", key: "divider-2" },
        { key: "INVE19E", label: "(INVE19E) Stool for culture and sensitivity", onClick: () => handleAddMedicalProcedure("INVE19E") },
        { type: "divider", key: "divider-3" },
        { key: "INVE20D", label: "(INVE20D) Blood urea and creatinine", onClick: () => handleAddMedicalProcedure("INVE20D") },
        { type: "divider", key: "divider-4" },
        { key: "INVE06E", label: "(INVE06E) Creatinine", onClick: () => handleAddMedicalProcedure("INVE06E") },
        { type: "divider", key: "divider-20" },
        { key: "31600", label: "Proctoscopy (the gold standard for diagnosis", onClick: () => handleAddMedicalProcedure("Proctoscopy (the gold standard for diagnosis") },
        { type: "divider", key: "divider-5" },
        { key: "99213", label: "Sigmoidoscopy (to exclude carcinoma of rectum)", onClick: () => handleAddMedicalProcedure("Sigmoidoscopy (to exclude carcinoma of rectum)") },
        { type: "divider", key: "divider-6" },
        { key: "316001", label: "Liver function tests", onClick: () => handleAddMedicalProcedure("Liver function tests") },
        { type: "divider", key: "divider-7" },
        { key: "INVE105", label: "(INVE105) Hepatitis screen (HBsAg, HCV Antibody, Hepatitis A IgM, Hepatitis EIgM)", onClick: () => handleAddMedicalProcedure("INVE105") },
        { type: "divider", key: "divider-8" },
        { key: "316003", label: "Abdominal Ultrasound", onClick: () => handleAddMedicalProcedure("Abdominal Ultrasound") },
        { type: "divider", key: "divider-9" },
        { key: "INVE51D", label: "(INVE51D) FBC", onClick: () => handleAddMedicalProcedure("INVE51D") },
        { type: "divider", key: "divider-10" },
        { key: "316005", label: "Blood film commen", onClick: () => handleAddMedicalProcedure("Blood film commen") },
        { type: "divider", key: "divider-11" },
        { key: "992136", label: "Chest X-ray", onClick: () => handleAddMedicalProcedure("Chest X-ray") },
        { type: "divider", key: "divider-12" },
        { key: "316007", label: "abdominal USG", onClick: () => handleAddMedicalProcedure("abdominal USG") },
        { type: "divider", key: "divider-13" },
        { key: "992138", label: "CT scan", onClick: () => handleAddMedicalProcedure("CT scan") },
        { type: "divider", key: "divider-14" },
        { key: "316009", label: "trephine biopsy", onClick: () => handleAddMedicalProcedure("trephine biopsy") },
        { type: "divider", key: "divider-15" },
        { key: "9921310", label: "Lymph node biopsy", onClick: () => handleAddMedicalProcedure("Lymph node biopsy") },
        { type: "divider", key: "divider-16" },
        { key: "3160011", label: "Fine needle aspiration", onClick: () => handleAddMedicalProcedure("Fine needle aspiration") },
        { type: "divider", key: "divider-17" },
        { key: "INVE23D", label: "(INVE23D) Bone marrow aspirate", onClick: () => handleAddMedicalProcedure("INVE23D") },
        // { type: "divider", key: "divider-18" },
        // { key: "99213", label: "General Consultation (99213)", onClick: () => handleAddMedicalProcedure("Chest X-ray") },
        // { type: "divider", key: "divider-19" },
        // { key: "31600", label: "Endoscopy (31600)", onClick: () => handleAddMedicalProcedure("abdominal USG") },
        // { type: "divider", key: "divider-20" },
    ];

    const labTestItems: DropdownItem[] = [
        { key: "99123", label: "Blood film for malaria parasites", onClick: () => handleAddLabTest("Blood film for malaria parasites") },
        { type: "divider", key: "divider-1" },
        { key: "INVE98D", label: "(INVE98D) Stool routine examination", onClick: () => handleAddLabTest("INVE98D") },
        { type: "divider", key: "divider-2" },
        { key: "INVE19E", label: "(INVE19E) Stool for culture and sensitivity", onClick: () => handleAddLabTest("INVE19E") },
        { type: "divider", key: "divider-3" },
        { key: "electrolytes", label: "electrolytes", onClick: () => handleAddLabTest("electrolytes") },
        { type: "divider", key: "divider-21" },
        { key: "INVE20D", label: "(INVE20D) Blood urea", onClick: () => handleAddLabTest("INVE20D") },
        { type: "divider", key: "divider-4" },
        { key: "INVE06E", label: "(INVE06E) Creatinine", onClick: () => handleAddLabTest("INVE06E") },
        { type: "divider", key: "divider-20" },
        { key: "31600", label: "Proctoscopy (the gold standard for diagnosis", onClick: () => handleAddLabTest("Proctoscopy (the gold standard for diagnosis") },
        { type: "divider", key: "divider-5" },
        { key: "99213", label: "Sigmoidoscopy (to exclude carcinoma of rectum)", onClick: () => handleAddLabTest("Sigmoidoscopy (to exclude carcinoma of rectum)") },
        { type: "divider", key: "divider-6" },
        { key: "316001", label: "Liver function tests", onClick: () => handleAddLabTest("Liver function tests") },
        { type: "divider", key: "divider-7" },
        { key: "INVE105", label: "(INVE105) Hepatitis screen (HBsAg, HCV Antibody, Hepatitis A IgM, Hepatitis EIgM)", onClick: () => handleAddLabTest("INVE105") },
        { type: "divider", key: "divider-8" },
        { key: "316003", label: "Abdominal Ultrasound", onClick: () => handleAddLabTest("Abdominal Ultrasound") },
        { type: "divider", key: "divider-9" },
        { key: "INVE51D", label: "(INVE51D) FBC", onClick: () => handleAddLabTest("INVE51D") },
        { type: "divider", key: "divider-10" },
        { key: "316005", label: "Blood film commen", onClick: () => handleAddLabTest("Blood film commen") },
        { type: "divider", key: "divider-11" },
        { key: "992136", label: "Chest X-ray", onClick: () => handleAddLabTest("Chest X-ray") },
        { type: "divider", key: "divider-12" },
        { key: "316007", label: "abdominal USG", onClick: () => handleAddLabTest("abdominal USG") },
        { type: "divider", key: "divider-13" },
        { key: "992138", label: "CT scan", onClick: () => handleAddLabTest("CT scan") },
        { type: "divider", key: "divider-14" },
        { key: "316009", label: "trephine biopsy", onClick: () => handleAddLabTest("trephine biopsy") },
        { type: "divider", key: "divider-15" },
        { key: "9921310", label: "Lymph node biopsy", onClick: () => handleAddLabTest("Lymph node biopsy") },
        { type: "divider", key: "divider-16" },
        { key: "3160011", label: "Fine needle aspiration", onClick: () => handleAddLabTest("Fine needle aspiration") },
        { type: "divider", key: "divider-17" },
        { key: "INVE23D", label: "(INVE23D) Bone marrow aspirate", onClick: () => handleAddLabTest("INVE23D") },
        // { type: "divider", key: "divider-18" },
        // { key: "99213", label: "General Consultation (99213)", onClick: () => handleAddLabTest("Chest X-ray") },
        // { type: "divider", key: "divider-19" },
        // { key: "31600", label: "Endoscopy (31600)", onClick: () => handleAddLabTest("abdominal USG") },
        // { type: "divider", key: "divider-20" },
    ];

    // const labTestItems: DropdownItem[] = [
    //     { key: "R79.0", label: "Blood Glucose Test (R79.0)", onClick: () => formik.setFieldValue("labTests", "R79.0") },
    //     { type: "divider", key: "divider-1" },
    //     { key: "Z13.6", label: "Lipid Profile Test (Z13.6)", onClick: () => formik.setFieldValue("labTests", "Z13.6") },
    //     { type: "divider", key: "divider-2" },
    //     { key: "Z11.3", label: "HIV Screening (Z11.3)", onClick: () => formik.setFieldValue("labTests", "Z11.3") },
    //     { type: "divider", key: "divider-3" },
    //     { key: "Z11.4", label: "Hepatitis B Screening (Z11.4)", onClick: () => formik.setFieldValue("labTests", "Z11.4") },
    //     { type: "divider", key: "divider-4" },
    //     { key: "R10.9", label: "Urine Analysis (R10.9)", onClick: () => formik.setFieldValue("labTests", "R10.9") },
    //     { type: "divider", key: "divider-5" },
    //     { key: "Z01.89", label: "Electrolyte Panel (Z01.89)", onClick: () => formik.setFieldValue("labTests", "Z01.89") },
    //     { type: "divider", key: "divider-6" }
    // ];

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