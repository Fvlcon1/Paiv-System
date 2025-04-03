import * as Yup from 'yup'

const validationSchema = Yup.object({
  diagnosis: Yup.string().required("Required"),
  medicalProcedures: Yup.array(),
  drugs: Yup.array().min(1, "Must add at least one drug"),
  labTests: Yup.array(),
})

export const drugValidationSchema = Yup.object({
  code: Yup.string().required("Drug name is required"),
  dosage: Yup.number().required("Dosage is required"),
  frequency: Yup.number().required("Frequency is required"),
  duration: Yup.number().required("Duration is required"),
})

export default validationSchema;
