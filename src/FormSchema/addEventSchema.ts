import { array, object, string } from "yup";

const notRequired = {
  eventName: string().notRequired(),
  venue: string().notRequired(),
  startDate: string().notRequired(),
  endDate: string().notRequired(),
};

const required = {
  eventName: string().required(),
  venue: string().required(),
  startDate: string().required(),
  endDate: string().required(),
};

export const addEventSchema = object().shape({
  date: string().when("duration", {
    is: "SINGLE_DAY",
    then: (schema) => schema.required("Date is required"),
    otherwise: (schema) => schema.optional(),
  }),
  duration: string().required("Duration is required"),
  eventList: string().when("duration", {
    is: "MULTI_DAY",
    then: () => array().of(object().shape(required)),
    otherwise: () => array().of(object().shape(notRequired)),
  }),
});
