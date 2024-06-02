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
  }),
});
export const { useGetAllEventForVendorQuery } = vendorEvents;
