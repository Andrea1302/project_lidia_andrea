import React from "react";
import { FormattedMessage } from "react-intl";

import Form from "../../components/funcComponents/pageComponents/form/Form";

import "./Registration.css";
import "../login/Login.css"

const Registration = () => {
  return (
    <div className="containerLogin">
      <div className="bgLogin" />
      <div className="contentLogin">
        <h1><FormattedMessage id="register.header"/></h1>
        <Form />
      </div>
    </div>
  );
};

export default Registration;