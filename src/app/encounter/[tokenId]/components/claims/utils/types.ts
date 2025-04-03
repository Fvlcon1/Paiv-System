import { JSX, ReactNode } from "react";

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

export interface IDrugsType {
    code : string,
    description : string
    dosage : string
    date : Date
}
export interface IDiagonosisType {
    GRDG : string
    description : string
    diagnosis : string
    ICD10 : string
}

export interface IClaimsDetailType {
    totalPayout : number
    reasons? : string[]
    diagnosis : IDiagonosisType[],
    drugs : IDrugsType[]
}
export interface IClaimsDetailsTableData {
    id: string;
    selectable: JSX.Element;
    hospitalName: string;
    patientName: string;
    location: string;
    diagnosis: string;
    drugs: string;
    details : IClaimsDetailType
}

export type IClaimStatus = 'declined' | 'successful' | 'pending'