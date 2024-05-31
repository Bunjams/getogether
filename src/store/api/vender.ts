import { emptyApi } from "./emptyApi";

export const userApi = emptyApi.injectEndpoints({
  endpoints: (builder) => ({
    getServicesList: builder.query<
      {
        name: string;
        uuid: string;
        category: string;
      }[],
      void
    >({
      query: () => {
        return {
          url: `vendors/services/all/`,
        };
      },
    }),
  }),
});
export const { useGetServicesListQuery } = userApi;
