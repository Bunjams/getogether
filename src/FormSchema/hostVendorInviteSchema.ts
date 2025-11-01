import { object, string, array } from "yup";
import { emailValidationRegex } from "./emailRegex";

export const hostVendorInviteSchema = object({
  email: string()
    .required("Email is required")
    .matches(emailValidationRegex, "Please enter a valid email"),
  name: string().required("Name is required"),
  service: array().min(1).required("Service is required"),
});
