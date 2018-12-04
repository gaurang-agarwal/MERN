import { isEmpty } from "lodash";
 import validator from 'validator';

export const validateRegistrationInput = data => {
  const errors = {};
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email address is not valid";
  }
  if (!validator.isLength(data.password,{min:6})) {
    errors.password = "Password must be atleast 6 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
