import * as yup from "yup";

const phoneRules = /^(?:\+?20|0)?1\d{9}$/;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const schema = yup.object().shape({
  bupaFirstName: yup.string().min(3).required("Required"),
  bupaLastName: yup.string().min(3).required("Required"),
  bupaEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("Required"),
  bupaPhone: yup
    .string()
    .matches(phoneRules, { message: "Please enter a valid phone" })
    .required("Required"),
  bupaPassword: yup
    .string()
    .min(8, "Must be at least 8 characters long")
    // .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});

export const initialValues = {
  bupaFirstName: "",
  bupaLastName: "",
  bupaEmail: "",
  bupaPhone: "",
  bupaPassword: "",
};
