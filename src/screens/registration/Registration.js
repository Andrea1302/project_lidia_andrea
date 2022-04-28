import React from "react";
import { FormattedMessage } from "react-intl";

import FormRegistration from "../../components/funcComponents/pageComponents/formRegistration/FormRegistration";

import "./Registration.css";
import "../login/Login.css"

const Registration = () => {
  return (
    <div className="containerLogin">
      <div className="bgLogin" />
      <div className="contentLogin">
        <h1><FormattedMessage id="register.header"/></h1>
        <FormRegistration />
      </div>
    </div>
  );
};

export default Registration;