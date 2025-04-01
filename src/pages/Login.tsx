import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import api from "../api/axios.ts";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: number; // User ID (assuming it's stored as 'sub' in the token)
    exp: number; // Expiry timestamp
    iat: number; // Issued-at timestamp
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("auth/login", { email, password });

            if (res.status === 201) {
                const token = res.data.access_token;
                localStorage.setItem("token", token);

                try {
                    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
                    localStorage.setItem("userId", String(decodedToken.sub));
                } catch (decodeError) {
                    console.error("Error decoding token:", decodeError);
                }

                setRedirect(true);
            }
        } catch (error) {
            console.error("Login error:", error);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred while logging in. Please try again later.");
            }
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="login-welcome">
                <h1>Welcome to Avtonet</h1>
                <p>Please login to continue using the platform.</p>
            </div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Enter email"
                           id="emailInput" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="emailInput">Email</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Enter password"
                           id="passwordInput" onChange={(e) => setPassword(e.target.value)} />
                    <label htmlFor="passwordInput">Password</label>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </form>
            <div className="mt-3">
                <p>New to Avtonet? <Link to="/register">Sign up</Link> instead.</p>
            </div>
        </div>
    );
};

export default Login;
