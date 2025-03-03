import { message } from "antd"
import axios from "axios"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { IRecentVisitsTable, IRecentVisits } from './type';
import Image from "next/image"
import { VscUnverified, VscVerified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import theme from "@styles/theme"
import toast from "react-hot-toast";
import { protectedApi } from "@/app/utils/apis/api";

const useRecentVisits = () => {
    const [recentVisitsTableData, setRecentVisitsTableData] = useState<IRecentVisitsTable[]>([])

    const fetchRecentVisits = async ({
        pageSize,
        pageNumber
    }: {
        pageSize?: number
        pageNumber?: number
    }) => {
        const response = await protectedApi.GET("/recent_visits", {
            limit: pageSize ?? 5,
            skip: pageNumber ? pageNumber - 1 : undefined
        })
        return response.data
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
                        lastVisitDate : visit.visit_date,
                        gender : visit.gender,
                        dob: (new Date(visit.date_of_birth)).toDateString(),
                        imageUrl : visit.profile_image_url,
                        cardExpiryDate : visit.current_expiry_date
                    }
                    
                    return {
                        ...recentVisit,
                        lastVisit: (
                            <div className="flex flex-col gap-1">
                                <Text>
                                    {`${(new Date(visit.visit_date)).toDateString()}`}
                                </Text>
                                <Text textColor={theme.colors.text.tetiary}>
                                    {`${getTime(visit.visit_date)} | ${getRelativeTime(visit.visit_date)}`}
                                </Text>
                            </div>
                        ),
                        image: (
                            <div className="rounded-lg overflow-hidden relative w-[50px] h-[50px] ">
                                <Image
                                    src={visit.profile_image_url}
                                    alt="profile image"
                                    layout="intrinsic"
                                    width={50}
                                    height={50}
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                        ),
                        cardValidity: (
                            <div className="flex gap-1 items-center">
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
                    }
                })
                setRecentVisitsTableData(transformVisitTable)
            }
        },
        onError: (error) => {
            toast.error(error.message)
            console.error("Error fetching members", error)
        }
    })

    return { getRecentVisits, recentVisitsTableData, isLoading : isPending, isError, error }
}

export default useRecentVisits
