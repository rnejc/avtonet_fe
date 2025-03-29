

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const url = "http://localhost:3000/auth/login"
    const [redirect, setRedirect] = useState(false);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        }

        console.log(data)

        try {
            const res = await axios.post(url, data)
            if (res.status === 201) {
                setRedirect(true)
                console.log(res)
            }
        }
        catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.message)
            }
            else {
                setErrorMessage("napaka pri prijavi")
            }
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    return (
    <>
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={submit}>
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
                <button type="submit" className="btn btn-primary">Registriraj</button>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            </form>
        </div>
    </>
)
}
export default Login;