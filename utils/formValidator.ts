import { CreateUserProps } from "@/@types/registerProps";
import validator from "validator";

export const formValidator = (props: CreateUserProps) => {
  // form validator
  if (!validator.isEmail(props.email)) {
    return "Please enter a valid email";
  } else if (
    !validator.isAlpha(props.name) &&
    !validator.isAlpha(props.surname)
  ) {
    return "name and surname can only be alpha ";
  } else {
    return null;
  }
};
