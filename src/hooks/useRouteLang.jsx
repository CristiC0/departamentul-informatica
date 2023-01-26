import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LANGUAGES = ["ro", "ru", "en"];
const DEFAULT_LANGUAGE = LANGUAGES[0];

const validateLanguage = (lang) =>
    LANGUAGES.find((language) => language === lang);

const redirectToDefault = (path, navigate) => {
    const pathWithDefaultLang = path.replace(
        /^\/[^\/]*\/?/,
        `/${DEFAULT_LANGUAGE}/`
    );
    navigate(pathWithDefaultLang);
};

export const useRouteLang = (lang) => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        validateLanguage(lang)
            ? i18n.changeLanguage(lang)
            : redirectToDefault(location.pathname, navigate);
    }, [lang]);
};
