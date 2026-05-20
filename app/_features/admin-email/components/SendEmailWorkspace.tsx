"use client";

import clsx from "clsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck, Paperclip, Send, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import FormActionButtons from "@/_components/common/FormActionButtons";
import { Field } from "@/_components/ui/Field/Field";
import { TagsField } from "@/_components/ui/Field/TagField";
import {
  EMAIL_ATTACHMENT_MAX_FILES,
  EMAIL_ATTACHMENT_MAX_TOTAL_SIZE,
} from "../constants";
import {
  buildSendEmailFormData,
  createDefaultSendEmailValues,
  formatBytes,
  normalizeRecipientList,
} from "../helpers";
import { sendEmailFormSchema } from "../schema";
import { sendAdminEmail } from "../services/admin-email.service";
import {
  EmailRecipientOption,
  SendEmailFormInput,
  SendEmailFormValues,
  SendEmailSummary,
} from "../types";
import { EmailAttachmentsField } from "./EmailAttachmentsField";

type SendEmailWorkspaceProps = {
  initialRecipientOptions: EmailRecipientOption[];
  suggestionsError?: string | null;
};

export function SendEmailWorkspace({
  initialRecipientOptions,
  suggestionsError,
}: SendEmailWorkspaceProps) {
  const [lastSentSummary, setLastSentSummary] = useState<SendEmailSummary | null>(null);

  const defaultValues = createDefaultSendEmailValues();
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SendEmailFormInput, unknown, SendEmailFormValues>({
    resolver: zodResolver(sendEmailFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues,
  });

  const recipients = useWatch({
    control,
    name: "recipients",
  }) ?? [];
  const attachments = useWatch({
    control,
    name: "attachments",
  }) ?? [];
  const selectedRecipients = new Set(recipients.map((recipient) => recipient.toLowerCase()));
  const totalAttachmentSize = attachments.reduce((sum, file) => sum + file.size, 0);

  const updateRecipients = (nextRecipients: string[]) => {
    setValue("recipients", normalizeRecipientList(nextRecipients), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const toggleRecipient = (email: string) => {
    if (selectedRecipients.has(email)) {
      updateRecipients(recipients.filter((recipient) => recipient !== email));
      return;
    }

    updateRecipients([...recipients, email]);
  };

  const handleAddAllRecentClients = () => {
    updateRecipients([
      ...recipients,
      ...initialRecipientOptions.map((option) => option.email),
    ]);
  };

  const handleClearDraft = () => {
    reset(createDefaultSendEmailValues());
  };

  const onSubmit = async (values: SendEmailFormValues) => {
    try {
      const response = await toast.promise(
        (async () => {
          const result = await sendAdminEmail(buildSendEmailFormData(values));

          if (!result.success) {
            throw new Error(result.error || "Failed to send email.");
          }

          return result;
        })(),
        {
          pending: "Sending email to clients...",
          success: "Email sent successfully!",
          error: {
            render({ data }) {
              return data instanceof Error
                ? data.message
                : "Failed to send email.";
            },
          },
        },
      );

      if (response.success && response.data) {
        setLastSentSummary(response.data);
      } else {
        setLastSentSummary({
          recipientCount: values.recipients.length,
          attachmentCount: values.attachments?.length,
        });
      }

      reset(createDefaultSendEmailValues());
    } catch (error) {
      console.error("Error sending admin email:", error);
    }
  };

  return (
    <div className="space-y-6">
      {lastSentSummary ? (
        <div className="rounded-4xl border border-emerald-200 bg-emerald-50 px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Delivery Complete
              </p>
              <h2 className="text-2xl font-bold text-emerald-950">
                Your client email has been dispatched.
              </h2>
              <p className="text-sm text-emerald-800">
                {lastSentSummary.recipientCount} recipient
                {lastSentSummary.recipientCount === 1 ? "" : "s"} reached with{" "}
                {lastSentSummary.attachmentCount} attachment
                {lastSentSummary.attachmentCount === 1 ? "" : "s"}.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLastSentSummary(null)}
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-100 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8"
        >
          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-black p-3 text-primary">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                      Audience
                    </p>
                    <p className="text-2xl font-bold text-slate-900">{recipients.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 text-slate-700 shadow-sm">
                    <Paperclip size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Attachments
                    </p>
                    <p className="text-2xl font-bold text-slate-900">{attachments.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white p-3 text-slate-700 shadow-sm">
                    <Send size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Payload
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {formatBytes(totalAttachmentSize)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Controller
              name="recipients"
              control={control}
              render={({ field, fieldState }) => (
                <TagsField
                  label="Recipients"
                  required
                  value={field.value}
                  onChange={(nextValue) => updateRecipients(nextValue)}
                  onBlur={field.onBlur}
                  error={fieldState.error?.message}
                  helperText="Add one or more client email addresses. Press Enter or comma after each email."
                  placeholder="Type an email address and press Enter"
                  inputMode="email"
                />
              )}
            />

            <Field
              label="Subject"
              required
              error={errors.subject?.message}
              placeholder="Share the purpose of this email"
              {...register("subject")}
            />

            <Field
              as="textarea"
              label="Message"
              required
              error={errors.message?.message}
              placeholder="Write the email your clients will receive"
              inputClassName="min-h-52!"
              {...register("message")}
            />

            <Controller
              name="attachments"
              control={control}
              render={({ field, fieldState }) => (
                <EmailAttachmentsField
                  label="Attachments"
                  value={field.value ?? []}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  helperText="Attachments stay local until you send the email, which avoids storing temporary files on the server."
                />
              )}
            />

            <FormActionButtons
              isSubmitting={isSubmitting}
              cancelOnClick={handleClearDraft}
              cancelLabel="Clear Draft"
              submitLabel="Send Email"
              submitDisabled={recipients.length === 0}
            />
          </div>
        </form>

        <aside className="space-y-6 xl:self-start">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-black p-3 text-primary">
                <ShieldCheck size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Attachment Flow
                </p>
                <h3 className="text-xl font-bold text-slate-900">Send with form submission</h3>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p className="rounded-2xl bg-slate-50 px-4 py-3">
                Files remain in the browser until you submit, so we avoid orphan uploads and keep email attachments ephemeral.
              </p>
              <p className="rounded-2xl bg-slate-50 px-4 py-3">
                Up to {EMAIL_ATTACHMENT_MAX_FILES} files are allowed, with a shared size budget of{" "}
                {formatBytes(EMAIL_ATTACHMENT_MAX_TOTAL_SIZE)} for reliable delivery.
              </p>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/20 p-3 text-slate-900">
                  <MailCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Recent Clients
                  </p>
                  <h3 className="text-xl font-bold text-slate-900">Quick recipient picks</h3>
                </div>
              </div>

              {initialRecipientOptions.length > 0 ? (
                <button
                  type="button"
                  onClick={handleAddAllRecentClients}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
                >
                  Add All
                </button>
              ) : null}
            </div>

            {suggestionsError ? (
              <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {suggestionsError}
              </div>
            ) : null}

            {initialRecipientOptions.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                No recent booking emails were found. You can still add recipients manually above.
              </div>
            ) : (
              <div className="mt-5 max-h-[32rem] overflow-y-auto pr-1">
                <div className="grid gap-3">
                  {initialRecipientOptions.map((option) => {
                    const isSelected = selectedRecipients.has(option.email);

                    return (
                      <button
                        key={option.bookingId}
                        type="button"
                        onClick={() => toggleRecipient(option.email)}
                        className={clsx(
                          "rounded-3xl border p-4 text-left transition cursor-pointer",
                          isSelected
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-slate-200 bg-slate-50 hover:bg-white",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {option.name || option.email}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">{option.email}</p>
                          </div>
                          <span
                            className={clsx(
                              "rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.2em]",
                              isSelected
                                ? "bg-black text-primary"
                                : "bg-white text-slate-500",
                            )}
                          >
                            {isSelected ? "ADDED" : "ADD"}
                          </span>
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                          Latest booking: {option.eventName}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
