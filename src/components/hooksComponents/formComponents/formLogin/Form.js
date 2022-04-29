import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useIntl } from "react-intl";

// import components 
import UiButton from "../../../funcComponents/ui/UiButton/UiButton";
import UiInput from "../../../funcComponents/ui/UiInput/UiInput";

// css 
import "./Form.css";

// import utils 
import { checkMail, checkPassword } from '../../../../utils/utils';

// PATHS 
import paths from "../../../../route/paths";

const Form = () => {


  const navigate = useNavigate();
  const intl = useIntl();


  const [state, setState] = useState({
    check: false,
    email: "",
    password: "",
    errorEmail: false,
    errorPassword: false,
  });

  // funzione ricordami 
  const handleClick = () => {
    setState({ ...state, check: !state.check });
  };

  // funzione onFocus ( toglie l errore) 
  const getInputFocus = (e) => {
    let stateCpy = Object.assign(state);

    stateCpy[`error${e.target.getAttribute("name")}`] = false;
    setState({
      ...state,
      errorEmail: stateCpy.errorEmail,
      errorPassword: stateCpy.errorPassword,
    });
  };

  // set mail 
  const getEmail = (e) => {
    setState({ ...state, email: e.target.value });
  };

  // set password 
  const getPassword = (e) => {
    setState({ ...state, password: e.target.value });
  };

  // funzione validate input 
  const validateInput = () => {
    let suppErrorEmail = state.errorEmail;
    let suppErrorPassword = state.errorPassword;

    if (!checkMail(state.email)) {
      suppErrorEmail = true;
    }
    if (!checkPassword(state.password)) {
      suppErrorPassword = true;
    }
    if (checkMail(state.email) && checkPassword(state.password)) {
      navigate(paths.HOMEPAGE);
    }

    setState({
      ...state,
      errorEmail: suppErrorEmail,
      errorPassword: suppErrorPassword,
    });
  };

  // vai alla pagina di registrazione 
  const redirect = () => {
    navigate(paths.REGISTRATION);
  };

  return (
    <div className="UiInput">
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
            {intl.formatMessage({ id: "login.rememberMe" })}
          </label>
        </div>
        <Link className="forgotPassword" to={"/other"}>
          {intl.formatMessage({ id: "login.forgotPassword" })}
        </Link>
      </div>
      <UiButton
        css={"login"}
        label={intl.formatMessage({ id: "loginButton" }).toUpperCase()}
        callback={validateInput}
      />
      <UiButton
        css={"signUp"}
        label={intl.formatMessage({ id: "signUpButton" }).toUpperCase()}
        callback={redirect}
      />
    </div>
  );
};

export default Form;
