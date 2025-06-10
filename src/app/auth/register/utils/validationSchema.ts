import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  location: Yup
    .string()
    .required("Location is required."),
  hospitalName: Yup
    .string()
    .required("Hospital name is required."),
  region: Yup
    .string()
    .required("Region is required."),
  district: Yup
    .string()
    .required("District is required."),
  address: Yup
    .string()
    .required("Address is required."),
  password: Yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});

export default validationSchema;
