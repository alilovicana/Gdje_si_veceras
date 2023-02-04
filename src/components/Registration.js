import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useHistory } from 'react-router-dom'
import styled from "styled-components";

function Registration() {
    let redirect = useHistory();
    const initialValues = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const passwordInputRef = useRef();

    const addUser = async () => {
        await axios.post('http://localhost:3001/Registration', {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            password: formValues.password
        }).then(() => {
            console.log("success");
            setFormValues(initialValues);
            redirect.push('/Login');
        })
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
            addUser();
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
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Neispravna lozinka";
        }
        return errors;
    };
    const RedirectToLogin = () => {
        redirect.push('/Login');
    }
    return (
        <RegistrationContainer>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="loginWrapper">
                        <div className="loginLeft">
                            <h3 className="loginLogo">WhereTonight?</h3>
                            <span className="loginDesc">
                                Connect with events and the world around you with WhereTonight?
                            </span>
                        </div>
                        <div className="loginRight">
                            <div className="loginBox">
                                <input placeholder="Name" className="loginInput" onChange={handleChange} type="text" name="firstName" value={formValues.firstName} />
                                <div className="error">{formErrors.firstName}</div>
                                <input placeholder="Surname" className="loginInput" onChange={handleChange} type="text" name="lastName" value={formValues.lastName} />
                                <div className="error">{formErrors.lastName}</div>
                                <input placeholder="Email" className="loginInput" type="email" name="email" value={formValues.email} onChange={handleChange} />
                                <div className="error">{formErrors.email}</div>
                                <input placeholder="Password" className="loginInput" ref={passwordInputRef} type="password" name="password" value={formValues.password} onChange={handleChange} />
                                <div className="error">{formErrors.password}</div>
                                <input placeholder="Confirm Password" className="loginInput" type="password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} />
                                <div className="error">{formErrors.confirmPassword}</div>
                                <button className="loginButton">Sign Up</button>
                                <button className="loginRegisterButton" onClick={RedirectToLogin} >
                                    Log into Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </RegistrationContainer>
    );
}
const RegistrationContainer = styled.div`
.container {
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loginWrapper {
    width: 70%;
    height: 70%;
    display: flex;
  }
  
  .loginLeft,
  .loginRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:10px;
  }
  
  .loginLogo {
    font-size: 40px;
    font-weight: 800;
    color: rgb(255, 174, 0);
    margin-bottom: 10px;
  }
  .error{
    color:red;
  }
  .loginDesc {
    font-size: 24px;
  }
  
  .loginBox{
      height: 500px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  
  .loginInput{
      height: 50px;
      border-radius: 10px;
      border: 1px solid gray;
      font-size: 18px;
      padding-left: 20px;
  }
  
  .loginInput:focus{
      outline: none;
  }
  
  .loginButton{
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #1775ee;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
  }
  
  .loginForgot{
      text-align: center;
      color: #1775ee;
  }
  
  .loginRegisterButton{
      width: 60%;
      align-self: center;
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #42b72a;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
  }`;

export default Registration;