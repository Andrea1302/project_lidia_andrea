import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useIntl } from "react-intl";

import UiButton from "../../ui/UiButton/UiButton";
import UiInput from "../../ui/UiInput/UiInput";
import UiSelect from "../../ui/UiSelect/UiSelect";

import { checkPassword, checkMail, jobs, errorObj } from "../../../../utils/utils";

import "../form/Form.css";
import "./FormRegistration.css";


const Form = () => {
    const navigate = useNavigate();
    const intl = useIntl();

    const [state, setState] = useState({
        check: false,
        checkGenderM: false,
        checkGenderF: false,
        checkGenderC: false,
        jobsSelected: null,
        nameUser: "",
        surnameUser: "",
        dateOfBirth: "",
        email: "",
        password: "",
        passwordConfirm: "",
        error: errorObj,
    });

    // funzione accept policy 
    const handleClick = () => {
        let obj = { ...state }
        obj.check = !state.check
        if (obj.check) {
            obj.error.errorPolicy = false
        }
        setState(obj);
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
            error: {
                ...state.error,
                errorEmail: stateCpy.errorEmail,
                errorPassword: stateCpy.errorPassword,
            }
        });
    };

    // funzione per nome utente 
    const getName = (e) => {
        let obj = {...state}
        obj.nameUser = e.target.value
        if (obj.nameUser !== ""){
            obj.error.errorName = false
        }
        setState(obj);
    }
    // funzione per cognome utente 
    const getSurname = (e) => {
        let obj = {...state}
        obj.surnameUser = e.target.value
        if (obj.surnameUser !== ""){
            obj.error.errorSurname = false
        }
        setState(obj);
    }

    // funzione per data di nascita 
    const getDateOfBirth = (e) => {

        let obj = {...state}
        obj.dateOfBirth = e.target.value
        if (obj.dateOfBirth !== ""){
            obj.error.errorDateOfBirth = false
        }
        setState(obj);
    }

    // funzione lavoro selezionato 
    const selectedJobs = (e) => {
        setState({
            ...state,
            jobsSelected: e
        })
    }

    // render jobs 
    const renderOptionsSubject = (job, key) => {
        return (
            <option disabled={jobs[0] ? true : false} value={job} key={key}>
                {job}
            </option>
        )
    }

    // funzione set email 
    const getEmail = (e) => {
        setState({ ...state, email: e.target.value });
    };

    // funzione set password
    const getPassword = (e) => {
        setState({ ...state, password: e.target.value });
    };
    // funzione reinserisci password 
    const setPasswordConfirm = (e) => {
        setState({ ...state, passwordConfirm: e.target.value });
    }
    // bottone di registrazione 
    const validateInput = () => {

        let suppErrorName = state.error.errorName;
        let suppErrorSurname = state.error.errorSurname;
        let suppErrorEmail = state.error.errorEmail;
        let suppErrorPassword = state.error.errorPassword;
        let suppErrorPasswordConfirm = state.error.errorPasswordConfirm;
        let suppErrorDateOfBirth = state.error.errorDateOfBirth;
        let suppErrorPolicy = state.error.errorPolicy;

        if (state.nameUser === "") {
            suppErrorName = true;
        }
        if (state.surnameUser === "") {
            suppErrorSurname = true;
        }
        if (!checkMail(state.email)) {
            suppErrorEmail = true;
        }
        if (!checkPassword(state.password)) {
            suppErrorPassword = true;
        }
        if (state.password !== state.passwordConfirm) {
            suppErrorPasswordConfirm = true;
        }
        if (state.dateOfBirth === "") {
            suppErrorDateOfBirth = true;
        }
        if (state.check === false) {
            suppErrorPolicy = true
        }
        if (checkMail(state.email) && checkPassword(state.password) && (state.password === state.passwordConfirm) && state.check && state.nameUser !== "" && state.surnameUser !== "" && state.dateOfBirth !== "") {
            let gender = "";
            if (state.checkGenderM) {
                gender = intl.formatMessage({ id: "m" })
            } else if (state.checkGenderF) {
                gender = intl.formatMessage({ id: "f" })
            } else if (state.checkGenderC) {
                gender = intl.formatMessage({ id: "c" })
            }
            let user = {
                name: state.nameUser,
                surname: state.surnameUser,
                dateOfBirth: state.dateOfBirth,
                email: state.email,
                password: state.password,
                gender: gender,
                jobs: state.jobsSelected,
            }
            console.table(user)
            navigate("/home");
        }

        setState({
            ...state,
            error: {
                ...state.error,
                errorDateOfBirth: suppErrorDateOfBirth,
                errorName: suppErrorName,
                errorSurname: suppErrorSurname,
                errorEmail: suppErrorEmail,
                errorPassword: suppErrorPassword,
                errorPasswordConfirm: suppErrorPasswordConfirm,
                errorPolicy: suppErrorPolicy
            }

        });
    };

    // funzione torna a login 
    const redirectToLogin = () => {
        navigate("/");
    };

    return (
        <div className="UiInput">
            {/* nome utente  */}
            <div
                data-validate={intl.formatMessage({ id: "register.errorName" })}
                className={`Inferno ${state.error.errorName ? "errorMessage" : ""}`}
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
                data-validate={intl.formatMessage({ id: "register.errorSurname" })}
                className={`Inferno ${state.error.errorSurname ? "errorMessage" : ""}`}
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
                className={`Inferno ${state.error.errorEmail ? "errorMessage" : ""}`}
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
                className={`Inferno ${state.error.errorPassword ? "errorMessage" : ""}`}
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

            {/* password confirm  */}
            <div
                data-validate={intl.formatMessage({ id: "register.errorConPsw" })}
                className={`Inferno ${state.error.errorPasswordConfirm ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox ${state.passwordConfirm.length > 0 && "hasVal"}`}
                    type={"password"}
                    name="PasswordConfirm"
                    callback={setPasswordConfirm}
                    callbackFocus={getInputFocus}
                />
                <span className="spanControl"></span>
                <span className="spanLabel">Confirm Password</span>
            </div>


            {/* data di nascita  */}
            <div
                data-validate={intl.formatMessage({ id: "register.errorBirth" })}
                className={`Inferno ${state.error.errorDateOfBirth ? "errorMessage" : ""}`}
            >
                <UiInput
                    css={`inputBox hasVal`}
                    type={"date"}
                    name="DateOfBirth"
                    callback={getDateOfBirth}
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
                        check={state.checkGenderC}
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

            {/* accetta termini e condizioni  */}
            <div className="flexRow">

                <div
                    data-validate={intl.formatMessage({ id: "register.acceptPolicy" })}
                    className={`policy ${state.error.errorPolicy ? "errorMessage" : ""}`}
                >
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
                label={intl.formatMessage({ id: "register.signUpButton" }).toUpperCase()}
                callback={validateInput}
            />
            <UiButton
                css={"signUp"}
                label={intl.formatMessage({ id: "register.backButton" }).toUpperCase()}
                callback={redirectToLogin}
            />
        </div>
    );
};

export default Form;
