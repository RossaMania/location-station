import React, { useCallback, useReducer } from "react";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators.jsx";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";

import "./NewPlace.css";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          // if inputId is equal to action.inputId, this is the input the user changed. Check if action.isValid is true.
          formIsValid = formIsValid && action.isValid;
        } else {
          // if inputId is not equal to action.inputId, this is the other inputs in the form.
          // The user didn't change these values. Check if state.inputs[inputId].isValid is true.
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          // action.inputId is the input ("title", "description", etc.) that is being changed.
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid, // formIsValid is either true or false.
      };
      default:
        return state;
  }
};

const NewPlace = () => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({type: "INPUT_CHANGE", inputId: id, value: value, isValid: isValid});
  }, []);

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // console log the formState.inputs. Send to backend later.
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
      id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
      id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
    </form>
  );
};

export default NewPlace;
