import { IClaimsDetailType } from "./types"

const calculateQuantity = (frequency : number, duration : number) => {
    const quantity = (24/frequency) * duration
    return quantity
}

const calculateMedicalProcedureTotal = (procedures : any[]) => {
    const total = procedures?.reduce((acc : number, procedure : any) => acc + procedure.tariff, 0)
    return Number(total.toFixed(2))
}

const calculateLabTestTotal = (tests : any[]) => {
    const total = tests?.reduce((acc : number, test : any) => acc + test.tariff, 0)
    return Number(total.toFixed(2))
}

const calculateDrugsTotal = (drugs : any[]) => {
    const total = drugs?.reduce((acc : number, drug : any) => acc + calculateQuantity(drug.frequency, drug.duration) * drug.tariff, 0)
    return Number(total.toFixed(2))
}

const calculateDiagnosisTotal = (diagnosis : any[]) => {
    const total = diagnosis?.reduce((acc : number, diagnosis : any) => acc + diagnosis.tariff, 0)
    return Number(total.toFixed(2))
}

export const convertToClaimsDetails = (values: any) : IClaimsDetailType => {
    const details =  {
        get expectedPayout() : number {return Number((this.medicalProceduresTotal + this.labTestsTotal + this.drugsTotal + this.diagnosisTotal).toFixed(2))},
        diagnosis: values.diagnosis ?? [],
        drugs: values.drugs?.map((drug: any) => ({
            code: drug.code,
            dosage: `${drug.frequency} hourly for ${drug.duration} day(s)`,
            description: drug.description,
            tariff : drug.tariff ?? 0,
            unitOfPricing : drug.unitOfPricing,
            levelOfPriscription : drug.levelOfPriscription,
            frequency : drug.frequency,
            duration : drug.duration,
            quantity : Math.round(calculateQuantity(drug.frequency, drug.duration)),
            date: new Date(),
            get total() : number { return Number((this.quantity * this.tariff).toFixed(2)) },
        })) || [],
        medicalProcedures: values.medicalProcedures ?? [],
        medicalProceduresTotal : calculateMedicalProcedureTotal(values.medicalProcedures),
        labTests: values.labTests ?? [],
        labTestsTotal : calculateLabTestTotal(values.labTests),
        drugsTotal : calculateDrugsTotal(values.drugs),
        diagnosisTotal : calculateDiagnosisTotal(values.diagnosis),
        serviceOutcome: values.serviceOutcome || '',
        serviceType1: values.serviceType1 || '',
        serviceType2: values.serviceType2 || '',
        specialties: values.specialties || [],
        typeofAttendance: values.typeofAttendance || ''
    }
    return details
}