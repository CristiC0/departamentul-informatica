import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL + "/auth";

const AuthContext = createContext();

const defaultUser = { name: "", id: "", email: "", auth: false };

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({ ...defaultUser });

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (!user) return;

        saveUser(JSON.parse(user));
    }, []);

    const register = async (userData) =>
        await authRequest(userData, `register`);

    const login = async (userData) => await authRequest(userData, `login`);

    const logout = () => {
        setUser({ ...defaultUser });
        (async () => {
            axios
                .get(`${url}/logout`, {
                    credentials: "include",
                    withCredentials: true,
                })
                .catch((error) => console.error(error.message));
        })();
        sessionStorage.removeItem("user");
    };

    async function authRequest(userData, endpoint) {
        const { data } = await axios
            .post(`${url}/${endpoint}`, userData, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                },
                credentials: "include",
                withCredentials: true,
            })
            .catch((error) => console.error(error.message));
        const { name, id, email } = parseJwt(data.token);
        saveUser({ name, id, email, auth: true });
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
