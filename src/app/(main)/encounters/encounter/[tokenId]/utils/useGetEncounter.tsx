import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useRecentVisits from "../components/recent table/utils/useRecentVisits";
import { useEncounterContext } from "../context/encounter.context";
import { INhisDetails } from "@/app/(main)/components/main/components/results table/utils/type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDateTime, getRelativeTime, getTime } from "@/utils/getDate";
import { IEncounterDetails } from "./types";

const useGetEncounter = () => {
    const { tokenId } = useParams();
    const { getNHISDetails } = useRecentVisits()
    const { setNhisDetails } = useEncounterContext();
    const [userDetails, setUserDetails] = useState<INhisDetails>();
    const [encounterDetails, setEncounterDetails] = useState<IEncounterDetails>()

    const extractEncounterDetails = (data : any) => {
        const {verification_record, claim_submission_time} = data
        const {
            first_name, 
            middle_name, 
            last_name, 
            nhis_number, 
            verification_date, 
            gender, 
            date_of_birth, 
            marital_status,
            profile_image_url,
            current_expiry_date,
            enrolment_status,
            insurance_type,
            issue_date,
            residential_address,
            phone_number,
            ghana_card_number,
            membership_id,
            token,
            compare_image_url,
            encounter_image_url,
            created_at,
            final_time,
            disposition_name,
            verification_status,
            final_verification_status
        } = verification_record

        const encounterDetails: IEncounterDetails = {
            firstname: first_name,
            othernames: middle_name,
            lastname: last_name,
            nhisId: nhis_number,
            lastVisit: getDateTime(verification_date),
            gender: gender,
            dob: new Date(date_of_birth).toDateString(),
            maritalStatus: marital_status,
            imageUrl : profile_image_url,
            expirtyDate: current_expiry_date,
            enrolementStatus: enrolment_status,
            insuranceType: insurance_type,
            issueDate: issue_date,
            residentialAddress: residential_address,
            phoneNumber: phone_number,
            ghanaCardNumber: ghana_card_number,
            memberShipId: membership_id,
            token : token,
            checkinImageUrl : compare_image_url,
            checkoutImageUrl : encounter_image_url,
            createdAt : created_at,
            checkinTime : verification_date && new Date(verification_date),
            checkoutTime : final_time && new Date(final_time),
            disposition : disposition_name,
            checkinStatus : verification_status,
            checkoutStatus : final_verification_status,
            claimSubmissionAt :  claim_submission_time && new Date(claim_submission_time),
        };
        console.log({encounterDetails})
        return encounterDetails
    }

    const getEncounter = async () => {
        if (!tokenId) return null; // Ensure tokenId exists before fetching
        const response = await protectedApi.GET(`/encounter/${tokenId}`);
        return response;
    };

    const { mutate: getEncounterMutation, isPending : getEncounterPending, data : encounterData } = useMutation({
        mutationFn: getEncounter,
        onSuccess: (data) => {
            if (data) {
                const {verification_record} = data
                const userDetails = getNHISDetails(verification_record);
                const extractedEncounterDetails = extractEncounterDetails(data)
                setEncounterDetails(extractedEncounterDetails)
                setNhisDetails(userDetails)
                setUserDetails(userDetails);
                return extractedEncounterDetails
            }
        },
        onError: () => {
            toast.error("Something happened, Please try again later");
        }
    });

    useEffect(() => {
        if (tokenId) {
            getEncounterMutation();
        }
    }, [tokenId]);
    return { getEncounterMutation, getEncounterPending, encounterData, encounterDetails, setEncounterDetails}
}
export default useGetEncounter