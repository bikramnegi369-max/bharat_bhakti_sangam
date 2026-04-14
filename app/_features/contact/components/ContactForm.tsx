"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormData, contactSchema } from "@/_schemas/contact.schema";
import { useContactForm } from "@/_hooks/useContactForm";
import { ContactFormHeader } from "./ContactFormHeader";
import { ContactFormFields } from "./ContactFormFields";
import { ContactFormActions } from "./ContactFormActions";
import { ContactFormStatus } from "./ContactFormStatus";

export function ContactForm() {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { email: "", phone: "", query: "" },
  });

  const { handleSubmit, isSubmitting, status, errorMessage, reset } = useContactForm();

  const handleRetry = () => {
    reset();
    methods.reset();
  };

  if (status === "success" || status === "error") {
    return <ContactFormStatus status={status} onRetry={handleRetry} errorMessage={errorMessage} />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="
          w-full
          max-w-2xl
          mx-auto
          rounded-2xl
          bg-white/95
          backdrop-blur-sm
          shadow-2xl
          border-2 border-primary
          px-[clamp(1.375rem,calc(1.054rem+1.607vw),2.5rem)]
           py-[clamp(1.875rem,calc(1.554rem+1.607vw),3rem)]
          space-y-8
        "
        noValidate
      >
        <ContactFormHeader />
        <ContactFormFields />
        <ContactFormActions isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}
