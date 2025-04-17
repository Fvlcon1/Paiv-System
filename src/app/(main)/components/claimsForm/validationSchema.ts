import * as Yup from 'yup'

const validationSchema = Yup.object({
  diagnosis: Yup.string().required("Required"),
  medicalProcedures: Yup.array().of(Yup.string().required("Required")),
  drugs: Yup.array().of(
      Yup.object({
          name: Yup.string().required("Drug name is required"),
          strength: Yup.string().required("Strength is required"),
          dosage: Yup.string().required("Dosage is required"),
          quantity: Yup.number().min(1, "Must be at least 1"),
      })
  ),
  labTests: Yup.array().of(Yup.string()),
  serviceType: Yup.string().required("Required"),
})

export default validationSchema;
