'use client'

import { useFormik } from "formik";
import validationSchema, { drugValidationSchema } from "../utils/validationSchema";
import { useState, useCallback, useEffect, useRef } from "react";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEncounterContext } from "../../context/encounter.context";
import { IClaimsDetailType, IDiagnosisType, IMedicalProceduresType, IServicesType } from "../utils/types";
import { convertToClaimsDetails } from "../utils/convertToClaimsDetails";
import { v4 as uuidv4 } from 'uuid';

const useClaimsForm = () => {
    const { getEncounterMutation, setShowClaims } = useEncounterContext();
    const { tokenId } = useParams();
    const [labTestValue, setLabtestValue] = useState("");
    const [medicalProcedure, setMedicalProcedure] = useState("");
    const [diagnosis, setDiagnosis] = useState("")
    const [draft, setDraft] = useState<IClaimsDetailType>()
    const {encounterDetails} = useEncounterContext()

    const formik = useFormik({
        initialValues: {
            diagnosis: [] as IDiagnosisType[],
            medicalProcedures: [{ id: uuidv4(), gdrg: '', icd10: '', procedure: '', date: null }] as IMedicalProceduresType[],
            serviceOutcome : "",
            serviceType1 : "",
            serviceType2 : "",
            specialties : [] as string[],
            typeofAttendance : "",
            drugs: [] as any[],
            labTests: [] as IServicesType[],
            pharmacy : false
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

    const convertToClaimSubmissionData = (values: typeof formik.values) => {
        const details = convertToClaimsDetails(values)
        return {
            ...details,
            diagnosis_total : details.diagnosisTotal,
            encounter_token: tokenId,
            service_type: [values.serviceType1],
            drugs : details.drugs?.map((drug) => ({
                ...drug, 
                generic_name : drug.description,
                duration : `${drug.duration}`,
                frequency : `${drug.frequency}`,
            })),
            medical_procedures : details.medicalProcedures,
            lab_tests : details.labTests,
            expected_payout : details.expectedPayout,
            medical_procedures_total : details.medicalProceduresTotal,
            lab_tests_total : details.labTestsTotal,
            drugs_total : details.drugsTotal,
            service_type_1 : values.serviceType1,
            service_type_2 : values.serviceType2,
            service_outcome : values.serviceOutcome,
            type_of_attendance : values.typeofAttendance,
        }
    }

    const getDraft = async () => {
        const response = await protectedApi.GET(`/claim-drafts/${tokenId}`)
        return response
    }

    const setDraftDetails = (data : any) => {
        //Inclue generic_name
        const formatDrugs = data.drugs?.map((drug : any) => ({
            ...drug,
            description : drug.generic_name,
        }))

        if(data.diagnosis?.length) 
            formik.setFieldValue("diagnosis", data.diagnosis)
        if(data.medical_procedures?.length)
            formik.setFieldValue("medicalProcedures", data.medical_procedures)
        if(data.lab_tests?.length)
            formik.setFieldValue("labTests", data.lab_tests)
        if(data.drugs?.length)
            formik.setFieldValue("drugs", formatDrugs)
        if(data.service_type_1)
            formik.setFieldValue("serviceType1", data.service_type_1)
        if(data.service_type_2)
            formik.setFieldValue("serviceType2", data.service_type_2)
        if(data.service_outcome)
            formik.setFieldValue("serviceOutcome", data.service_outcome)
        if(data.type_of_attendance)
            formik.setFieldValue("typeofAttendance", data.type_of_attendance)
        if(data.specialties?.length)
            formik.setFieldValue("specialties", data.specialties)
        if(data.medical_procedures_total)
            formik.setFieldValue("medicalProceduresTotal", data.medical_procedures_total)
        if(data.lab_tests_total)
            formik.setFieldValue("labTestsTotal", data.lab_tests_total)
        if(data.drugs_total)
            formik.setFieldValue("drugsTotal", data.drugs_total)
        if(data.expectedPayout)
            formik.setFieldValue("expectedPayout", data.expectedPayout)
        console.log({formikvalues: formik.values})
    }

    const { mutate: getDraftMutation, isPending: draftLoading } = useMutation({
        mutationFn: getDraft,
        onSuccess: (data) => {
            setDraftDetails(data)
        },
        onError: (error) => {
            console.log({error})
        }
    })

    useEffect(() => {
        if (!encounterDetails?.claimSubmissionAt) {
            getDraftMutation()
        }
    }, [])

    const handleDraftSubmit = async (values: typeof formik.values) => {
        const details = convertToClaimSubmissionData(values)
        const response = await protectedApi.POST("/claim-drafts/", {...details});
        return response;
    }

    const { mutate: handleDraftSubmitMutation, isPending: isDraftSubmissionPending } = useMutation({
        mutationFn: handleDraftSubmit,
        onSuccess: () => {
            toast.success("Draft Saved Successfully");
        },
        onError: () => {
            toast.error("Failed to save draft. Please try again.");
        }
    });

    const handleClaimsSubmit = async (values: typeof formik.values) => {
        try {
            const details = convertToClaimSubmissionData(values)
            const response = await protectedApi.POST("claims/submit", {...details});
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

    const updatePrimaryDiagnosis = (diagnosis : IDiagnosisType) => {
        const diagnosisList = [...formikRef.current?.values.diagnosis]
        diagnosisList.forEach((item : IDiagnosisType) => {
            if(item.primary)
                item.primary = false
        })
        const diagnosisItem = diagnosisList.find((item : IDiagnosisType) => item.ICD10 === diagnosis.ICD10)
        if(diagnosisItem)
            diagnosisItem.primary = true
        formik.setFieldValue("diagnosis", diagnosisList);
    }

    useEffect(()=>{
        const diagnosisList = [...formik.values.diagnosis]
        const primaryDiagnosis = diagnosisList.find((item : IDiagnosisType) => item.primary)
        if(!primaryDiagnosis && formik.values.diagnosis.length > 0)
            return updatePrimaryDiagnosis(diagnosisList[0])
    }, [formik])

    const handleAddDiagnosis = useCallback((diagnosis: IDiagnosisType) => {
        const diagnosisList = [...formikRef.current?.values.diagnosis]
        if(diagnosisList.find((item : IDiagnosisType) => item.ICD10 === diagnosis.ICD10))
            return
        diagnosisList.push(diagnosis)
        formik.setFieldValue("diagnosis", diagnosisList);
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

    const handleRemoveMedicalProcedure = useCallback((index : number) => {
        const updated = formik.values.medicalProcedures.filter((_ : any, i : number) => i !== index);
        formik.setFieldValue('medicalProcedures', updated);
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
        updatePrimaryDiagnosis,
        drugFormik,
        setMedicalProcedure,
        medicalProcedure,
        isClaimSubmissionPending,
        labTestValue,
        setLabtestValue,
        diagnosis,
        setDiagnosis,
        handleDraftSubmitMutation,
        isDraftSubmissionPending,
        draft,
        draftLoading,
    };
};

export default useClaimsForm;
