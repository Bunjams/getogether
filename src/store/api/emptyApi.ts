import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const getAccessTokenUsingRefreshToken = async ({
  refresh,
}: {
  refresh: string;
}) => {
  const response = await fetch(`${baseURL}users/refresh-token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token using refresh token");
  }

  return response.json();
};

const getAccessToken = async () => {
  let authInLocal;
  try {
    authInLocal = localStorage.getItem("authUser");
    authInLocal = JSON.parse(authInLocal || "");

    if (!authInLocal.access) {
      window.location.replace(window.location.origin + "/login");
    }
    const user = jwtDecode<{ exp: number }>(authInLocal.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (isExpired) {
      window.location.replace(window.location.origin + "/login");
    }

    if (authInLocal.access) {
      return authInLocal.access;
    }
    throw new Error("No access token present");
  } catch (error) {
    try {
      const { access } = await getAccessTokenUsingRefreshToken({
        refresh: authInLocal.refresh[0],
      });
      localStorage.setItem(
        "authUser",
        JSON.stringify({ ...authInLocal, access })
      );
    } catch (error) {
      return false;
    }
  }
};

const query = fetchBaseQuery({
  baseUrl: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const signout = () => {
  localStorage.removeItem("authUser");
  window.location.href = `${window.location.origin}/login`;
};

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const accessToken = await getAccessToken();
  const headers: { Authorization?: string } = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  let queryParams: string | FetchArgs = { url: "" };

  if (typeof args === "object") {
    queryParams = { ...args, headers };
  } else {
    queryParams = { url: args, headers };
  }

  let result = await query(queryParams, api, extraOptions);
  if (result.error) {
    if (result?.error?.status === 401) {
      signout();
    }

    return {
      error: result.error,
    };
  }

  return {
    ...result,
    data: (result.data as { data: unknown } | null)?.data,
  } as QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>;
};

export const emptyApi = createApi({
  tagTypes: ["USER_PROFILE"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
