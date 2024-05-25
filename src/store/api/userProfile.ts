import { User } from "types/model/user";
import { emptyApi } from "./emptyApi";

export const userApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ data: User }, void>({
      query: () => {
        return {
          url: "/users/profile/",
        };
      },
    }),
  }),
});
// FIXME: CORS error
export const { useGetUsersQuery } = userApi;
