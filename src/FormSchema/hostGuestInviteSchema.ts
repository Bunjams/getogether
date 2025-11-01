import { array, object, string } from "yup";
import { emailValidationRegex } from "./emailRegex";

const required = {
  name: string().required(),
  email: string()
    .matches(emailValidationRegex, "Please enter a valid email")
    .required("Email is required"),
  // sub_event_ids: array().when("multi_event", {
  //   is: true,
  //   then: (schema) => schema.required("Date is required"),
  //   otherwise: (schema) => schema.optional(),
  // }),
};

export const hostGuestInviteSchema = object({
  rsvp_invites: array().of(object(required)),
});
