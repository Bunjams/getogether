import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatUnreadCount = {
  unreadMessages: number;
};

const initialState: ChatUnreadCount = {
  unreadMessages: 0,
};

export const chatUnreadCount = createSlice({
  name: "chatSearch",
  initialState,
  reducers: {
    setUnreadMessages: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    },
  },
});

export const { setUnreadMessages } = chatUnreadCount.actions;

export default chatUnreadCount.reducer;
