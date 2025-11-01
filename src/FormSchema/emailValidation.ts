import { object, string } from "yup";
import { emailValidationRegex } from "./emailRegex";

export const loginEmailValidation = object({
  email: string()
    .matches(emailValidationRegex, "Please enter a valid email")
    .required("Email is required"),
});
