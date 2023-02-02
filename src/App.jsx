import { useTranslation } from "react-i18next";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useRouteLang } from "@hooks/useRouteLang";
import { AuthContextProvider } from "@context/AuthContext";
import "./i18n";

import GeneralLayout from "./layouts/GeneralLayout";
import Homepage from "./pages/Homepage";
import NewsPage from "./pages/NewsPage";


function App() {
    const { t } = useTranslation();
    const { lang } = useParams();
    useRouteLang(lang);

    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<GeneralLayout/>}>
                    <Route index element={<Homepage/>}></Route>
                    <Route path="*" element={<NewsPage/>}></Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </AuthContextProvider>

    );
}

export default App;
