import { IClaimsDetailType } from "./types"

const calculateQuantity = (frequency : number, duration : number) => {
    const quantity = (24/frequency) * duration
    return quantity
}

const calculateMedicalProcedureTotal = (procedures : any[]) => {
    const total = procedures.reduce((acc : number, procedure : any) => acc + procedure.tariff, 0)
    return total
}

const calculateLabTestTotal = (tests : any[]) => {
    const total = tests.reduce((acc : number, test : any) => acc + test.tariff, 0)
    return total
}

const calculateDrugsTotal = (drugs : any[]) => {
    const total = drugs.reduce((acc : number, drug : any) => acc + calculateQuantity(drug.frequency, drug.duration) * drug.tariff, 0)
    return total
}

export const convertToClaimsDetails = (values: any) : IClaimsDetailType => {
    const details =  {
        get expectedPayout() : number {return (this.medicalProceduresTotal + this.labTestsTotal + this.drugsTotal).toFixed(2)},
        diagnosis: values.diagnosis ?? [],
        drugs: values.drugs?.map((drug: any) => ({
            code: drug.code,
            dosage: `${drug.frequency} hourly for ${drug.duration} day(s)`,
            description: drug.description,
            tariff : drug.tariff,
            unitOfPricing : drug.unitOfPricing,
            levelOfPriscription : drug.levelOfPriscription,
            frequency : drug.frequency,
            duration : drug.duration,
            quantity : calculateQuantity(drug.frequency, drug.duration),
            date: new Date(),
            get total() : number { return this.quantity * this.tariff },
        })) || [],
        medicalProcedures: values.medicalProcedures ?? [],
        medicalProceduresTotal : calculateMedicalProcedureTotal(values.medicalProcedures),
        labTests: values.labTests ?? [],
        labTestsTotal : calculateLabTestTotal(values.labTests),
        drugsTotal : calculateDrugsTotal(values.drugs),
        serviceOutcome: values.serviceOutcome || '',
        serviceType1: values.serviceType1 || '',
        serviceType2: values.serviceType2 || '',
        specialties: values.specialties || [],
        typeofAttendance: values.typeofAttendance || ''
    }
    return details
}