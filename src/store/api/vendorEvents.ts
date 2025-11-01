import { VendorInvitedEvent } from "types/model/vendor";
import { emptyApi } from "./emptyApi";

export const vendorEvents = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventForVendor: builder.query<
      VendorInvitedEvent,
      { show_upcoming?: boolean; searchText?: string }
    >({
      query: ({ show_upcoming, searchText }) => {
        return {
          url: `vendors/events/?show_upcoming=${show_upcoming || ""}&search_term=${searchText || ""}`,
        };
      },
      providesTags: ["VENDOR_EVENTS"],
    }),

    updateVendorEventStatus: builder.mutation<
      VendorInvitedEvent,
      {
        eventId: string;
        status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
      }
    >({
      query: ({ eventId, status }) => {
        return {
          url: `vendors/events/${eventId}/`,
          method: "PUT",
          body: {
            status,
          },
        };
      },
      invalidatesTags: ["VENDOR_EVENTS"],
    }),
  }),
});
export const {
  useGetAllEventForVendorQuery,
  useUpdateVendorEventStatusMutation,
} = vendorEvents;
