import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authValue, setAuthValue] = useState({ token: crypto.randomUUID() });

    return (
        <AuthContext.Provider value={{ authValue, setAuthValue }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const { authValue, setAuthValue } = useContext(AuthContext);
    return { authValue, setAuthValue };
};
