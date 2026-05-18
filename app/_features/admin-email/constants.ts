export const EMAIL_ATTACHMENT_MAX_FILES = 5;
export const EMAIL_ATTACHMENT_MAX_FILE_SIZE = 5 * 1024 * 1024;
export const EMAIL_ATTACHMENT_MAX_TOTAL_SIZE = 15 * 1024 * 1024;

export const EMAIL_ATTACHMENT_ACCEPTED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
].join(",");

export const EMAIL_ATTACHMENT_ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
