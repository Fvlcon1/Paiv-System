'use client'

import { useEffect } from "react"
import { useIssuesContext } from "../../context/context"
import useIssues from "../../hooks/useIssues"
import IssueCard from "./issue-card"
import { Issue } from "../../utils/types"

// const issues = [
//     {
//         id: "CL990-A94",
//         title: "Patient Eligibility Issues",
//         status: "new",
//         priority: "high",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A95",
//         title: "Patient Eligibility Issues",
//         status: "completed",
//         priority: "high",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A96",
//         title: "Patient Eligibility Issues",
//         status: "pending",
//         priority: "medium",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A97",
//         title: "Patient Eligibility Issues",
//         status: "unassigned",
//         priority: "low",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A98",
//         title: "Patient Eligibility Issues",
//         status: "completed",
//         priority: "high",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A99",
//         title: "Patient Eligibility Issues",
//         status: "completed",
//         priority: "high",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A96",
//         title: "Patient Eligibility Issues",
//         status: "pending",
//         priority: "medium",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A100",
//         title: "Patient Eligibility Issues",
//         status: "completed",
//         priority: "high",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
//     {
//         id: "CL990-A96",
//         title: "Patient Eligibility Issues",
//         status: "pending",
//         priority: "medium",
//         reasons: [],
//         createdAt: "2025-06-17T13:00:00.000Z"
//     },
// ]

const isVisible = ({
    item,
    selectedStatus,
    selectedPriority
}: {
    item: Issue,
    selectedStatus: string,
    selectedPriority: string
}) => {
    if (selectedStatus !== "all" && selectedStatus !== item.status) {
        return false
    }
    // if (selectedPriority !== "all" && selectedPriority !== item.priority) {
    //     return false
    // }
    return true
}

const IssueList = () => {
    const { isIssuesLoading, issues, isIssuesRefetching, isIssuesError } = useIssuesContext()
    const { selectedStatus, selectedPriority } = useIssuesContext()

    useEffect(() => {
        if (issues) {
            console.log(issues)
        }
    }, [issues])

    if (isIssuesRefetching) {
        return (
            <div className="flex items-center justify-center w-full h-[500px] flex-col gap-2">
                <div className="normal-loader !bg-main-primary" />
            </div>
        )
    }

    return (
        <div className={`flex flex-col ${isIssuesRefetching ? "opacity-50 cursor-wait" : ""}`}>
            {
                issues.map((item, index) => (
                    isVisible({
                        item,
                        selectedStatus,
                        selectedPriority
                    }) &&
                    <IssueCard
                        key={item.id + index}
                        title={item.title}
                        id={item.id}
                        status={item.status}
                        reasons={item.reasons}
                        createdAt={item.createdAt}
                    />
                ))
            }
        </div>
    )
}

export default IssueList
