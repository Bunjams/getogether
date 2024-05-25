import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "types/model/user";
import { baseURL } from "./emptyApi";

export const onboardingApi = createApi({
  reducerPath: "onboardingApi",
  tagTypes: ["onboarding"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<void, { email: string }>({
      query: ({ email }) => {
        return {
          url: "users/sign-in/",
          method: "POST",
          body: { email },
        };
      },
    }),

    signUp: builder.mutation<void, { email: string }>({
      query: ({ email }) => {
        return {
          url: "users/sign-up/",
          method: "POST",
          body: { email },
        };
      },
    }),

    verifyOtp: builder.mutation<{ data: User }, { email: string; otp: string }>(
      {
        query: ({ email, otp }) => {
          return {
            url: "users/verify-profile/",
            method: "POST",
            body: {
              email,
              otp,
            },
          };
        },
      }
    ),

    resendOTP: builder.mutation<void, { email: string }>({
      query: ({ email }) => {
        return {
          url: "users/resend-otp/",
          method: "POST",
          body: {
            email,
          },
        };
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useResendOTPMutation,
} = onboardingApi;
