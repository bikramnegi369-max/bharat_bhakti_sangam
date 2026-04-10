import { createAsyncThunk } from "@reduxjs/toolkit";
import { Event } from "../types";
import { getEvent } from "../services/event.api";

export const fetchEvent = createAsyncThunk<Event[]>("event/fetch", async () => {
  const res = await getEvent();
  return res.data;
});
