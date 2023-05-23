import {
    Navigate,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import GeneralLayout from "@layouts/GeneralLayout/GeneralLayout";
import AuthLayout from "@layouts/AuthLayout/AuthLayout";

import Setup from "../Setup";
import Homepage from "@pages/Homepage/Homepage";
import LoginPage from "@pages/auth/Login/LoginPage";
import RegisterPage from "@pages/auth/Register/RegisterPage";
import Teachers from "@pages/teachers/Teachers";
import NewsPage from "@pages/NewsPage/NewsPage";
import TeacherDetail from "@pages/teachers/TeacherDetail";
import CreateNews from "@pages/news/CreateNews";
import NewsDetail from "@pages/NewsPage/NewsDetail/NewsDetail";
import TeacherEdit from "@pages/teachers/TeacherEdit/TeacherEdit";
import Schedule from "@pages/Schedule/Schedule";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Setup />}>
            <Route path=":lang/auth" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path=":lang" element={<GeneralLayout />}>
                <Route index exact element={<Homepage />} />
                <Route path="news">
                    <Route index exact element={<NewsPage />} />
                    <Route path="add" element={<CreateNews />} />
                    <Route path=":id" element={<NewsDetail />} />
                </Route>
                <Route path="teachers" element={<Teachers />} />
                <Route path="teachers/:name" element={<TeacherDetail />} />
                <Route path="teachers/:name/edit" element={<TeacherEdit />} />
                <Route path="schedule" element={<Schedule />} />
            </Route>
            <Route path="*" element={<Navigate to="/ro" />} />
        </Route>
    )
);

export default router;
