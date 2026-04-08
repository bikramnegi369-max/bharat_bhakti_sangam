import { createSlice } from "@reduxjs/toolkit";
import { fetchEvent } from "./eventThunk";
import { Event } from "../types";

interface EventState {
  data: Event[];
  loading: boolean;
}

const initialState: EventState = {
  data: [],
  loading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEvent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default eventSlice.reducer;
