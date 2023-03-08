import { AuthContextProvider } from "@context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./i18n";

const queryClient = new QueryClient();
import GeneralLayout from "./layouts/GeneralLayout/GeneralLayout";
import Homepage from "./pages/Homepage/Homepage";
import NewsPage from "./pages/NewsPage/NewsPage";

function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <RouterProvider router={router} />
                    <Route path="/news" element={<NewsPage />} />
                </AuthContextProvider>
            </QueryClientProvider>
        </Suspense>
    );
}

export default App;
