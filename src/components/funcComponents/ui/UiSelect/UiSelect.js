import React from "react";
import PropTypes from "prop-types";
import './UiSelect.css'
const UiSelect = (props) =>{
    function selectChange(e) {
        props.callback(e.target.value)
    }
    return (

        <div className="selectOption">
            <select className={props.cssCustomSelect} onChange={selectChange}>
                {props.children}
                {props.arrToMaps.map(props.renderOptionsSubject)}
            </select>
        </div>


    )
}

UiSelect.propTypes = {
    callback: PropTypes.func.isRequired,
    arrToMaps: PropTypes.array,
    renderOptionsSubject: PropTypes.func.isRequired
};

export default UiSelect