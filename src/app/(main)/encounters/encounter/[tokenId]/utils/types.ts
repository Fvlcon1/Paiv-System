import { INhisDetails } from "@/app/(main)/components/main/components/results table/utils/type"

export const enum ViewState {
    NHIS_DETAILS = "NHIS_DETAILS",
    INSTRUCTIONS = "INSTRUCTIONS",
    CAPTURE = "CAPTURE",
    VERIFICATION_SUCCESS = "VERIFICATION_SUCCESS",
    VERIFICATION_FAILED = "VERIFICATION_FAILED",
    VERIFICATION_SELECTION = "VERIFICATION_SELECTION"
}

export interface IEncounterDetails extends INhisDetails {
    checkinTime? : Date,
    checkoutTime? : Date,
    disposition? : string
    checkinImageUrl : string
    checkoutImageUrl : string
    createdAt : string
    checkinStatus? : boolean
    checkoutStatus? : boolean
    claimSubmissionAt? : Date
}