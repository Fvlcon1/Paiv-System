import { ReactNode } from "react";

export interface IRecentVisits {
    imageUrl : string,
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisitDate : string,
    gender : string,
    dob : string,
    cardExpiryDate : string
}
export interface IRecentVisitsTable extends IRecentVisits {
    image : ReactNode,
    lastVisit : ReactNode,
    cardValidity : ReactNode
}