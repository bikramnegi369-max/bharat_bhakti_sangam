import { apiRoutes } from "@/_config/routes";
import axios from "@/_lib/axios";
import { TableService } from "@/_types/table.types";
import { Event } from "../types";
import { dummyEvents } from "@/_lib/DummyData/EventData";

export const getEvent = () => axios.get(apiRoutes.event);

export const eventService: TableService<Event> = {
  getAll: async (params) => {
    const search =
      typeof params.search === "string"
        ? params.search.trim().toLowerCase()
        : "";
    const date = typeof params.date === "string" ? params.date : "";
    const time = typeof params.time === "string" ? params.time : "";
    const sortBy = typeof params.sortBy === "string" ? params.sortBy : "";
    const order = params.order === "desc" ? "desc" : "asc";
    const limit = params.limit ?? 5;
    let items = [...dummyEvents];

    if (search) {
      items = items.filter((event) => {
        const haystack = `${event.title} ${event.description}`.toLowerCase();
        return haystack.includes(search);
      });
    }

    if (date) {
      items = items.filter((event) => event.date.slice(0, 10) === date);
    }

    if (time) {
      items = items.filter((event) => event.date.slice(11, 16) === time);
    }

    if (sortBy === "title" || sortBy === "description" || sortBy === "date") {
      items.sort((left, right) => {
        const a = String(left[sortBy]);
        const b = String(right[sortBy]);
        return order === "desc" ? b.localeCompare(a) : a.localeCompare(b);
      });
    }

    const total = items.length;
    const start = (params.page - 1) * limit;
    const end = start + limit;

    // return {
    //   items: items.slice(start, end),
    //   total,
    // };
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: items.slice(start, end),
          total,
        });
      }, 2000);
    });
  },
  getOne: async (id) => {
    const res = await axios.get(`${apiRoutes.event}/${id}`);
    return res.data;
  },
  delete: async (id) => {
    await axios.delete(`${apiRoutes.event}/${id}`);
  },
};
