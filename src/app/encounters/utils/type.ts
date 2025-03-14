import { ReactNode } from "react";

export interface IRecentVisits {
    imageUrl : string,
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisitDate : string,
    finalTime? : string,
    dispositionName? : string
    gender : string,
    dob : string,
    cardExpiryDate : string
    verificationStatus : boolean
    token : string
}
export interface IRecentVisitsTable extends IRecentVisits {
    image : ReactNode,
    lastVisit : ReactNode,
    cardValidity : ReactNode
}