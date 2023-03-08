import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const url = "/api/auth";

const AuthContext = createContext();

const defaultUser = { name: "", token: "", auth: false };

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({ ...defaultUser });

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (!user) return;

        saveUser(JSON.parse(user));
    }, []);

    const register = async (userData) =>
        await authRequest(userData, `register`);

    const login = async (userData) =>
        await authRequest(userData, `authenticate`);

    const logout = () => {
        setUser({ ...defaultUser });
        sessionStorage.removeItem("user");
    };

    async function authRequest(userData, endpoint) {
        const { data } = await axios
            .post(`${url}/${endpoint}`, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .catch((error) =>
                console.error("Some error at register/login attempt")
            );
        const jwtData = parseJwt(data.token);
        saveUser({ name: jwtData.sub, token: data.token, auth: true });
    }

    function saveUser(user) {
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

function parseJwt(token) {
    return JSON.parse(atob(token.split(".")[1]));
}
