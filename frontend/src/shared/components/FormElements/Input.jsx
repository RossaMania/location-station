import React, { useReducer } from "react";

import { validate } from "../../utils/validators.jsx";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // useReducer state initialization.
  // useReducer returns an array with 2 elements: state and dispatch function (which is used to dispatch actions to the reducer function).
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const changeHandler = (event) => {
    console.log(event.target.value);
    dispatch({ type: "CHANGE", val: event.target.value, validators: props.validators });
  };

  const element =
    props.element === "input" ? (
      // if props.element is "input", then use input tag with props.type and props.placeholder as attributes.
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      /> // if props.rows is undefined, then use 3 as default.
    ); // if props.element is not "input", then it must be "textarea".

  return (
    <div className={`form-control ${!inputState.isValid && "form-control--invalid"}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
