"use client";

import { submitContactForm } from "@/_features/contact/services/contact.service";
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
      const res = await submitContactForm(data);

      if (res.success) {
        setStatus("success");
      } else {
        setErrorMessage(res.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form submit failed:", error);
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
