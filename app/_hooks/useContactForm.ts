"use client";

import { submitContactForm } from "@/_features/contact/services/contact.service";
import { CONTACT_CONTENT } from "@/_lib/constants/contact.constants";
import { ContactFormData } from "@/_schemas/contact.schema";
import { useState } from "react";

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);

      await submitContactForm(data);

      // Replace with  toast system
      alert(CONTACT_CONTENT.successMessage);
    } catch (error) {
      console.error("Contact form submit failed:", error);

      // Replace with toast system
      alert(CONTACT_CONTENT.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
}
