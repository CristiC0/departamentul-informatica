import { Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";
import GeneralLayout from "@layouts/GeneralLayout/GeneralLayout";

import Teachers from "@pages/teachers/Teachers";
// const Teachers = lazy(() => import("@pages/teachers/Teachers.jsx"));
export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<GeneralLayout />}>
                <Route index element={<Teachers />} />;
                <Route path="*" element={<Navigate to="/ro" />} />
            </Route>
        </Routes>
    );
}
