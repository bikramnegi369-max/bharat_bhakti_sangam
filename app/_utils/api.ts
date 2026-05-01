import { isRecord } from "./guards";

/**
 * Safely attempts to parse the JSON body of a Response.
 * Returns null if parsing fails.
 */
export async function getResponsePayload(response: Response): Promise<unknown> {
  return response.json().catch(() => null);
}

/**
 * Extracts the message from an API payload if it exists.
 */
export function getPayloadMessage(payload: unknown): string | undefined {
  if (!isRecord(payload)) {
    return undefined;
  }

  return typeof payload.message === "string" ? payload.message : undefined;
}