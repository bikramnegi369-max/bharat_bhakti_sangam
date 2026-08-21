"use client";

import { useState } from "react";
import { submitInfluencerForm } from "@/_features/influencer/services/influencer.service";
import { InfluencerFormData } from "@/_schemas/influencer.schema";

export type InfluencerSubmitStatus = "idle" | "success" | "error";

export function useInfluencerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<InfluencerSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: InfluencerFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const res = await submitInfluencerForm(data);

      if (res.success) {
        setStatus("success");
      } else {
        setErrorMessage(
          res.error || "Failed to submit your request. Please try again.",
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Influencer form error:", err);
      setStatus("error");
      setErrorMessage("Something unexpected happened. Please try again.");
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
