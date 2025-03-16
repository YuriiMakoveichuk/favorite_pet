import * as yup from "yup";

export const validationSchemaFormLogin = yup.object().shape({
  name: yup.string(),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email is not valid"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(7, "Password must be at least 7 characters"),
  repeatPassword: yup
    .string()
    .required("Repeat password is required")
    .min(7, "Repeat password must be at least 7 characters"),
});
