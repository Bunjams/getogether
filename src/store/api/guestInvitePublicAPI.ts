import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuestInviteMagicLinkResponse } from "types/model/event";
import { User } from "types/model/user";
import { baseURL } from "./emptyApi";

export const guestInvitePublicApi = createApi({
  reducerPath: "guestInvitePublicApi",
  tagTypes: ["guestInvitePublicApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    getRSVPDetails: builder.query<
      { data: GuestInviteMagicLinkResponse },
      { payload: string }
    >({
      query: ({ payload }) => {
        return {
          url: `/events/rsvp/?payload=${payload}`,
        };
      },
    }),

    rsvpAction: builder.mutation<
      { data: User },
      { response_type: "ACCEPTED" | "REJECTED"; rsvpId: string }
    >({
      query: ({ response_type, rsvpId }) => {
        return {
          url: `events/rsvp/${rsvpId}/`,
          method: "PUT",
          body: {
            response_type,
          },
        };
      },
    }),
  }),
});

export const { useGetRSVPDetailsQuery, useRsvpActionMutation } =
  guestInvitePublicApi;
