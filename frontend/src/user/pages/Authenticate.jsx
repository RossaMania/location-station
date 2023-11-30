import React, { useState } from "react";


import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import Input from "../../shared/components/FormElements/Input";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import "./Authenticate.css";

import { useForm } from "../../shared/hooks/form-hook";
import { useAuth } from "../../shared/hooks/auth-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Authenticate = () => {

  const auth = useAuth();

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          // Spread out the inputs. Keep the email and password states, and reset the name to "undefined".
          ...formState.inputs,
          name: undefined,
        },
        // If the email and password are valid, set the form to valid.
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else { // If the user is switching from login to signup, reset the name input.
      setFormData(
        {
          ...formState.inputs, // Spread out the inputs (email and password) and add the name input.
          name: {
            value: "",
            isValid: false
          } // Set the name to an empty string and isValid to false (because name input is blank.
        },
        false // Set the form to invalid since the name input is blank and not valid.
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
    console.log("SWITCHED!");
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {

    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Send the request body as JSON.
          },
          body: JSON.stringify({
            // Convert the form data to JSON.
            name: formState.inputs.name.value, // Get the name from the formState.
            email: formState.inputs.email.value, // Get the email from the formState.
            password: formState.inputs.password.value, // Get the password from the formState.
          }),
        }); // Send a POST request to the signup route.

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        console.log(responseData);
        setIsLoading(false);
        auth.login(); // Call the login function from the auth-context.js file.
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Oops! Something went wrong! Please try again later!");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        {
          isLoginMode ? (
            <h2>LOG IN</h2>
          ) : (
            <h2>SIGN UP</h2>
          ) /* If isLoginMode is true, display "LOG IN". Else, display "SIGN UP". */
        }
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid e-mail address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Passwords must be at least 8 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOG IN" : "SIGN UP"}
          </Button>
        </form>
        {
          isLoginMode ? (
            <h3>Not registered?</h3>
          ) : (
            <h3>Already registered?</h3>
          ) /* If isLoginMode is true, display "Not registered?". Else, display "Already registered?". */
        }
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "SIGN UP" : "LOG IN"}
        </Button>
      </Card>
    </>
  );
};

export default Authenticate;
