"use client";

import { submitFeedbackForm } from "@/_features/feedback/services/feedback.service";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { useState } from "react";

export type SubmitStatus = "idle" | "success" | "error";

export function useFeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);
      await submitFeedbackForm(data);
      setStatus("success");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => setStatus("idle");

  return { handleSubmit, isSubmitting, status, reset };
}
