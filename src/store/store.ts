import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { emptyApi } from "./api/emptyApi";
import { guestInvitePublicApi } from "./api/guestInvitePublicAPI";
import { onboardingApi } from "./api/onboarding";
import chatUnreadCount from "./slices/chatUnreadCount";
import currerntEvent from "./slices/currentEvent";

const rootReducer = combineReducers({
  [emptyApi.reducerPath]: emptyApi.reducer,
  [onboardingApi.reducerPath]: onboardingApi.reducer,
  [guestInvitePublicApi.reducerPath]: guestInvitePublicApi.reducer,
  currerntEvent,
  chatUnreadCount,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(emptyApi.middleware)
        .concat(onboardingApi.middleware)
        .concat(guestInvitePublicApi.middleware),
  });
};

export const store = setupStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
