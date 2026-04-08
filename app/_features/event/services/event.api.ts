import { routes } from "@/_config/routes";
import axios from "@/_lib/axios";
import { TableService } from "@/_types/table.types";
import { Event } from "../types";
import { dummyEvents } from "@/_lib/DummyData/EventData";

export const getEvent = () => axios.get(routes.event);

export const eventService: TableService<Event> = {
  getAll: async (params) => {
    // const res = await axios.get(routes.event, { params });
    // return res.data;
    const limit = params.limit ?? 5;
    const start = (params.page - 1) * limit;
    const end = start + limit;

    return {
      items: dummyEvents.slice(start, end),
      total: dummyEvents.length,
    };
  },
  getOne: async (id) => {
    const res = await fetch(`/api/events/${id}`);
    return res.json();
  },
  delete: async (id) => {
    await fetch(`/api/events/${id}`, { method: "DELETE" });
  },
};
