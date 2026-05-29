import {
  EMAIL_ATTACHMENT_ALLOWED_MIME_TYPES,
  EMAIL_ATTACHMENT_MAX_FILES,
  EMAIL_ATTACHMENT_MAX_FILE_SIZE,
  EMAIL_ATTACHMENT_MAX_TOTAL_SIZE,
} from "./constants";
import {
  AttachmentPreviewKind,
  EmailRecipientOption,
  SendEmailFormValues,
} from "./types";
import { EventBooking } from "@/_types/EventBooking.types";

function getFileExtension(fileName: string): string {
  const extension = fileName.split(".").pop();
  return extension ? extension.toLowerCase() : "";
}

function isSupportedByExtension(extension: string): boolean {
  return [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "pdf",
    "doc",
    "docx",
    "ppt",
    "pptx",
  ].includes(extension);
}

export function normalizeRecipientList(recipients: string[]): string[] {
  return [
    ...new Set(
      recipients.map((item) => item.trim().toLowerCase()).filter(Boolean),
    ),
  ];
}

export function dedupeAttachmentFiles(files: File[]): File[] {
  const seen = new Set<string>();

  return files.filter((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function isSupportedAttachmentFile(file: File): boolean {
  const extension = getFileExtension(file.name);

  if (EMAIL_ATTACHMENT_ALLOWED_MIME_TYPES.has(file.type)) {
    return true;
  }

  return isSupportedByExtension(extension);
}

export function validateAttachmentFiles(files: File[]): string | null {
  if (files.length > EMAIL_ATTACHMENT_MAX_FILES) {
    return `You can attach up to ${EMAIL_ATTACHMENT_MAX_FILES} files per email.`;
  }

  for (const file of files) {
    if (!isSupportedAttachmentFile(file)) {
      return `${file.name} is not a supported file type.`;
    }

    if (file.size > EMAIL_ATTACHMENT_MAX_FILE_SIZE) {
      return `${file.name} exceeds the 5MB per-file limit.`;
    }
  }

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  if (totalSize > EMAIL_ATTACHMENT_MAX_TOTAL_SIZE) {
    return "Total attachment size cannot exceed 15MB.";
  }

  return null;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export function getAttachmentPreviewKind(file: File): AttachmentPreviewKind {
  if (file.type.startsWith("image/")) {
    return "image";
  }

  if (
    file.type === "application/pdf" ||
    getFileExtension(file.name) === "pdf"
  ) {
    return "pdf";
  }

  const extension = getFileExtension(file.name);

  if (extension === "doc" || extension === "docx") {
    return "word";
  }

  if (extension === "ppt" || extension === "pptx") {
    return "presentation";
  }

  return "file";
}

export function getAttachmentExtensionLabel(fileName: string): string {
  const extension = getFileExtension(fileName);

  return extension ? extension.toUpperCase() : "FILE";
}

export function getSuggestedRecipientsFromBookings(
  bookings: EventBooking[],
  limit = 12,
): EmailRecipientOption[] {
  const seen = new Set<string>();
  const recipients: EmailRecipientOption[] = [];

  for (const booking of bookings) {
    const normalizedEmail = booking.email.trim().toLowerCase();

    if (!normalizedEmail || seen.has(normalizedEmail)) {
      continue;
    }

    seen.add(normalizedEmail);
    recipients.push({
      bookingId: booking._id,
      email: normalizedEmail,
      name: booking.name,
      eventName: booking.eventName,
    });

    if (recipients.length >= limit) {
      break;
    }
  }

  return recipients;
}

export function createDefaultSendEmailValues(): SendEmailFormValues {
  return {
    recipients: [],
    subject: "",
    message: "",
    attachments: [],
  };
}

export function buildSendEmailFormData(values: SendEmailFormValues): FormData {
  const formData = new FormData();
  const normalizedRecipients = normalizeRecipientList(values.recipients);

  formData.set("recipients", JSON.stringify(normalizedRecipients));
  formData.set("subject", values.subject.trim());
  formData.set("message", values.message.trim());

  const attachments = values.attachments || [];
  for (const attachment of attachments) {
    formData.append("attachments", attachment, attachment.name);
  }

  return formData;
}

function readStringEntry(entry: FormDataEntryValue | null): string {
  return typeof entry === "string" ? entry : "";
}

function parseRecipientsEntry(entry: FormDataEntryValue | null): string[] {
  if (typeof entry !== "string" || !entry.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(entry);

    if (Array.isArray(parsed)) {
      return normalizeRecipientList(
        parsed.filter((item): item is string => typeof item === "string"),
      );
    }
  } catch {
    // Fall through to comma-delimited parsing for resilience.
  }

  return normalizeRecipientList(entry.split(","));
}

export function extractSendEmailValues(
  formData: FormData,
): SendEmailFormValues {
  return {
    recipients: parseRecipientsEntry(formData.get("recipients")),
    subject: readStringEntry(formData.get("subject")),
    message: readStringEntry(formData.get("message")),
    attachments: formData
      .getAll("attachments")
      .filter(
        (entry): entry is File => entry instanceof File && entry.size > 0,
      ),
  };
}
