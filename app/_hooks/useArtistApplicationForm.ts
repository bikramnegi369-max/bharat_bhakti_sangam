"use client";

import { useState } from "react";
import { submitArtistApplication } from "@/_features/artists/services/artistApplication.service";
import { ArtistApplicationFormData } from "@/_schemas/artistApplication.schema";

export type ArtistSubmitStatus = "idle" | "success" | "error";

export function useArtistApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<ArtistSubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ArtistApplicationFormData) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const res = await submitArtistApplication(data);

      if (res.success) {
        setStatus("success");
      } else {
        setErrorMessage(
          res.error || "Failed to submit your request. Please try again.",
        );
        setStatus("error");
      }
    } catch (err) {
      console.error("Artist application error:", err);
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
