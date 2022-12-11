import { useState, useEffect, useRef, useContext } from "react";
import "./Components.css";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import { loginCall } from "../apiCalls"
import { AuthContext } from "../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

function Login() {
    let redirect = useHistory();
    axios.defaults.withCredentials = true;

    const email = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);


    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    const login = async () => {
        await axios.post("http://localhost:3001/Login", {
            email: formValues.email,
            password: formValues.password
        }).then((response) => {
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                loginCall({ email: email.current.value, password: password.current.value },dispatch);
                setLoginStatus(true);
                redirect.push('/');
            }
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("success");
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Unesite Email!";
        } else if (!regex.test(values.email)) {
            errors.email = "Neispravan Email format!";
        }
        if (!values.password) {
            errors.password = "Unesite lozinku!";
        } else if (values.password.length < 4) {
            errors.password = "Lozinka mora biti veća od četiri karaktera!";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Prijava uspješna!</div>
            ) : (
                <div className="ui message success">...</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="ui form">
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                            ref={email}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="field">
                        <label>Lozinka</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Lozinka"
                            value={formValues.password}
                            onChange={handleChange}
                            ref={password}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <button onClick={login} type="submit" className="btn btn-success" disabled={isFetching}> {isFetching ? (
                       <CircularProgress color="white" size="20px" />
                    ) : (
                        "Prijava"
                    )}</button>
                </div>
            </form>
        </div>
    );
}

export default Login;