'use client'

import { useFormik } from "formik";
import validationSchema, { drugValidationSchema } from "../utils/validationSchema";
import { useState, useCallback, useEffect, useRef } from "react";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEncounterContext } from "../../../context/encounter.context";

const useClaimsForm = () => {
    const { getEncounterMutation, setShowClaims } = useEncounterContext();
    const { tokenId } = useParams();
    const [labTestValue, setLabtestValue] = useState("");
    const [medicalProcedure, setMedicalProcedure] = useState("");

    const formik = useFormik({
        initialValues: {
            diagnosis: "",
            medicalProcedures: [] as string[],
            serviceOutcome : "",
            serviceType1 : "",
            serviceType2 : "",
            specialties : [] as string[],
            typeofAttendance : "",
            drugs: [] as any[],
            labTests: [] as string[],
        },
        validationSchema,
        onSubmit: async (values) => {
            handleClaimSubmitMutation(values);
        },
    });

    const handleClaimsSubmit = async (values: typeof formik.values) => {
        try {
            const response = await protectedApi.POST("claims/submit", {
                diagnosis: values.diagnosis,
                encounter_token: tokenId,
                service_type: ["any"],
                drugs: values.drugs,
                medical_procedures: values.medicalProcedures,
                lab_tests: values.labTests,
                serviceOutcome : values.serviceOutcome,
                serviceType1 : values.serviceType1,
                serviceType2 : values.serviceType2,
                specialties : values.specialties,
                typeofAttendance : values.typeofAttendance,
            });
            return response;
        } catch (error) {
            toast.error("Failed to submit claims. Please try again.");
            throw error;
        }
    };

    const { mutate: handleClaimSubmitMutation, isPending: isClaimSubmissionPending } = useMutation({
        mutationFn: handleClaimsSubmit,
        onSuccess: () => {
            setShowClaims(false);
            toast.success("Claims submitted successfully");
            getEncounterMutation();
        },
        onError: () => {
            toast.error("Submission failed. Try again.");
        }
    });

    const handleAddDrug = () => {
        let drugs = formik.values.drugs;

        if (drugs.find((item: any) => item.code === drugFormik.values.code)) {
            drugs = drugs.filter((item: any) => item.code !== drugFormik.values.code);
        }

        const newDrugs = [
            ...drugs, 
            { 
                code: drugFormik.values.code, 
                frequency: drugFormik.values.frequency,
                duration: drugFormik.values.duration
             }
        ];
        formik.setFieldValue("drugs", newDrugs);
        drugFormik.resetForm();
    };

    const drugFormik = useFormik({
        initialValues: {
            code: "",
            frequency : "",
            duration : ""
        },
        validationSchema: drugValidationSchema,
        onSubmit: handleAddDrug,
    });

    const handleRemoveMedicalProcedure = (procedure: string) => {
        formik.setFieldValue(
            "medicalProcedures",
            formik.values.medicalProcedures.filter((item) => item !== procedure)
        );
    };

    const handleAddLabTest = (test: string) => {
        if (!formik.values.labTests.includes(test as never)) {
            formik.setFieldValue("labTests", [...formik.values.labTests, test]);
        }
        setLabtestValue("");
    };

    const handleRemoveLabTest = (test: string) => {
        formik.setFieldValue(
            "labTests",
            formik.values.labTests.filter((item) => item !== test)
        );
    };

    useEffect(()=>{
        console.log({medicalProcedures : formik.values.medicalProcedures})
    },[formik.values.medicalProcedures])
    
    const handleAddMedicalProcedure = (procedure: string) => {
        const currentProcedures = [...formik.values.medicalProcedures];
        // Now this will work without type errors
        currentProcedures.push(procedure);
        
        // Update the form
        formik.setFieldValue("medicalProcedures", currentProcedures);
        
        // Clear input
        setMedicalProcedure("");
        
        console.log("Updated procedures:", currentProcedures);
    }

    const handleRemoveDrug = (drugCode: string) => {
        formik.setFieldValue(
            "drugs",
            formik.values.drugs.filter((item: any) => item.code !== drugCode)
        );
    };

    return {
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
    };
};

export default useClaimsForm;
