import { ReactNode } from "react";

export interface IClaims {
    image : ReactNode
    status : ReactNode,
    token : ReactNode,
    visitDate : Date,
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
}

export type IClaimStatus = 'declined' | 'successful' | 'pending'