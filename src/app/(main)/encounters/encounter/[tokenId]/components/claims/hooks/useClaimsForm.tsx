'use client'

import { useFormik } from "formik";
import validationSchema, { drugValidationSchema } from "../utils/validationSchema";
import { useState, useCallback, useEffect, useRef } from "react";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEncounterContext } from "../../../context/encounter.context";
import { IDiagnosisType, IServicesType } from "../utils/types";

const useClaimsForm = () => {
    const { getEncounterMutation, setShowClaims } = useEncounterContext();
    const { tokenId } = useParams();
    const [labTestValue, setLabtestValue] = useState("");
    const [medicalProcedure, setMedicalProcedure] = useState("");
    const [diagnosis, setDiagnosis] = useState("")

    const formik = useFormik({
        initialValues: {
            diagnosis: [] as IDiagnosisType[],
            medicalProcedures: [] as IServicesType[],
            serviceOutcome : "",
            serviceType1 : "",
            serviceType2 : "",
            specialties : [] as string[],
            typeofAttendance : "",
            drugs: [] as any[],
            labTests: [] as IServicesType[],
        },
        validationSchema,
        onSubmit: async (values) => {
            handleClaimSubmitMutation(values);
        },
    });
    
    const formikRef = useRef<any>(null)
    formikRef.current = formik

    useEffect(() => {
        formikRef.current = formik;
    }, [formik]);

    const handleClaimsSubmit = async (values: typeof formik.values) => {
        try {
            // const response = await protectedApi.POST("claims/submit", {
            //     diagnosis: values.diagnosis,
            //     encounter_token: tokenId,
            //     service_type: ["any"],
            //     drugs: values.drugs,
            //     medical_procedures: values.medicalProcedures,
            //     lab_tests: values.labTests,
            //     serviceOutcome : values.serviceOutcome,
            //     serviceType1 : values.serviceType1,
            //     serviceType2 : values.serviceType2,
            //     specialties : values.specialties,
            //     typeofAttendance : values.typeofAttendance,
            // });
            // return response;
            console.log({values})
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
        console.log("handleAddDrug")
        let drugs = formikRef.current?.values.drugs;

        //remove existing drug
        if (drugs.find((item: any) => item.code === drugFormik.values.code)) {
            drugs = drugs.filter((item: any) => item.code !== drugFormik.values.code);
        }

        //add new drug
        const newDrugs = [
            ...drugs, 
            { 
                code: drugFormik.values.code, 
                frequency: drugFormik.values.frequency,
                duration: drugFormik.values.duration,
                description : drugFormik.values.description,
                tariff : drugFormik.values.tariff,
                unitOfPricing : drugFormik.values.unitOfPricing,
                levelOfPriscription : drugFormik.values.levelOfPriscription,
             }
        ];
        formik.setFieldValue("drugs", newDrugs);
        drugFormik.resetForm();
    };

    const drugFormik = useFormik({
        initialValues: {
            code: "",
            frequency : "",
            duration : "",
            description : "",
            tariff : 0,
            unitOfPricing : "",
            levelOfPriscription : "",
        },
        validationSchema: drugValidationSchema,
        onSubmit: handleAddDrug,
    });

    const handleAddDiagnosis = useCallback((diagnosis: IDiagnosisType) => {
        formik.setFieldValue("diagnosis", [...formikRef.current?.values.diagnosis, diagnosis]);
    }, [formikRef]);

    const handleAddLabTest = useCallback((test: IServicesType) => {
        formik.setFieldValue("labTests", [...formikRef.current?.values.labTests, test]);
    }, [formikRef]);

    const handleAddMedicalProcedure = useCallback((procedure: IServicesType) => {
        formik.setFieldValue("medicalProcedures", [...formikRef.current?.values.medicalProcedures, procedure]);
    }, [formikRef]);

    const handleRemoveDiagnosis = useCallback((diagnosis: IDiagnosisType) => {
        formik.setFieldValue(
            "diagnosis",
            formik.values.diagnosis.filter((item) => item !== diagnosis)
        );
    }, [formik]);

    const handleRemoveLabTest = useCallback((test: IServicesType) => {
        formik.setFieldValue(
            "labTests",
            formik.values.labTests.filter((item) => item !== test)
        );
    }, [formik]);

    const handleRemoveMedicalProcedure = useCallback((procedure: IServicesType) => {
        formik.setFieldValue(
            "medicalProcedures",
            formik.values.medicalProcedures.filter((item) => item !== procedure)
        );
    }, [formik]);

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
        handleRemoveDiagnosis,
        handleAddDiagnosis,
        drugFormik,
        setMedicalProcedure,
        medicalProcedure,
        isClaimSubmissionPending,
        labTestValue,
        setLabtestValue,
        diagnosis,
        setDiagnosis
    };
};

export default useClaimsForm;
