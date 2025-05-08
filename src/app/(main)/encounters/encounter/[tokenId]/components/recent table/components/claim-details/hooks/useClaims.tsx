'use client'

import { protectedApi } from "@/app/utils/apis/api"
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { IClaimsType } from "../utils/types";
import { useState } from "react";

const useClaims = () => {
    const { tokenId } = useParams();
    const [claimDetails, setClaimDetails] = useState<IClaimsType>()

    const getClaims = async () => {
        const response = await protectedApi.GET(`/claims/${tokenId}`)
        return response
    }

    const convertToClaimsDetails = (data : any) : IClaimsType => {
        return {
            expectedPayout : data.expected_payout,
            reasons : data.reason,
            diagnosis : data.diagnosis,
            drugs : data.drugs,
            serviceOutcome : data.service_outcome,
            serviceType1 : data.service_type_1,
            serviceType2 : data.service_type_2,
            specialties : data.specialties,
            typeofAttendance : data.typeofAttendance,
            medicalProcedures : data.medical_procedures,
            labTests : data.lab_tests,
            medicalProceduresTotal : data.medical_procedures_total,
            labTestsTotal : data.lab_tests_total,
            drugsTotal : data.drugs_total,
            hospitalName : data.hospital_name,
            patientName : data.patient_name,
            location : data.location,
            pharmacy : data.pharmacy,
            status : data.status,
            totalPayout : data.total_payout,
        }
    }

    const {
        mutate : getClaimsMutation,
        isPending : getClaimsLoading,
    } = useMutation({
        mutationFn : getClaims,
        onSuccess : (data) => {
            const claimsDetails = convertToClaimsDetails(data)
            setClaimDetails(claimsDetails)
            console.log({claimsDetails})
        }
    })

    return {
        getClaimsMutation,
        getClaimsLoading,
        claimDetails
    }
}
export default useClaims