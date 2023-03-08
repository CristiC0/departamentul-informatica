import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "@context/AuthContext";
import "./index.scss";
import { BrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/ro" />} />
                        <Route path="/:lang/*" element={<App />} />
                    </Routes>
                </QueryClientProvider>
            </BrowserRouter>
        </AuthContextProvider>
    </React.StrictMode>
);
