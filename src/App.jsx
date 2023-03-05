import { Routes, Route, useParams, Navigate } from "react-router-dom";
import { useRouteLang } from "@hooks/useRouteLang";
import AuthRoutes from "./routes/AuthRoutes";
import { Suspense } from "react";
import "./i18n";

import GeneralLayout from "./layouts/GeneralLayout/GeneralLayout";
import Homepage from "./pages/Homepage/Homepage";

function App() {
    const { lang } = useParams();
    useRouteLang(lang);

    return (
        <Suspense>
            <Routes>
                <Route path="/*" element={<AuthRoutes />} />
                <Route path="/" element={<GeneralLayout />}>
                    <Route index exact element={<Homepage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
