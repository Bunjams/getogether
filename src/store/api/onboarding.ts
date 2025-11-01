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

    verifyOtp: builder.mutation<
      { data: User },
      { email?: string; otp?: string; magicLinkHash?: string }
    >({
      query: ({ email, otp, magicLinkHash }) => {
        return {
          url: "users/verify-profile/",
          method: "POST",
          body: {
            email,
            otp,
            payload: magicLinkHash,
          },
        };
      },
    }),

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

    googleAuth: builder.mutation<
      { data: User },
      {
        email: string;
        given_name: string;
        family_name: string;
        name: string;
        picture: string;
      }
    >({
      query: ({ email, family_name, given_name, name, picture }) => {
        return {
          url: "users/google/",
          method: "POST",
          body: {
            family_name,
            given_name,
            name,
            picture,
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
  useGoogleAuthMutation,
} = onboardingApi;
