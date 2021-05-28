import * as yup from "yup";

export const phoneRegex = /^([0-9^]*)+[0-9]$/;

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^([^0-9]*)$/, "Name should not contain numbers"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email format is invalid"),
  gender: yup.string().ensure().required("Gender is required"),
});
