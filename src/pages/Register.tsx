import { SyntheticEvent, useState } from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const url = "http://localhost:3000/auth/register"
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        }

        console.log(data)

        const res = await axios.post(url, data)

        console.log(res)

        if (res.status === 201) {
            setRedirect(true)
        }

    }

    if (redirect) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <div className="container">
                <h2>Registracija</h2>
                    <form onSubmit={submit}>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Vstavi ime"
                            id="firstNameInput" onChange={(e) => setFirstName(e.target.value)}/>
                            <label htmlFor="firstNameInput">Ime</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Vstavi priimek"
                            id="lastNameInput" onChange={(e) => setLastName(e.target.value)}/>
                            <label htmlFor="lastNameInput">Priimek</label>
                        </div>
                        <div className="form-floating">
                            <input type="email" className="form-control" placeholder="Vstavi e-pošto"
                            id="emailInput" onChange={(e) => setEmail(e.target.value)}/>
                            <label htmlFor="emailInput">E-Pošta</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="Vstavi geslo"
                            id="passwordInput" onChange={(e) => setPassword(e.target.value)}/>
                            <label htmlFor="passwordInput">Geslo</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" placeholder="Ponovi geslo"
                            id="password2Input" onChange={(e) => setPassword2(e.target.value)}/>
                            <label htmlFor="password2Input">Geslo 2x</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Registriraj</button>
                    </form>
            </div>
        </>
    )
}
export default Register;