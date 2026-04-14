"use client";

import { submitContactForm } from "@/_features/contact/services/contact.service";
import { ApiError } from "@/_lib/axios";
import { ContactFormData } from "@/_schemas/contact.schema";
import { useState } from "react";

export type SubmitStatus = "idle" | "success" | "error";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await submitContactForm(data);
      setStatus("success");
    } catch (error) {
      console.error("Contact form submit failed:", error);
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
