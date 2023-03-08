import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LANGUAGES = new Set(["ro", "ru", "en"]);
const DEFAULT_LANGUAGE = "ro";

const validateLanguage = (lang) => LANGUAGES.has(lang);

const redirectToDefault = (path, navigate) => {
    const pathWithDefaultLang = path.replace(
        /^\/[^\/]*\/?/,
        `/${DEFAULT_LANGUAGE}/`
    );
    navigate(pathWithDefaultLang, { replace: true });
};

export const useRouteLang = () => {
    const { lang } = useParams();
    const { i18n } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!validateLanguage(lang))
            redirectToDefault(location.pathname, navigate);

        if (i18n.language !== lang) i18n.changeLanguage(lang);
    }, [lang]);

    const changeLanguage = (lang) => {
        if (!validateLanguage(lang)) return;
        const pathWithNewLanguage = location.pathname.replace(
            /^\/[^\/]*\/?/,
            `/${lang}/`
        );
        navigate(pathWithNewLanguage);
    };
    return changeLanguage;
};
