import { protectedApi } from "@/app/utils/apis/api"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Issue } from "../utils/types"
import { transformIssue } from "../utils/transform-issue"

const useIssues = () => {
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedPriority, setSelectedPriority] = useState("all")
    const [selectedDateRange, setSelectedDateRange] = useState<string | null>(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const getIssues = async () => {
        const response = await protectedApi.GET("/notifications/", {
            status : selectedStatus === "all" ? undefined : selectedStatus,
            severity : selectedPriority === "all" ? undefined : (selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)),
            start_date : selectedDateRange?.split(" - ")[0] ? new Date(selectedDateRange?.split(" - ")[0]).toISOString() : undefined,
            end_date : selectedDateRange?.split(" - ")[1] ? new Date(selectedDateRange?.split(" - ")[1]).toISOString() : undefined,
        })
        const transformedIssues: Issue[] = response.notifications.map((issue: any) => transformIssue(issue))
        setIssues(transformedIssues)
        return response
    }

    const { data: issuesData, isPending : isIssuesLoading, isError : isIssuesError, error : issuesError, refetch: refetchIssues, isRefetching : isIssuesRefetching } = useQuery({
        queryKey: ["issues", selectedStatus, selectedPriority, selectedDateRange],
        queryFn: () => getIssues(),
    })

    useEffect(() => {
        if (issuesData?.notifications.length > 0) {
            const transformedIssues: Issue[] = issuesData.notifications.map((issue: any) => transformIssue(issue))
            setIssues(transformedIssues)
        }
    }, [])

    return {
        selectedStatus,
        setSelectedStatus,
        selectedPriority,
        setSelectedPriority,
        selectedDateRange,
        setSelectedDateRange,
        issues,
        isIssuesLoading,
        isIssuesError,
        issuesError,
        refetchIssues,
        isIssuesRefetching
    }
}

export default useIssues

