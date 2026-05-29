export interface EmailRecipientOption {
  bookingId: string;
  email: string;
  name: string;
  eventName: string;
}

export interface SendEmailSummary {
  attachmentCount?: number;
  recipientCount: number;
}

export type AttachmentPreviewKind =
  | "image"
  | "pdf"
  | "word"
  | "presentation"
  | "file";

export interface SendEmailFormInput {
  recipients: string[];
  subject: string;
  message: string;
  attachments?: File[];
}

export interface SendEmailFormValues {
  recipients: string[];
  subject: string;
  message: string;
  attachments?: File[];
}
