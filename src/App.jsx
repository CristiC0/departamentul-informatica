import { AuthContextProvider } from "@context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./i18n";

const queryClient = new QueryClient();

function App() {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <RouterProvider router={router} />
                </AuthContextProvider>
            </QueryClientProvider>
        </Suspense>
    );
}

export default App;
