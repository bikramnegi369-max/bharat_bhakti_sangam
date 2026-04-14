import { apiRoutes } from "@/_config/Routes.config";
import axios from "@/_lib/axios";
import { FeedbackFormData } from "@/_schemas/feedback.schema";

export const submitFeedbackForm = (payload: FeedbackFormData) =>
  axios.post(apiRoutes.feedback, payload);
