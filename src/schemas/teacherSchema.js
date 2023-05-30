import * as yup from "yup";

const nameRegex = /^[\w- ]*$/;
const numberRegex =/^^(0([0-9]){8})$/;


export const registerSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(3, "Minimum 3 characters")
        .max(16, "Maximum 16 characters")
        .matches(nameRegex, "Only letters. Spaces and hythens are accepted")
        .required("First name required"),
    lastName: yup
        .string()
        .min(3, "Minimum 3 characters")
        .max(16, "Maximum 16 characters")
        .matches(nameRegex, "Only letters. Spaces and hythens are accepted")
        .required("Last name required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email required"),
    phone: yup
        .matches(phoneRegex, "Only numbers. Phone must start with 0")

});
