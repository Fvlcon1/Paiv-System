import { Issue } from "./types"

export const issueCategories = [
    "Prescription-Related Issues",
    "Patient Eligibility Issues",
    "Overbilling or Fraudulent Practices",
    "Excluded Services",
    "Diagnosis and Treatment Mismatch",
    "Claim Documentation Deficiencies",
]

export const transformIssue = (issue: any): Issue => {
    return {
        id: issue.encounter_token,
        title: issue.message,
        reasons: issue.error_data.error_reasons.map((reason: any) => {
            return {
                description: reason.description,
                detail: reason.details,
                category: issueCategories[reason.category],
                evidence: "",
                priority: reason?.severity ?? "",
                recommendations: reason?.recommendation ?? "",
            }
        }),
        status: issue.status,
        createdAt: issue.created_at,
    }
}