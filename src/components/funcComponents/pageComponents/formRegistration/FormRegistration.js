import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useIntl } from "react-intl";

import UiButton from "../../ui/UiButton/UiButton";
import UiInput from "../../ui/UiInput/UiInput";

import "../form/Form.css";
import "./FormRegistration.css";


const Form = () => {
    const [state, setState] = useState({
        check: false,
        nameUser : "",
        email: "",
        password: "",
        errorEmail: false,
        errorPassword: false,
    });

    const navigate = useNavigate();
    const intl = useIntl();

    const handleClick = () => {
        setState({ ...state, check: !state.check });
    };

    const getInputFocus = (e) => {
        let stateCpy = Object.assign(state);

        stateCpy[`error${e.target.getAttribute("name")}`] = false;
        setState({
            ...state,
            errorEmail: stateCpy.errorEmail,
            errorPassword: stateCpy.errorPassword,
        });
    };

    // funzione per l utente 
    const getName = (e) => {
        setState({ ...state, 
            nameUser: e.target.value 
        });
    }

    const getEmail = (e) => {
        setState({ ...state, email: e.target.value });
    };

    const getPassword = (e) => {
        setState({ ...state, password: e.target.value });
    };

    const validateInput = () => {
        const reMail =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const rePassword = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!^&+=]).*$/;

        let suppErrorEmail = state.errorEmail;
        let suppErrorPassword = state.errorPassword;

        if (!reMail.test(state.email)) {
            suppErrorEmail = true;
        }
        if (!rePassword.test(state.password)) {
            suppErrorPassword = true;
        }
        if (reMail.test(state.email) && rePassword.test(state.password)) {
            navigate("/");
        }

        setState({
            ...state,
            errorEmail: suppErrorEmail,
            errorPassword: suppErrorPassword,
        });
    };

    const redirect = () => {
        navigate("/");
    };

    return (
        <div className="UiInput">
            {/* nome utente  */}
            <div
                data-validate={intl.formatMessage({ id: "register.errorEmailMessage" })}
                className={`Inferno ${state.errorEmail ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.email.length > 0 && "hasVal"}`}
                    type={"text"}
                    name="nameUser"
                    callback={getName}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">Name</span>
            </div>

            {/* email  */}
            <div
                data-validate={intl.formatMessage({ id: "login.errorEmailMessage" })}
                className={`Inferno ${state.errorEmail ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.email.length > 0 && "hasVal"}`}
                    type={"email"}
                    name="Email"
                    callback={getEmail}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">Email</span>
            </div>

            {/* password  */}
            <div
                data-validate={intl.formatMessage({ id: "login.errorPasswordMessage" })}
                className={`Inferno ${state.errorPassword ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.password.length > 0 && "hasVal"}`}
                    type={"password"}
                    name="Password"
                    callback={getPassword}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">Password</span>
            </div>
            <div className="flexRow">
                <div>
                    <UiInput
                        check={state.check}
                        name="check"
                        css={"inputCheck"}
                        type="checkbox"
                    />
                    <label onClick={handleClick} htmlFor="check" className="remember">
                        {/* {intl.formatMessage({ id: "login.rememberMe" })} */}
                        Accept policy
                    </label>
                </div>
            </div>
            <UiButton
                css={"login"}
                // label={intl.formatMessage({ id: "login.loginButton" }).toUpperCase()}
                label={"Registrati"}
                callback={validateInput}
            />
            <UiButton
                css={"signUp"}
                // label={intl.formatMessage({ id: "login.signUpButton" }).toUpperCase()}
                label={'Torna al login'}
                callback={redirect}
            />
        </div>
    );
};

export default Form;
