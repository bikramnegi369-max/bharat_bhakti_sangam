import { z } from "zod";
import { validateAttachmentFiles } from "./helpers";

function isFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

const attachmentFileSchema = z.custom<File>(isFile, {
  message: "Only valid files can be attached.",
});

export const sendEmailFormSchema = z
  .object({
    recipients: z
      .array(z.email("Enter a valid email address."))
      .min(1, "Add at least one client email."),
    subject: z
      .string()
      .trim()
      .min(3, "Subject must be at least 3 characters.")
      .max(140, "Subject cannot exceed 140 characters."),
    message: z
      .string()
      .trim()
      .min(10, "Message must be at least 10 characters.")
      .max(5000, "Message cannot exceed 5000 characters."),
    attachments: z.array(attachmentFileSchema).optional(),
  })
  .superRefine((value, ctx) => {
    const attachmentError = validateAttachmentFiles(value.attachments || []);

    if (attachmentError) {
      ctx.addIssue({
        code: "custom",
        path: ["attachments"],
        message: attachmentError,
      });
    }
  });
