import { IClaimsDetailType } from "../../claim-summary/utils/types";

export interface IClaimsType extends IClaimsDetailType {
    hospitalName : string
    patientName : string
    location : string
    pharmacy : string
    status : string
    totalPayout : number
}
