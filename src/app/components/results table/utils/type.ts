import { ReactNode } from "react";

export interface IRearchResults {
    image : ReactNode,
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisit : ReactNode,
    gender : string,
    dob : string,
    cardValidity : ReactNode,
    verifyVisit : ReactNode
}

export interface INhisDetails {
    imageUrl? : string
    firstname : string,
    othernames : string,
    lastname : string,
    nhisId : string,
    lastVisit : string,
    gender : string,
    dob : string,
    expirtyDate : string,
    enrolementStatus : string,
    insuranceType : string
    issueDate : string,
    maritalStatus : string
    residentialAddress : string
    phoneNumber : string
    ghanaCardNumber : string
    memberShipId : string
}