"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FeedbackRatings } from "./FeedbackRatings";
import { FeedbackFormFields } from "./FeedbackFormFields";
import { FeedbackFormActions } from "./FeedbackFormActions";
import { FeedbackFormStatus } from "./FeedbackFormStatus";
import { FeedbackFormData, feedbackSchema } from "@/_schemas/feedback.schema";
import { useFeedbackForm } from "@/_hooks/useFeedbackForm";

export function FeedbackForm() {
  const methods = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      feedback: "",
      ratings: { food: 0, management: 0, crowd: 0 },
    },
  });

  const { handleSubmit, isSubmitting, status, reset } = useFeedbackForm();

  const handleRetry = () => {
    reset();
    methods.reset();
  };

  if (status === "success" || status === "error") {
    return <FeedbackFormStatus status={status} onRetry={handleRetry} />;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="w-full max-w-2xl mx-auto rounded-2xl space-y-8"
        noValidate
      >
        <FeedbackRatings />
        <hr className="border-gray-200" />
        <FeedbackFormFields />
        <FeedbackFormActions isSubmitting={isSubmitting} />
      </form>
    </FormProvider>
  );
}
