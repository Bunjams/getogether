import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type InitialState = { eventId: string };

const initialState: InitialState = {
  eventId: "",
};

export const currerntEvent = createSlice({
  name: "currerntEvent",
  initialState,
  reducers: {
    setCurrentEventId: (state, action: PayloadAction<string>) => {
      state.eventId = action.payload;
    },
  },
});

export const { setCurrentEventId } = currerntEvent.actions;

export default currerntEvent.reducer;
