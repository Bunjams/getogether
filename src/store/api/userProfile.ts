import { User } from "types/model/user";
import { emptyApi } from "./emptyApi";

export const userApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, {}>({
      query: () => {
        return {
          url: "users/profile/",
        };
      },
      providesTags: (user) => {
        return ["USER_PROFILE"];
      },
    }),

    updateUser: builder.mutation<
      User,
      { name: string; mobile: string; profile_url: string | null }
    >({
      query: ({ mobile, name, profile_url }) => {
        return {
          url: "users/profile/",
          method: "PUT",
          body: { name, profile_url, mobile },
        };
      },
    }),

    updateRole: builder.mutation<User, { role: "HOST" | "GUEST" | "VENDOR" }>({
      query: ({ role }) => {
        return {
          url: "users/profile/update-role/",
          method: "PUT",
          body: { role },
        };
      },
      invalidatesTags: ["USER_PROFILE"],
    }),
  }),
});
export const {
  useGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdateRoleMutation,
} = userApi;
