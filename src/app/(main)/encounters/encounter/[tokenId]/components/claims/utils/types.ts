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
    frequency : number
    duration : number
    tariff : number
    unitOfPricing : string
    levelOfPriscription : string
    quantity : number
    total : number
}
export interface IDiagonosisType {
    GRDG : string
    description : string
    ICD10 : string
}

export interface IClaimsDetailType {
    expectedPayout : number
    reasons? : string[]
    diagnosis : IDiagonosisType[],
    drugs : IDrugsType[],
    serviceOutcome: string;
    serviceType1: string;
    serviceType2: string;
    specialties: string[];
    typeofAttendance: string;
    medicalProcedures: string[];
    labTests: string[];
    medicalProceduresTotal : number
    labTestsTotal : number
    drugsTotal : number
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

export interface IServicesType {
    code : string,
    service : string,
    tariff : number
}

export interface IDiagnosisType {
    description : string
    GRDG : string
    GDRGName : string
    ICD10 : string
    primary : boolean
}

export interface IDrugType {
    levelOfPriscription : string
    description : string
    tariff : number
    code : string
    unitOfPricing : string
}

