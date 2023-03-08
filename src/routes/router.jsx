import {
    Navigate,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import GeneralLayout from "@layouts/GeneralLayout/GeneralLayout";
import AuthLayout from "@layouts/AuthLayout/AuthLayout";

import Homepage from "@pages/Homepage/Homepage";
import LoginPage from "@pages/auth/Login/LoginPage";
import RegisterPage from "@pages/auth/Register/RegisterPage";
import Teachers from "@pages/teachers/Teachers";
import Setup from "../Setup";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Setup />}>
            <Route path=":lang/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path=":lang" element={<GeneralLayout />}>
                <Route index exact element={<Homepage />} />
                <Route path="teachers" element={<Teachers />} />
            </Route>
            <Route path="*" element={<Navigate to="/ro" />} />
        </Route>
    )
);

export default router;
