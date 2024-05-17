import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const handleBlockUser = (dispatch: BaseQueryApi["dispatch"]) => {};

const baseQuery: BaseQueryFn = async () => {
  return { data: {} };
};

export const emptyApi = createApi({
  tagTypes: [],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
