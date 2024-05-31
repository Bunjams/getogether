import { Guest, InviteGuestResponse } from "types/model/guest";
import { emptyApi } from "./emptyApi";

export const userApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getGuestlist: builder.query<
      Guest[],
      { eventId: string; searchText?: string }
    >({
      query: ({ eventId, searchText }) => {
        return {
          url: `events/${eventId}/rsvp/list/?search_term=${searchText}`,
        };
      },
      providesTags: ["GUEST"],
    }),

    inviteGuest: builder.mutation<
      InviteGuestResponse,
      {
        eventId: string;
        list: {
          email: string;
          sub_event_ids: string[];
          message: string;
        }[];
      }
    >({
      query: ({ eventId, list }) => {
        return {
          url: `events/${eventId}/rsvp/create/`,
          method: "POST",
          body: {
            rsvp_invites: list,
          },
        };
      },
      invalidatesTags: ["GUEST"],
    }),
  }),
});
export const { useGetGuestlistQuery } = userApi;
