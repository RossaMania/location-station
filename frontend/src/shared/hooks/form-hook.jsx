import React, { useCallback, useReducer } from 'react'

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


export const useForm = (initialInputs, initialFormValidity) => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
}