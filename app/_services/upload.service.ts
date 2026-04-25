/**
 * Global service to handle Cloudinary signed uploads and deletions.
 * This is centralized so it can be used by any feature in the application.
 */

import { getCloudinarySignature } from "./cloudinary.service";

export interface CloudinaryUploadResponse {
  public_id: string;
  secure_url: string;
  delete_token?: string; // Only returned if "Return delete token" is enabled in upload preset
  cloudName: string;
}

export const uploadImageToCloudinary = async (
  file: File,
  onProgress?: (progress: number) => void,
): Promise<CloudinaryUploadResponse> => {
  const payload = await getCloudinarySignature();

  if (!payload.success || !payload.data) {
    throw new Error(payload.error || "Failed to get upload signature");
  }

  const { signature, timestamp, apiKey, cloudName, folder, returnDeleteToken } =
    payload.data;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", apiKey);
  if (returnDeleteToken) {
    formData.append("return_delete_token", "true");
  }
  if (folder) {
    formData.append("folder", folder);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        resolve({
          ...result,
          cloudName,
        });
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.send(formData);
  });
};

export const deleteFromCloudinary = async (
  deleteToken: string,
  cloudName: string,
) => {
  const formData = new FormData();
  formData.append("token", deleteToken);

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`, {
    method: "POST",
    body: formData,
  });
};
