import React from "react";
import PropTypes from "prop-types";

// styles
import "./UiInput.css";

const UiInput = (props) => {
  let css = props.css
  
  const returnFocus = (e) => {
    props.callbackFocus(e)
  }
  
  const callbackInput = (e) => {
    props.callback(e);
  };

  return (
    <input
      className={css}
      type={props.type}
      placeholder={props.placeholder}
      onChange={callbackInput}
      tabIndex={props.tabIndex}
      minLength={props.min}
      maxLength={props.max}
      required={props.required}
      checked={props.check}
      name={props.name}
      onFocus={returnFocus}
    />
  );
};

UiInput.propTypes = {
  callback: PropTypes.func,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  label: PropTypes.string,
};

export default UiInput;
