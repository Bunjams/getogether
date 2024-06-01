import { object, string } from "yup";
import { emailValidationRegex } from "./emailRegex";

export const coHostInviteValidation = object({
  email: string()
    .required("Email is required")
    .matches(emailValidationRegex, "Please enter a valid email"),
  name: string().required("Name is required"),
});
