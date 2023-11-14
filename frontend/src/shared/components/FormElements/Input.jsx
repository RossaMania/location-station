import React, { useEffect, useReducer } from "react";

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
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
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
    isTouched: false,
  });

  const { id, onInput } = props; // destructuring props.

  const { value, isValid } = inputState; // destructuring inputState.

  useEffect(() => {
    // props.onInput is a function that is passed from NewPlace.jsx as a prop.
    // props.id, inputState.value, and inputState.isValid are passed from NewPlace.jsx in the func as props.
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput])

  const changeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators: props.validators });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    props.element === "input" ? (
      // if props.element is "input", then use input tag with props.type and props.placeholder as attributes.
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      /> // if props.rows is undefined, then use 3 as default.
    ); // if props.element is not "input", then it must be "textarea".

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
