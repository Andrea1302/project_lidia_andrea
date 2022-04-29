import React from "react";
import { FormattedMessage } from "react-intl";

import FormRegistration from "../../components/hooksComponents/formComponents/formRegistration/FormRegistration";

import "./Registration.css";
import "../login/Login.css"

const Registration = () => {
  return (
    <div className="containerLogin">
      <div className="bgLogin" />
      <div className="contentRegistration">
        <h1 className="title_register"><FormattedMessage id="register.header"/></h1>
        <FormRegistration />
      </div>
    </div>
  );
};

export default Registration;