import { message } from "antd"
import axios from "axios"
import { useContext, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { IRecentVisitsTable, IRecentVisits } from '../type';
import Image from "next/image"
import { VscUnverified, VscVerified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import theme from "@styles/theme"
import toast from "react-hot-toast";
import { protectedApi } from "@/app/utils/apis/api";
import Button from "@components/button/button";
import { mainContext } from "@/app/context/context";
import { DispositionViewState } from "@/app/utils/types";
import { INhisDetails } from "@/app/components/results table/utils/type";
import { HiMenuAlt3, HiOutlineDotsHorizontal } from "react-icons/hi";
import ClickableTab from "@components/clickable/clickabletab";
import Dropdown from "@components/dropdown/dropdown";
import useDropdownItems from "./components/menuItems";

const useRecentVisits = () => {
    const [recentVisitsTableData, setRecentVisitsTableData] = useState<IRecentVisitsTable[]>([])
    const { setSearchMembersResult, setNhisDetails, setViewState, setDispositionViewState } = useContext(mainContext);
    const {menuItems} = useDropdownItems()

    const fetchRecentVisits = async ({
        pageSize,
        pageNumber
    }: {
        pageSize?: number
        pageNumber?: number
    }) => {
        const response = await protectedApi.GET("/my_verifications", {
            limit: pageSize ?? 15,
            skip: pageNumber ? pageNumber - 1 : undefined
        })
        return response.results
    }

    const { mutate: getRecentVisits, isPending, isError, error } = useMutation({
        mutationFn: fetchRecentVisits,
        onSuccess: (visits) => {
            if (visits) {
                const transformVisitTable: IRecentVisitsTable[] = visits.map((visit: any) => {
                    const isExpired = new Date(visit.current_expiry_date) < new Date()
                    const recentVisit : IRecentVisits = {
                        firstname: visit.first_name,
                        othernames: visit.middle_name,
                        lastname: visit.last_name,
                        nhisId: visit.nhis_number,
                        lastVisitDate : (new Date(visit.verification_date)).toString(),
                        gender : visit.gender,
                        dob: (new Date(visit.date_of_birth)).toDateString(),
                        imageUrl : visit.profile_image_url,
                        cardExpiryDate : (new Date(visit.current_expiry_date)).toDateString(),
                        verificationStatus : visit.verification_status,
                        token : visit.token,
                        finalTime : visit.final_time,
                        dispositionName : visit.disposition_name
                    }

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
                    
                    return {
                        ...recentVisit,
                        othernames : recentVisit.othernames ?? '-',
                        lastVisit: (
                            <div className="flex flex-col gap-1">
                                <Text>
                                    {`${(new Date(visit.verification_date)).toDateString()}`}
                                </Text>
                                <Text textColor={theme.colors.text.tetiary}>
                                    {`${getTime(visit.verification_date)} | ${getRelativeTime(visit.verification_date)}`}
                                </Text>
                            </div>
                        ),
                        image: (
                            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                                <Image
                                    src={visit.profile_image_url ?? null}
                                    alt="profile image"
                                    width={50}
                                    height={50}
                                    style={{ height: "auto", width: "100%" }}
                                />
                            </div>
                        ),
                        actions : (
                            <Dropdown
                                menuItems={menuItems}
                                onClick={(e) => {
                                    setNhisDetails({ ...NHISDetails, imageUrl: visit.profile_image_url });
                                    e.stopPropagation()
                                }}
                            >
                                <ClickableTab>
                                    <HiOutlineDotsHorizontal 
                                        color={theme.colors.text.secondary}
                                        size={20}
                                    />
                                </ClickableTab>
                            </Dropdown>
                        )
                    }
                })
                setRecentVisitsTableData(transformVisitTable)
            }
        },
        onError: (error :any) => {
            toast.error(error.response.data.detail ?? "Error fetching members")
            console.error("Error fetching members", error)
        }
    })

    return { getRecentVisits, recentVisitsTableData, isLoading : isPending, isError, error }
}

export default useRecentVisits
