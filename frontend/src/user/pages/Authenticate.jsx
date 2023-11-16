import React, { useState } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

import "./Authenticate.css";
import Card from "../../shared/components/UIElements/Card";

const Authenticate = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

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

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // console log the formState.inputs. Send to backend later.
  };

  return (
    <Card className="authentication">
      <h2>LOG IN</h2>
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
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? "SIGN UP" : "LOG IN"}
      </Button>
    </Card>
  );
};

export default Authenticate;
