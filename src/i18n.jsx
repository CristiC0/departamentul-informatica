import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import roLanguage from "@languages/ro";
import ruLanguage from "@languages/ru";
import enLanguage from "@languages/en";

const resources = {
    ro: {
        translation: roLanguage,
    },
    ru: {
        translation: ruLanguage,
    },
    en: {
        translation: enLanguage,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "ro",
    fallbackLng: "ro",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
