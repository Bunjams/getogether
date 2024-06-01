import {
  AvailableVendors,
  InvitedVendor,
  VendorService,
} from "types/model/vendor";
import { emptyApi } from "./emptyApi";

export const hostVendor = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getServicesList: builder.query<VendorService[], void>({
      query: () => {
        return {
          url: `vendors/services/all/`,
        };
      },
      providesTags: ["HOST_VENODRS"],
    }),

    getAvailableVendors: builder.query<AvailableVendors[], void>({
      query: () => {
        return {
          url: `vendors/all/`,
        };
      },
      providesTags: ["HOST_VENODRS"],
    }),

    getInvitedVendors: builder.query<
      InvitedVendor[],
      { eventId: string; searchText?: string }
    >({
      query: ({ eventId, searchText }) => {
        return {
          url: `vendors/event/${eventId}/vendor/?search_term=${searchText || ""}`,
        };
      },
      providesTags: ["HOST_VENODRS"],
    }),

    inviteVendor: builder.mutation<
      { message: string },
      { eventId: string; name: string; email: string; serviceIds: string[] }
    >({
      query: ({ eventId, name, email, serviceIds }) => {
        return {
          url: `vendors/event/${eventId}/vendor/`,
          method: "POST",
          body: {
            name,
            email,
            service_ids: serviceIds,
          },
        };
      },
      invalidatesTags: ["HOST_VENODRS"],
    }),
  }),
});
export const {
  useGetServicesListQuery,
  useGetAvailableVendorsQuery,
  useInviteVendorMutation,
  useGetInvitedVendorsQuery,
} = hostVendor;
