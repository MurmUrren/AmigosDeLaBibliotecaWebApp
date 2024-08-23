import "./Login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLoged from "@hooks/useLoged";

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const { loged, handleLoged } = useLoged();
    const navigate = useNavigate();

    const handleOnLogin = () => {
        if (user === "admin" && password === "admin") {
            handleLoged();
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    const handleInputChanged = (e) => {
        const { type, value } = e.target;
        if (type === "text") {
            setUser(value);
        } else if (type === "password") {
            setPassword(value);
        }
    };

    useEffect(() => {
        if (loged) {
            navigate("/manage");
        }
    }, []);

    return (
        <div className="login">
            <div className="login-input">
                <label htmlFor="user">User</label>
                <input
                    onChange={handleInputChanged}
                    type="text"
                    value={user}
                    placeholder="Tu usuario"
                    id="user"
                />
            </div>
            <div className="login-input">
                <label htmlFor="password">Password</label>
                <input
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleOnLogin();
                        }
                    }
                    }
                    onChange={handleInputChanged}
                    type="password"
                    value={password}
                    placeholder="Tu contraseña"
                    id="password"
                />
            </div>
            <button onClick={handleOnLogin} className="login-button">
                Login
            </button>
        </div>
    );
};

export default Login;
