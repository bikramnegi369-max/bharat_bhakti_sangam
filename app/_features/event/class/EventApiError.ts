export class EventApiError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "MISSING_API_URL"
      | "NETWORK_ERROR"
      | "BAD_STATUS"
      | "INVALID_RESPONSE"
      | "INACTIVE_EVENT",
    public readonly status?: number,
  ) {
    super(message);
    this.name = "EventApiError";
  }
}
