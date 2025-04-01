import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    const url = "http://localhost:3000/auth/register";
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
        };

        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(url, data);

            if (res.status === 201) {
                setRedirect(true);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("An error occurred during registration. Please try again.");
        }
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container">
            <div className="login-welcome">
                <h1>Welcome to Avtonet</h1>
                <p>Join the platform and start discovering and listing cars.</p>
            </div>
            <h2>Register</h2>
            <form onSubmit={submit}>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter first name"
                        id="firstNameInput"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="firstNameInput">First name</label>
                </div>
                <div className="form-floating">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter last name"
                        id="lastNameInput"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="lastNameInput">Last name</label>
                </div>

                <div className="form-floating">
                    <input
                        type="phone"
                        className="form-control"
                        placeholder="Enter phone number"
                        id="phoneNumberInput"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="phoneNumberInput">Phone number</label>
                </div>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        id="emailInput"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="emailInput">Email</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        id="passwordInput"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Repeat password"
                        id="password2Input"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <label htmlFor="password2Input">Repeat password</label>
                </div>
                {error && <p style={{ color: "red", fontSize: "1rem" }}>{error}</p>}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
            <div className="mt-3">
                <p>
                    Already have an account? <Link to="/login">Log in</Link> instead.
                </p>
            </div>
        </div>
    );
};

export default Register;
