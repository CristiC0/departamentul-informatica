import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import AuthLayout from "@layouts/AuthLayout/AuthLayout";

const RegisterPage = lazy(() =>
    import("@pages/auth/Register/RegisterPage.jsx")
);
const LoginPage = lazy(() => import("@pages/auth/Login/LoginPage.jsx"));

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route path="register" element={<RegisterPage />} />;
                <Route path="login" element={<LoginPage />} />;
            </Route>
        </Routes>
    );
}
