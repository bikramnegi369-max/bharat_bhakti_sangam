"use client";

import { submitFeedbackForm } from "@/_features/feedback/services/feedback.service";
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
      const res = await submitFeedbackForm(data);

      if (res.success) {
        setStatus("success");
      } else {
        setErrorMessage(res.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Feedback submission failed:", error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
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
