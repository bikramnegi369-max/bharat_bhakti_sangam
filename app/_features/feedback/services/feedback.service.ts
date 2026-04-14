import { apiRoutes } from "@/_config/Routes.config";
import axios from "@/_lib/axios";
import { FeedbackFormData } from "@/_schemas/feedback.schema";

export const submitFeedbackForm = ({ feedback, ratings, ...rest }: FeedbackFormData) =>
  axios.post(apiRoutes.feedback, {
    ...rest,
    message: feedback,
    rating: ratings,
  });
