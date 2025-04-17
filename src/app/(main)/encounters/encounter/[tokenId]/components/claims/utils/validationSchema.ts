import * as Yup from 'yup'

const validationSchema = Yup.object({
  diagnosis: Yup.string().required("Required"),
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
})

export default validationSchema;
