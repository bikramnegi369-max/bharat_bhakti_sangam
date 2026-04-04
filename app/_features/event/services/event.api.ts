import { routes } from "@/_config/routes";
import axios from "@/_lib/axios";

export const getEvent = () => axios.get(routes.event);
