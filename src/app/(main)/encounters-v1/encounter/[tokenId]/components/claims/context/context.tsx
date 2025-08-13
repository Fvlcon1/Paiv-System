import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";
import useClaimsForm from "../hooks/useClaimsForm";
import { IDiagnosisType, IServicesType, IClaimsDetailType } from "../utils/types";

type ClaimsFormContextType = {
    formik: any;
    handleRemoveDrug: (drugName: string) => void;
    handleAddMedicalProcedure: (procedure: IServicesType) => void;
    handleRemoveLabTest: (test: IServicesType) => void;
    handleAddLabTest: (test: IServicesType) => void;
    handleRemoveMedicalProcedure: (procedure: IServicesType) => void;
    handleAddDrug: () => void;
    drugFormik: any;
    setMedicalProcedure: Dispatch<SetStateAction<string>>;
    medicalProcedure: string;
    isClaimSubmissionPending: boolean
    labTestValue: string
    setLabtestValue: Dispatch<SetStateAction<string>>
    handleRemoveDiagnosis: (diagnosis: IDiagnosisType) => void;
    handleAddDiagnosis: (diagnosis: IDiagnosisType) => void;
    diagnosis: string
    setDiagnosis: Dispatch<SetStateAction<string>>
    updatePrimaryDiagnosis: (diagnosis: IDiagnosisType) => void
    handleDraftSubmitMutation: (values: any) => void;
    isDraftSubmissionPending: boolean
    draft?: IClaimsDetailType
    draftLoading: boolean
};

// Create context with a better default value
const ClaimsFormContext = createContext<ClaimsFormContextType | undefined>(undefined);

export const ClaimsContextProvider = ({ children }: { children: ReactNode }) => {
    const {
        formik,
        handleRemoveDrug,
        handleAddMedicalProcedure,
        handleRemoveLabTest,
        handleAddLabTest,
        handleRemoveMedicalProcedure,
        handleAddDrug,
        drugFormik,
        setMedicalProcedure,
        medicalProcedure,
        isClaimSubmissionPending,
        labTestValue,
        setLabtestValue,
        handleRemoveDiagnosis,
        handleAddDiagnosis,
        diagnosis,
        setDiagnosis,
        updatePrimaryDiagnosis,
        handleDraftSubmitMutation,
        isDraftSubmissionPending,
        draft,
        draftLoading
    } = useClaimsForm();

    return (
        <ClaimsFormContext.Provider
            value={{
                formik,
                handleRemoveDrug,
                handleAddMedicalProcedure,
                handleRemoveLabTest,
                handleAddLabTest,
                handleRemoveMedicalProcedure,
                handleAddDrug,
                drugFormik,
                setMedicalProcedure,
                medicalProcedure,
                isClaimSubmissionPending,
                labTestValue,
                setLabtestValue,
                handleRemoveDiagnosis,
                handleAddDiagnosis,
                diagnosis,
                setDiagnosis,
                updatePrimaryDiagnosis,
                handleDraftSubmitMutation,
                isDraftSubmissionPending,
                draft,
                draftLoading
            }}
        >
            {children}
        </ClaimsFormContext.Provider>
    );
};

export const useClaimsFormContext = () => {
    const context = useContext(ClaimsFormContext);
    if (!context) {
        throw new Error("useClaimsFormContext must be used within a ClaimsContextProvider");
    }
    return context;
};
