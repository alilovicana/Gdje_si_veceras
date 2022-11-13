import { useState, useEffect } from "react";
import "./Components.css";

function Registration() {
    const initialValues = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };
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
        if (!values.firstName) {
            errors.firstName = "Unesite ime!";
        }
        else if (values.firstName.length < 2) {
            errors.firstName = "Ime mora biti veće od dva karaktera!";
        } 
        if (!values.lastName) {
            errors.lastName = "Unesite prezime!";
        }
        else if (values.lastName.length < 3) {
            errors.lastName = "Prezime mora biti veće od tri karaktera!";
        } 
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
        if (values.password !=values.confirmPassword) {
            errors.confirmPassword = "Neispravna lozinka";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="ui message success">Registracija uspješna!</div>
            ) : (
                <div className="ui message success">...</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="ui form">
                    <div className="field">
                        <label>Ime</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Ime"
                            value={formValues.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.firstName}</p>
                    <div className="field">
                        <label>Prezime</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Prezime"
                            value={formValues.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.lastName}</p>
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
                    <div className="field">
                        <label>Potvrdi lozinku</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Potvrdi lozinku"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.confirmPassword}</p>
                    <button type="submit" className="btn btn-success">Registracija</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;