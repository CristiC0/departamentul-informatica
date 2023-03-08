import { Outlet } from "react-router-dom";
import { useRouteLang } from "./hooks/useRouteLang";

const Setup = () => {
    useRouteLang();
    return (
        <>
            <Outlet />
        </>
    );
};

export default Setup;
