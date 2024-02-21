import * as yup from "yup";
const phoneRules = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const schema1 = yup.object().shape({
  firstName: yup
    .string()
    .min(3, "First name must be at least 3 characters long")
    .required("Required"),
  lastName: yup
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .required("Required"),
  // email: yup.string().email("Please enter a valid email").required("Required"),
  phone: yup
    .string()
    .matches(phoneRules, { message: "Please enter a valid phone number" })
    .required("Required"),
});

export const initialValues1 = {
  firstName: "",
  lastName: "",
  // email: "",
  phone: "",
};

export const schema2 = yup.object().shape({
  oldPassword: yup
    .string()
    // .min(8, "Old password must be at least 8 characters long")
    // .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  newPassword: yup
    .string()
    .min(8, "At least 8 characters long")
    // .matches(passwordRules, { message: "Create a stronger password" })
    .required("Required"),
  confirmedNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});
export const initialValues2 = {
  oldPassword: "",
  newPassword: "",
  confirmedNewPassword: "",
};
