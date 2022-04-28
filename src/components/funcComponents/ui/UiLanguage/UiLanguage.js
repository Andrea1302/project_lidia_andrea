import React, { useState } from "react";

import it from "../../../../assets/lanFlags/it.png";
import en from "../../../../assets/lanFlags/en.png";

import "./UiLanguage.css";

const UiLanguage = ({ currLang, callback }) => {
  const [state, setState] = useState({
    toggleDropdown: false,
  });

  const arrFlag = [
    { lang: "it", path: it },
    { lang: "en", path: en },
  ];
  let currFlag = arrFlag.filter((currFlag) => currFlag.lang === currLang)[0];

  const returnCurrLang = (params) => () =>{
      callback(params)
  }

  const renderFlag = (flag, index) => {
    if (flag.lang !== currLang) {
      return (
          <img key={index} onClick={returnCurrLang(flag.lang)} className="flag" src={flag.path} />
      );
    }
  };

  const toggle = () => {
    setState({ ...state, toggleDropdown: !state.toggleDropdown });
  };

  return (
    <div className={`dropdownFlag ${
      state.toggleDropdown ? "opened" : ""
    }`}>
      <div className="currFlag" onClick={toggle}>
        <img className="flag" src={currFlag.path} />
      </div>
      <div
        className={`flagContainer ${
          state.toggleDropdown ? "showDropdown" : ""
        }`}
      >
        {arrFlag.map(renderFlag)}
      </div>
    </div>
  );
};

export default UiLanguage;
