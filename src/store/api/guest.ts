import { EventResult, GuestInvitedEvent } from "types/model/event";
import { emptyApi } from "./emptyApi";

export const guestAPI = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEventForGuest: builder.query<EventResult[], void>({
      query: () => {
        return {
          url: `events/guest/`,
        };
      },
      providesTags: ["GUEST_VIEW"],
    }),

    getEventByIdForGuest: builder.query<GuestInvitedEvent, { eventId: string }>(
      {
        query: ({ eventId }) => {
          return {
            url: `events/${eventId}/guest/`,
          };
        },
        providesTags: ["GUEST_VIEW"],
      }
    ),
  }),
});
export const { useGetAllEventForGuestQuery, useGetEventByIdForGuestQuery } =
  guestAPI;
