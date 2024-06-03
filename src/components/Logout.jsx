// componentes/Logout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin/");
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
