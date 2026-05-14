import { isRecord } from "@/_utils/guards";

// This interface represents the raw data structure we expect from the backend
// before mapping 'timestamps' to 'timestamp'.
export interface RawCloudinarySignatureData {
  signature: string;
  timestamp?: number; // Could be present
  timestamps?: number; // Or this could be present
  apiKey: string;
  cloudName: string;
  folder?: string;
  returnDeleteToken?: boolean;
}

export function isRawCloudinarySignatureData(
  value: unknown,
): value is RawCloudinarySignatureData {
  if (!isRecord(value)) {
    return false;
  }

  const asRecord = value as Record<string, unknown>;

  // Check required properties
  if (
    typeof asRecord.signature !== "string" ||
    typeof asRecord.apiKey !== "string" ||
    typeof asRecord.cloudName !== "string"
  ) {
    return false;
  }

  // Ensure at least one of timestamp or timestamps is a number, and if the other exists, it's also a number or undefined.
  const hasTimestamp = typeof asRecord.timestamp === "number";
  const hasTimestamps = typeof asRecord.timestamps === "number";

  if (
    (asRecord.timestamp !== undefined && !hasTimestamp) ||
    (asRecord.timestamps !== undefined && !hasTimestamps) ||
    (!hasTimestamp && !hasTimestamps)
  ) {
    return false;
  }

  return true;
}
