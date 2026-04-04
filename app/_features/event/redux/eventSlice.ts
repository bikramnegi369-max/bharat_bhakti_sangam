import { createSlice } from "@reduxjs/toolkit";
import { fetchEvent } from "./eventThunk";

const eventSlice = createSlice({
  name: "events",
  initialState: {
    data: [] as any[],
    loading: false,
  },
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
