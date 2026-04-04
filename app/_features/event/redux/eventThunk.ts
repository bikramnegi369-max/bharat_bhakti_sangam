import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEvent } from "../services/event.api";

export const fetchEvent = createAsyncThunk("event/fetch", async () => {
  const res = await getEvent();
  return res.data;
});
