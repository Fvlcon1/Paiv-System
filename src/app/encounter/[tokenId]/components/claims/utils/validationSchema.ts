import * as Yup from 'yup'

const validationSchema = Yup.object({
  diagnosis: Yup.string().required("Required"),
  medicalProcedures: Yup.array().min(1, "Must be at least 1"),
  drugs: Yup.array().min(1, "Must be at least 1"),
  labTests: Yup.array().min(1, "Must be at least 1"),
})

export const drugValidationSchema = Yup.object({
  code: Yup.string().required("Drug name is required"),
  dosage: Yup.string().required("Dosage is required"),
})

export default validationSchema;
