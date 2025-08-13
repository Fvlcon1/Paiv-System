import * as Yup from 'yup'

const validationSchema = Yup.object({
  diagnosis: Yup.array().min(1, "Must add at least one diagnosis"),
  medicalProcedures: Yup.array(),
  drugs: Yup.array().min(1, "Must add at least one drug"),
  labTests: Yup.array(),
  serviceOutcome : Yup.string().required("Required"),
  serviceType1 : Yup.string().required("Required"),
  serviceType2 : Yup.string().required("Required"),
  specialties : Yup.array(),
  typeofAttendance : Yup.string().required("Required"),
  pharmacy : Yup.boolean()
})

export const drugValidationSchema = Yup.object({
  code: Yup.string().required("Drug name is required"),
  frequency: Yup.number().required("Frequency is required"),
  duration: Yup.number(),
  unitOfPricing : Yup.string().required("Required"),
  levelOfPriscription : Yup.string().required("Required"),
  tariff : Yup.number().required("Required"),
  description : Yup.string().required("Required"),
})

export default validationSchema;
