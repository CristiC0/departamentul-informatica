import { Navigate } from "react-router-dom";
import { useAuthContext } from "@context/AuthContext.jsx";
import { useState, useEffect } from "react";

function GuardedRoute({ allowedRoles = ["ADMIN"], children }) {
    const { user } = useAuthContext();
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        setRefresh(true);
    }, [user]);
    if (refresh && !user.auth && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return children;
}
export default GuardedRoute;
