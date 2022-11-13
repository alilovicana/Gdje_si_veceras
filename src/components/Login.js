import { useState, useEffect } from "react";
import "./Components.css";

function Login() {
    const initialValues = {email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

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
            console.log(formValues);
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
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
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
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <button type="submit" className="btn btn-success">Prijava</button>
                </div>
            </form>
        </div>
    );
}

export default Login;