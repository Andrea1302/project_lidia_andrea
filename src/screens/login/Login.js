import React from "react";
import { FormattedMessage } from "react-intl";

import Form from "../../components/funcComponents/pageComponents/form/Form";

import "./Login.css";

const Login = () => {
  return (
    <div className="containerLogin">
      <div className="bgLogin" />
      <div className="contentLogin">
        <h1><FormattedMessage id="login.header"/></h1>
        <Form />
      </div>
    </div>
  );
};

export default Login;
