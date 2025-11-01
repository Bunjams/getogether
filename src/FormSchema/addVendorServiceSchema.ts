import { object, string } from "yup";

export const addVendorServiceSchema = object({
  service_name: string().required("Service name is required"),
  service_category: string().required("Category is required"),
  // pricing_range: string().required("Pricing range is required"),
});
