import * as Yup from 'yup'

const validationSchema = Yup.object({
  primaryDiagnosis: Yup.string().required("Required"),
  secondaryDiagnosis: Yup.string(),
  medicalProcedures: Yup.array().of(Yup.string().required("Required")),
  drugs: Yup.array().of(
      Yup.object({
          code: Yup.string().required("Drug name is required"),
          quantity: Yup.number().min(1, "Must be at least 1"),
      })
  ),
  labTests: Yup.array().of(Yup.string()),
  consumables: Yup.array().of(Yup.string()),
  serviceType: Yup.string().required("Required"),
})

export const drugValidationSchema = Yup.object({
  code: Yup.string().required("Drug name is required"),
  quantity: Yup.number().min(1, "Must be at least 1"),
})

export default validationSchema;
