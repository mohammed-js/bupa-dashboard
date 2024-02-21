import * as yup from "yup";

const floatingNumber = /^[-+]?(\d*\.\d+|\d+\.?\d*)([eE][-+]?\d+)?$/;
// floating number
const integerNumber = /^-?\d+$/;
// integerNumber

export const schema = yup.object().shape({
  arAddress: yup.string().min(5, "على الأقل 5 حروف").required("إجباري"),
});
export const initialValues = {
  arAddress: "",
};
