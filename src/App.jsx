import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useRouteLang } from "@hooks/useRouteLang";
import { AuthContextProvider } from "@context/AuthContext";
import AuthRoutes from "./routes/AuthRoutes";
import { Suspense } from "react";
import "./i18n";

import GeneralLayout from "./layouts/GeneralLayout";
import Homepage from "./pages/Homepage";
import NewsPage from "./pages/NewsPage";

function App() {
    const { lang } = useParams();
    useRouteLang(lang);

    return (
        <Suspense>
            <AuthContextProvider>
                <Routes>
                    <Route path="/aaa" element={<AuthRoutes />} />
                    <Route path="/" element={<GeneralLayout />}>
                        <Route index exact element={<Homepage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                </Routes>
            </AuthContextProvider>
        </Suspense>
    );
}

export default App;
