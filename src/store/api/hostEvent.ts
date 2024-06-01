import { CreateEventResult, EventCoHost, EventResult } from "types/model/event";
import { emptyApi } from "./emptyApi";

export const hostEvent = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getEevntTypes: builder.query<string[], void>({
      query: () => {
        return {
          url: "events/types/",
        };
      },
    }),

    getAllEevnts: builder.query<EventResult[], void>({
      query: () => {
        return {
          url: "events/",
        };
      },
      providesTags: ["HOST_EVENTS"],
    }),

    getEventById: builder.query<EventResult, { eventId: string }>({
      query: ({ eventId }) => {
        return {
          url: `events/${eventId}/`,
        };
      },
      providesTags: ["HOST_EVENTS", "GUEST"],
    }),

    getEventTeam: builder.query<EventCoHost, { eventId: string }>({
      query: ({ eventId }) => {
        return {
          url: `events/${eventId}/team/`,
        };
      },
      providesTags: ["HOST_EVENTS"],
    }),

    inviteCoHost: builder.mutation<
      { message: string },
      { name: string; email: string; eventId: string }
    >({
      query: ({ name, email, eventId }) => {
        return {
          url: `events/${eventId}/host/invite/`,
          method: "POST",
          body: {
            name,
            email,
          },
        };
      },
      invalidatesTags: ["HOST_EVENTS"],
    }),

    addEvent: builder.mutation<
      CreateEventResult,
      { name: string; type: string; venue: string }
    >({
      query: ({ name, type, venue }) => {
        return {
          url: "events/",
          method: "POST",
          body: {
            name: name,
            type: type,
            venue: {
              name: venue,
              address: {
                street_address: "",
                city: "",
                state: "",
                zipcode: "",
                country: "",
              },
            },
          },
        };
      },
    }),

    updateEvent: builder.mutation<
      CreateEventResult,
      {
        eventId: string;
        endDate: string;
        startDate: string;
        multiEvent: boolean;
        subeventDetails?: {
          name: string;
          start_date: string;
          end_date: string;
          venue: {
            name: string;
            address: {
              street_address: string;
              city: string;
              state: string;
              zipcode: string;
              country: string;
            };
          };
        }[];
      }
    >({
      query: ({ endDate, startDate, multiEvent, subeventDetails, eventId }) => {
        return {
          url: `events/${eventId}/`,
          method: "PUT",
          body: {
            start_date: startDate,
            end_date: endDate,
            multi_event: multiEvent,
            subevent_details: subeventDetails,
          },
        };
      },
      invalidatesTags: ["HOST_EVENTS"],
    }),
  }),
});
export const {
  useGetAllEevntsQuery,
  useGetEventByIdQuery,
  useAddEventMutation,
  useGetEevntTypesQuery,
  useUpdateEventMutation,
  useInviteCoHostMutation,
  useGetEventTeamQuery,
} = hostEvent;
