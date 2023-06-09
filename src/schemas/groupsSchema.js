import * as yup from "yup";

export const groupsSchema = yup.object().shape({
    name: yup.string().required("Name required"),
    year: yup.number().min(1).required("Year required"),
    cycle: yup.number().min(1).required("Cycle required"),
});
