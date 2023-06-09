import * as yup from "yup";

export const coursesSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    acronym: yup
        .string()
        .uppercase("Should have all uppercase letters")
        .required("Acronym required"),
    descrition: yup.string().required("Description required"),
    content: yup.string().required("Content required"),
});
