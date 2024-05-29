import { object, string } from "yup";
import { emailValidationRegex } from "./emailRegex";

export const emailValidation = object({
  email: string().matches(emailValidationRegex, "Please enter a valid email"),
});
