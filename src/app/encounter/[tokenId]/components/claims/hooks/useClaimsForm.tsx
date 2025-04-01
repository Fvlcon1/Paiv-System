'use client'

import { DropdownItem } from "@/utils/@types";
import { useFormik } from "formik";
import validationSchema from "../utils/validationSchema";
import { drugValidationSchema } from '../utils/validationSchema';
import { useEffect, useState } from "react";
import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useEncounterContext } from "../../../context/encounter.context";

const useClaimsForm = () => {
    const [labTestValue, setLabtestValue] = useState("")
    const [medicalProcedure, setMedicalProcedure] = useState<string>("")
    const {getEncounterMutation, setShowClaims} = useEncounterContext()
    const {tokenId} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
          diagnosis: "",
          medicalProcedures: [],
          drugs: [],
          labTests: [],
        },
        validationSchema,
        onSubmit: async (values) => {
            handleClaimSubmitMutation(values)
        },
    });

    const handleClaimsSubmit = async (values : typeof formik.values) => {
        const response = await protectedApi.POST("claims/submit", {
            diagnosis : values.diagnosis,
            encounter_token : tokenId,
            service_type : ["any"],
            drugs : values.drugs,
            medical_procedures : values.medicalProcedures,
            lab_tests : values.labTests
        })
        return response
    }

    const {mutate : handleClaimSubmitMutation, isPending : isClaimSubmissionPending} = useMutation({
        mutationFn : handleClaimsSubmit,
        onSuccess : (data) => {
            setShowClaims(false)
            toast.success("Claims submitted successfully")
            getEncounterMutation()
        }
    })

    const handleAddDrug = () => {
        let drugs = formik.values.drugs

        //check if drug is already added
        if(drugs.find((item : any) => item.code === drugFormik.values.code)){
           drugs = handleRemoveDrug(drugFormik.values.code)
        }

        //add procedure
        const newDrugs = [...drugs, {code : drugFormik.values.code, dosage : `${drugFormik.values.dosage}`}]
        formik.setFieldValue("drugs", newDrugs)
        drugFormik.setFieldValue("code", "")
        drugFormik.setFieldValue("dosage", "")
        drugFormik.touched.dosage = false
    }

    const drugFormik = useFormik({
        initialValues : {
            code : "",
            dosage : ""
        },
        validationSchema : drugValidationSchema,
        onSubmit : ()=>{
            handleAddDrug()
        }
    })

    const handleRemoveMedicalProcedure = (procedure:string) => {
        const procedures = formik.values.medicalProcedures
        const newProcedures = procedures.filter((item) => item !== procedure)
        formik.setFieldValue("medicalProcedures", newProcedures)
    }

    const handleAddLabTest = (test:string) => {
        setLabtestValue("")
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
        isLoading, 
        setIsLoading,
        isClaimSubmissionPending,
        labTestValue,
        setLabtestValue
    }
}
export default useClaimsForm