import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { IRecentVisitsTable, IRecentVisits } from '../utils/type';
import Image from "next/image"
import { protectedApi } from "@/app/utils/apis/api";

const useEncounter = () => {
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
                othernames: `${visit.first_name || ''} ${visit.middle_name || ''}`.trim() || '-',
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
                verificationStatus: recentVisit.verificationStatus,
                checkIn: visit.verification_date,
                checkout: visit.final_time,
                image: visit.profile_image_url,
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

export default useEncounter
