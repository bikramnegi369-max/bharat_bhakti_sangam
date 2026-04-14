"use client";

import { submitFeedbackForm } from "@/_features/feedback/services/feedback.service";
import { ApiError } from "@/_lib/axios";
import { FeedbackFormData } from "@/_schemas/feedback.schema";
import { useState } from "react";

export type SubmitStatus = "idle" | "success" | "error";

export function useFeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await submitFeedbackForm(data);
      setStatus("success");
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
  };

  return { handleSubmit, isSubmitting, status, errorMessage, reset };
}
