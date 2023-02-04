import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'
import { loginCall } from "../apiCalls"
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
// import { CircularProgress } from "@material-ui/core";

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
                loginCall({ email: email.current.value, password: password.current.value }, dispatch);
                setLoginStatus(true);
                redirect.push('/');
            }
        });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const RedirectToRegister = () => {
        redirect.push('/Registration');
    }
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
            errors.email = "Enter your Email!";
        } else if (!regex.test(values.email)) {
            errors.email = "Wrong Email format!";
        }
        if (!values.password) {
            errors.password = "Enter your Password!";
        } else if (values.password.length < 4) {
            errors.password = "P<ssword must be larger than 4 characters!";
        }
        return errors;
    };

    return (
        <LoginContainer>
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
                                <input placeholder="Email" className="loginInput" type="email" name="email" value={formValues.email} onChange={handleChange} ref={email} />
                                <div className="error">{formErrors.email}</div>
                                <input placeholder="Password" className="loginInput" type="password" name="password" value={formValues.password} onChange={handleChange} ref={password} />
                                <div className="error">{formErrors.password}</div>
                                <button className="loginButton" onClick={login}>Log In</button>
                                <button className="loginRegisterButton" onClick={RedirectToRegister}>
                                    Create a New Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </LoginContainer>
    );
}
const LoginContainer = styled.div`
.container{
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
  }
  .error {
    color:red;
  }
  .loginLogo {
    font-size: 40px;
    font-weight: 800;
    color: rgb(255, 174, 0);
    margin-bottom: 10px;
  }
  
  .loginDesc {
    font-size: 24px;
  }
  
  .loginBox{
      height: 300px;
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
  }
`;

export default Login;