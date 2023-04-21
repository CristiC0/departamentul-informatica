import * as yup from "yup";

const nameRegex = /^[\w- ]*$/;

const usernameRegex = /^[\w\d]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

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
    username: yup
        .string()
        .min(3, "Minimum 3 characters")
        .max(16, "Maximum 16 characters")
        .matches(usernameRegex, "Only letters and numbers")
        .required("Username required"),
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email required"),
    password: yup
        .string()
        .min(5, "Password must be minimum 5 characters")
        .max(12, "Password must be maximum 12 characters")
        .matches(passwordRegex, {
            message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
        })
        .required("Password required"),
});

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email required"),
    password: yup
        .string()
        .min(5, "Password must be minimum 5 characters")
        .max(12, "Password must be maximum 12 characters")
        .matches(passwordRegex, {
            message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
        })
        .required("Password required"),
});
