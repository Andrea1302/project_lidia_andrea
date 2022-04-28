import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIntl } from "react-intl";

import UiButton from "../../ui/UiButton/UiButton";
import UiInput from "../../ui/UiInput/UiInput";
import UiSelect from "../../ui/UiSelect/UiSelect";

import { jobs } from "../../../../utils/utils";

import "../form/Form.css";
import "./FormRegistration.css";


const Form = () => {
    const [state, setState] = useState({
        check: false,
        checkGenderM: false,
        checkGenderF: false,
        checkGenderC: false,
        nameUser: "",
        surnameUser: "",
        dataOfBirth: "",
        email: "",
        password: "",
        errorEmail: false,
        errorPassword: false,
    });

    const navigate = useNavigate();
    const intl = useIntl();


    // funzione accept policy 
    const handleClick = () => {
        setState({ ...state, check: !state.check });
    };

    // funzione select gender 
    const handleClickGender = (e) => {
        let obj = { ...state }
        if (e.target.name === "check_gender_m") {
            obj.checkGenderM = !state.checkGenderM
        } else if (e.target.name === "check_gender_f") {
            obj.checkGenderF = !state.checkGenderF
        } else {
            obj.checkGenderC = !state.checkGenderC

        }
        setState(obj);

    }

    const getInputFocus = (e) => {
        let stateCpy = Object.assign(state);

        stateCpy[`error${e.target.getAttribute("name")}`] = false;
        setState({
            ...state,
            errorEmail: stateCpy.errorEmail,
            errorPassword: stateCpy.errorPassword,
        });
    };

    // funzione per nome utente 
    const getName = (e) => {
        setState({
            ...state,
            nameUser: e.target.value
        });
    }
    // funzione per cognome utente 
    const getSurname = (e) => {
        setState({
            ...state,
            surnameUser: e.target.value
        });
    }

    // funzione per data di nascita 
    const getDataOfBirth = (e) => {
        setState({
            ...state,
            dataOfBirth: e.target.value
        });
    }

    // funzione lavoro selezionato 
    const selectedJobs = (e) => {
        console.log(e)
    }

    // render jobs 

    // funzione render materie 
    const renderOptionsSubject = (job, key) => {
        return (

            <option value={job} key={key}>
                {job}
            </option>

        )
    }



    // funzione set email 
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
                data-validate={intl.formatMessage({ id: "login.errorEmailMessage" })}
                className={`Inferno ${state.errorEmail ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.nameUser.length > 0 && "hasVal"}`}
                    type={"text"}
                    name="nameUser"
                    callback={getName}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">{intl.formatMessage({ id: "register.name" })}</span>
            </div>

            {/* cognome utente */}
            <div
                data-validate={intl.formatMessage({ id: "login.errorEmailMessage" })}
                className={`Inferno ${state.errorEmail ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.surnameUser.length > 0 && "hasVal"}`}
                    type={"text"}
                    name="surnameUser"
                    callback={getSurname}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">{intl.formatMessage({ id: "register.surname" })}</span>
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
            {/* data di nascita  */}
            <div
                data-validate={intl.formatMessage({ id: "login.errorEmailMessage" })}
                className={`Inferno ${state.errorEmail ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox hasVal`}
                    type={"date"}
                    name="dataOfBirth"
                    callback={getDataOfBirth}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">{intl.formatMessage({ id: "register.birth" })}</span>
            </div>

            {/* lavoro  */}
            <UiSelect
                cssCustomSelect="cssCustomSelect"
                children={
                    <option hidden>
                        Select Your Job
                    </option>
                }
                arrToMaps={jobs}
                renderOptionsSubject={renderOptionsSubject}
                callback={selectedJobs}
            />

            {/* generi  */}
            <div className="flexRow">
                {/* genere M */}
                <div>
                    <UiInput
                        check={state.checkGenderM}
                        name="check_gender_m"
                        type="radio"
                        callback={handleClickGender}
                        callbackFocus={getInputFocus}
                        disabled={(state.checkGenderF || state.checkGenderC) ? true : false}
                    />
                    <label style={{ margin: "0 8px" }} htmlFor="check_gender_m" >
                        {intl.formatMessage({ id: "m" })}
                    </label>
                </div>
                {/* genere f  */}
                <div>
                    <UiInput
                        check={state.checkGenderF}
                        name="check_gender_f"
                        type="radio"
                        callback={handleClickGender}
                        callbackFocus={getInputFocus}
                        disabled={(state.checkGenderM || state.checkGenderC) ? true : false}

                    />
                    <label style={{ margin: "0 8px" }} htmlFor="check_gender_f" >
                        {intl.formatMessage({ id: "f" })}
                    </label>
                </div>

                {/* genere c */}
                <div>
                    <UiInput
                        check={state.checkGenderc}
                        name="check_gender_c"
                        type="radio"
                        callback={handleClickGender}
                        callbackFocus={getInputFocus}
                        disabled={(state.checkGenderF || state.checkGenderM) ? true : false}

                    />
                    <label style={{ margin: "0 8px" }} htmlFor="check_gender_c" >
                        {intl.formatMessage({ id: "c" })}
                    </label>
                </div>
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
                        {intl.formatMessage({ id: "register.Policy" })}

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
