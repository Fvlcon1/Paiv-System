import { ReactNode } from "react";

export interface IRecentVisits {
    image : ReactNode,
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisit : ReactNode,
    gender : string,
    dob : string,
    cardValidity : ReactNode
}