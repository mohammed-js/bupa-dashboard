import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const schema = yup.object().shape({
  bupaEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
  bupaPassword: yup
    .string()
    .min(8, "Must be at least 8 characters long")
    // .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const initialValues = {
  bupaEmail: "",
  bupaPassword: "",
};
