import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { IRecentVisitsTable, IRecentVisits } from '../type';
import Image from "next/image"
import { VscUnverified, VscVerified } from "react-icons/vsc"
import Text from "@styles/components/text"
import { TypographyBold } from "@styles/style.types"
import { getRelativeTime, getTime } from "@/utils/getDate"
import theme from "@styles/theme"
import { protectedApi } from "@/app/utils/apis/api";
import Status from "@/app/(main)/components/status/status";

const useRecentVisits = () => {
    const [recentVisitsTableData, setRecentVisitsTableData] = useState<IRecentVisitsTable[]>([])
    const [pageSize, setPageSize] = useState(15)
    const [pageNumber, setPageNumber] = useState(1)
    const [searchValue, setSearchValue] = useState("")

    const fetchRecentVisits = async ({
        pageSize,
        pageNumber
    }: {
        pageSize?: number
        pageNumber?: number
    }) => {
        const response = await protectedApi.GET("/encounter/my_verifications", {
            limit: pageSize ?? 15,
            skip: pageNumber ? pageNumber - 1 : undefined
        })
        transformVisitTable(response.results)
        return response.results
    }

    const transformVisitTable = (visits: any[]) => {
        if (!visits)
            return

        const transformVisitTable: IRecentVisitsTable[] = visits.map((visit: any) => {
            const isExpired = new Date(visit.current_expiry_date) < new Date()
            const recentVisit: IRecentVisits = {
                firstname: visit.first_name,
                othernames: visit.middle_name,
                lastname: visit.last_name,
                nhisId: visit.nhis_number,
                lastVisitDate: (new Date(visit.verification_date)).toString(),
                gender: visit.gender,
                dob: (new Date(visit.date_of_birth)).toDateString(),
                imageUrl: visit.profile_image_url,
                cardExpiryDate: (new Date(visit.current_expiry_date)).toDateString(),
                verificationStatus: visit.verification_status,
                token: visit.token,
                finalTime: visit.final_time,
                dispositionName: visit.disposition_name,
                isExpired
            }

            return {
                ...recentVisit,
                othernames: recentVisit.othernames ?? '-',
                verificationStatus: recentVisit.verificationStatus
                    ? (<Status status="successful" />)
                    : (<Status status="failed" />),
                checkIn: (
                    <div className="flex flex-col gap-1">
                        <Text>
                            {`${(new Date(visit.verification_date)).toDateString()}`}
                        </Text>
                        <Text textColor={theme.colors.text.tetiary}>
                            {`${getTime(visit.verification_date)} | ${getRelativeTime(visit.verification_date)}`}
                        </Text>
                    </div>
                ),
                checkout: (
                    visit.final_time ?
                        <div className="flex flex-col gap-1">
                            <Text>
                                {`${(new Date(visit.final_time)).toDateString()}`}
                            </Text>
                            <Text textColor={theme.colors.text.tetiary}>
                                {`${getTime(visit.final_time)} | ${getRelativeTime(visit.final_time)}`}
                            </Text>
                        </div>
                        :
                        "-"
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
            }
        })
        setRecentVisitsTableData(transformVisitTable)
    }

    const { data: recentVisits, isLoading, isError, error, refetch: getRecentVisits, isRefetching } = useQuery({
        queryKey: ["recentVisits", pageSize, pageNumber],
        queryFn: () => fetchRecentVisits({
            pageSize,
            pageNumber
        }),
    })

    useEffect(() => {
        if(recentVisits)
            transformVisitTable(recentVisits)
    }, [recentVisits])

    return {
        recentVisits,
        recentVisitsTableData,
        isLoading,
        isError,
        error,
        getRecentVisits,
        pageSize,
        pageNumber,
        setPageSize,
        setPageNumber,
        searchValue,
        setSearchValue,
        isRefetching
    }
}

export default useRecentVisits
