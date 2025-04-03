import { protectedApi } from "@/app/utils/apis/api";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useRecentVisits from "../components/recent table/utils/useRecentVisits";
import { useEncounterContext } from "../context/encounter.context";
import { INhisDetails } from "@/app/components/results table/utils/type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRelativeTime, getTime } from "@/utils/getDate";
import { IEncounterDetails } from "./types";

const useGetEncounter = () => {
    const { tokenId } = useParams();
    const { getNHISDetails } = useRecentVisits()
    const { setNhisDetails } = useEncounterContext();
    const [userDetails, setUserDetails] = useState<INhisDetails>();
    const [encounterDetails, setEncounterDetails] = useState<IEncounterDetails>()

    const extractEncounterDetails = (data : any) => {
        const encounterDetails: IEncounterDetails = {
            firstname: data.first_name,
            othernames: data.middle_name,
            lastname: data.last_name,
            nhisId: data.nhis_number,
            lastVisit: `${(new Date(data.verification_date)).toDateString()} | ${getTime(data.verification_date)} | ${getRelativeTime(data.verification_date)}`,
            gender: data.gender,
            dob: new Date(data.date_of_birth).toDateString(),
            maritalStatus: data.marital_status,
            imageUrl : data.profile_image_url,
            expirtyDate: data.current_expiry_date,
            enrolementStatus: data.enrolment_status,
            insuranceType: data.insurance_type,
            issueDate: data.issue_date,
            residentialAddress: data.residential_address,
            phoneNumber: data.phone_number,
            ghanaCardNumber: data.ghana_card_number,
            memberShipId: data.membership_id,
            token : data.token,
            checkinImageUrl : data.compare_image_url,
            checkoutImageUrl : data.encounter_image_url,
            createdAt : data.created_at,
            checkinTime : data.verification_date && new Date(data.verification_date),
            checkoutTime : data.final_time && new Date(data.final_time),
            disposition : data.disposition_name,
            checkinStatus : data.verification_status,
            checkoutStatus : data.final_verification_status
        };
        return encounterDetails
    }

    const getEncounter = async () => {
        if (!tokenId) return null; // Ensure tokenId exists before fetching
        const response = await protectedApi.GET(`api/encounter/${tokenId}`);
        return response.verification_record;
    };

    const { mutate: getEncounterMutation, isPending : getEncounterPending, data : encounterData } = useMutation({
        mutationFn: getEncounter,
        onSuccess: (data) => {
            if (data) {
                const userDetails = getNHISDetails(data);
                const extractedEncounterDetails = extractEncounterDetails(data)
                setEncounterDetails(extractEncounterDetails(data))
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