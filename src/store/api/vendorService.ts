import { VendorService } from "types/model/vendor";
import { emptyApi } from "./emptyApi";

export const vendorService = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceCategories: builder.query<string[], void>({
      query: () => {
        return {
          url: "vendors/services/categories",
        };
      },
    }),

    getCurrentVendorAllService: builder.query<
      {
        name: string;
        uuid: string;
        email: string;
        services: VendorService[];
      },
      void
    >({
      query: () => {
        return {
          url: "vendors/services/",
        };
      },
      providesTags: ["VENDOR_SERVICE"],
    }),

    addService: builder.mutation<
      VendorService,
      {
        service_name: string;
        service_category: string;
      }
    >({
      query: ({ service_category, service_name }) => {
        return {
          url: `vendors/services/`,
          method: "POST",
          body: {
            service_category,
            service_name,
          },
        };
      },
      invalidatesTags: ["VENDOR_SERVICE"],
    }),
  }),
});
export const {
  useGetServiceCategoriesQuery,
  useGetCurrentVendorAllServiceQuery,
  useAddServiceMutation,
} = vendorService;
