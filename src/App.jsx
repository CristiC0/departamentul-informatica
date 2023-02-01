import { useTranslation } from "react-i18next";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useRouteLang } from "@hooks/useRouteLang";
import { AuthContextProvider } from "@context/AuthContext";
import "./i18n";


import Navbar from "./components";

function App() {
    const { t } = useTranslation();
    const { lang } = useParams();
    useRouteLang(lang);

    return (
        <AuthContextProvider>
            <Navbar/>
            <Routes>
                <Route index element={<div>{t("greeting")}</div>} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </AuthContextProvider>

    );
}

export default App;
