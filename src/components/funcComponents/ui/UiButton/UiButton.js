import React from "react";
import PropTypes from 'prop-types';

import './UiButton.css'

const UiButton = (props) => {


    const returnValue = () => {
        props.callback()
    }

    return (
        
        <button className={`btn ${props.css}`} onClick={returnValue}>
            {props.label}
        </button>
    )

}

UiButton.defaultProps = {
    label: 'bottone',
    styleButton: '',
}

UiButton.propTypes = {
    label: PropTypes.string,
    styleButton: PropTypes.string,
    callback: PropTypes.func
}

export default UiButton