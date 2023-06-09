import * as yup from "yup";

export const newsSchema = yup.object().shape({
    title: yup.string().required("Title required"),
    thumbnail: yup.string().required("Thummbnail required"),
    author: yup.string().required("Author required"),
});
