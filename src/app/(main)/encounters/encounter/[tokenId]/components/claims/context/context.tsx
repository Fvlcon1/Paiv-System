import { createContext, Dispatch, ReactNode, SetStateAction, useContext } from "react";
import useClaimsForm from "../hooks/useClaimsForm";

type ClaimsFormContextType = {
    formik: any;
    handleRemoveDrug: (drugName: string) => void;
    handleAddMedicalProcedure: (procedure: string) => void;
    handleRemoveLabTest: (test: string) => void;
    handleAddLabTest: (test: string) => void;
    handleRemoveMedicalProcedure: (procedure: string) => void;
    handleAddDrug: () => void;
    drugFormik: any;
    setMedicalProcedure: Dispatch<SetStateAction<string>>;
    medicalProcedure: string;
    isClaimSubmissionPending: boolean
    labTestValue: string
    setLabtestValue: Dispatch<SetStateAction<string>>
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
        setLabtestValue
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
                setLabtestValue
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
