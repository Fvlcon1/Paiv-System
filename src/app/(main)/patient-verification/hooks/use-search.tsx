import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { INhisDetails } from "../../components/main/components/results table/utils/type";
import Image from "next/image";
import { VscUnverified, VscVerified } from "react-icons/vsc";
import Text from "@styles/components/text";
import { TypographyBold } from "@styles/style.types";
import Button from "@components/button/button";
import { DispositionViewState, ViewState } from "@/app/utils/types";
import { getTime, getRelativeTime } from "@/utils/getDate";
import theme from "@styles/theme";
import { protectedApi } from "@/app/utils/apis/api";
import { mainContext } from "@/app/context/context";

const useSearchResults = () => {
    const { setNhisDetails, setViewState } = useContext(mainContext);
    const [searchMembersResult, setSearchMembersResult] = useState<INhisDetails[]>([])
    const [searchValue, setSearchValue] = useState<string>("n")
    let fetchResultsControllerRef = useRef<AbortController>(null)

    const fetchSearchResults = async () => {
        if (!searchValue) throw new Error("Search value is required");
        fetchResultsControllerRef.current?.abort();
        fetchResultsControllerRef.current = new AbortController();
        
        const {results:data} = await protectedApi.GET("/members/autocomplete", { query: searchValue }, fetchResultsControllerRef.current.signal )

        if (!data || data.length === 0) return [];

        return data.map((visit: any) => {
            const NHISDetails: INhisDetails = {
                firstname: visit.first_name,
                othernames: visit.middle_name,
                lastname: visit.last_name,
                nhisId: visit.nhis_number,
                lastVisit: `${(new Date(visit.last_visit)).toDateString()} | ${getTime(visit.last_visit)} | ${getRelativeTime(visit.last_visit)}`,
                gender: visit.gender,
                dob: new Date(visit.date_of_birth).toDateString(),
                maritalStatus: visit.marital_status,
                expirtyDate: visit.current_expiry_date,
                enrolementStatus: visit.enrolment_status,
                insuranceType: visit.insurance_type,
                issueDate: visit.issue_date,
                residentialAddress: visit.residential_address,
                phoneNumber: visit.phone_number,
                ghanaCardNumber: visit.ghana_card_number,
                memberShipId: visit.membership_id,
                token : visit.token
            };

            const isExpired = new Date(visit.current_expiry_date) < new Date();

            return {
                ...NHISDetails,
                othernames: `${NHISDetails.firstname || ''} ${NHISDetails.othernames || ''}`.trim() || '-',
                lastVisit : (
                    visit.last_visit ?
                    <div className="flex flex-col gap-1">
                        <Text>
                            {`${(new Date(visit.last_visit)).toDateString()}`}
                        </Text>
                        <Text textColor={theme.colors.text.tetiary}>
                            {`${getTime(visit.last_visit)} | ${getRelativeTime(visit.last_visit)}`}
                        </Text>
                    </div>
                    : <Text>-</Text>
                ),
                image: (
                    <div className="rounded-lg overflow-hidden relative w-[35px] h-[35px]">
                        <Image
                            src={visit.profile_image_url}
                            alt="profile image"
                            style={{ height: "auto", width: "100%" }}
                            width={35}
                            height={35}
                        />
                    </div>
                ),
                cardValidity: (
                    <div className="flex gap-1 items-center mt-2">
                        {
                            isExpired ?
                            <VscUnverified color={"#db4040"} size={18} />
                            :
                            <VscVerified color={"#60B956"} size={18} />
                        }
                        <Text textColor={isExpired ? "#db4040" : "#60B956"} bold={TypographyBold.md}>
                            {isExpired ? "Expired" : "Valid"}
                        </Text>
                    </div>
                ),
                verifyVisit: (
                    <Button
                        text="View Details"
                        className="!h-[30px] !px-3"
                        onClick={() => {
                            setNhisDetails({ ...NHISDetails, imageUrl: visit.profile_image_url });
                            setViewState(ViewState.NHIS_DETAILS);
                        }}
                    />
                ),
            };
        });
    }

    // Define mutation
    const {mutate: searchMutation, isPending : isSearchPending, isError : isSearchError, error : searchError} = useMutation({
        mutationFn:  async ()=> {
            try {
                return await fetchSearchResults()
            } catch (error : any) {
                if (axios.isCancel(error)) {
                    return 
                } else {
                    throw new Error(error)
                }
            }
        },
        onSuccess: (transformedVisits) => {
            setSearchMembersResult(transformedVisits);
        },
        onError: (error) => {
            console.error("Error fetching members:", error);
        }
    });

    useEffect(()=>{
        searchMutation()
    },[searchValue])

    return {
        isSearchPending,
        isSearchError,
        searchError,
        searchMembersResult,
        searchValue,
        setSearchValue
    };
};

export default useSearchResults;
