import "server-only";

import crypto from "node:crypto";
import { z } from "zod";
import { getLatestEvent } from "@/_features/event/services/event.service";
import { bookingSchema } from "@/_schemas/booking.schema";
import { getRazorpayEnv } from "./env";
import type { RazorpayOrderRequest } from "./types";

const RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders";
const RAZORPAY_PAYMENTS_URL = "https://api.razorpay.com/v1/payments";
const CURRENCY = "INR" as const;
const RECEIPT_MAX_LENGTH = 40;

type RazorpayOrderPayload = {
  amount: number;
  currency: typeof CURRENCY;
  receipt: string;
  notes: Record<string, string>;
};

type RazorpayOrderApiResponse = {
  id?: string;
  amount?: number;
  currency?: string;
  receipt?: string;
  status?: "created" | "attempted" | "paid";
  notes?: Record<string, string>;
};

export type VerifiedRazorpayOrder = {
  id: string;
  amount: number;
  currency: typeof CURRENCY;
  receipt: string;
  status: "created" | "attempted" | "paid";
  notes: Record<string, string>;
};

export type RazorpayPaymentDetails = {
  id: string;
  amount?: number;
  currency?: string;
  status?: string;
  method?: string;
  email?: string;
  contact?: string;
  created_at?: number;
};

export function validateOrderRequest(payload: unknown): RazorpayOrderRequest {
  const parsed = bookingSchema
    .extend({
      eventId: z.string().min(1, "Event is required"),
    })
    .parse(payload);

  return parsed;
}

function toPaise(amount: number): number {
  return Math.round(amount * 100);
}

function createReceipt(eventId: string): string {
  const uniquePart = crypto.randomUUID().replaceAll("-", "").slice(0, 18);
  return `bk_${eventId.slice(-12)}_${uniquePart}`.slice(0, RECEIPT_MAX_LENGTH);
}

function getEventTicketTypes(
  bookingType: Awaited<ReturnType<typeof getLatestEvent>>["bookingType"],
) {
  return (Array.isArray(bookingType) ? bookingType : [bookingType])
    .filter(
      (ticketType): ticketType is { name: string; price: number } =>
        typeof ticketType?.name === "string" &&
        typeof ticketType.price === "number",
    )
    .map((ticketType) => ({
      name: ticketType.name,
      price: ticketType.price,
    }));
}

export async function buildRazorpayOrderPayload(
  request: RazorpayOrderRequest,
): Promise<{
  order: RazorpayOrderPayload;
  eventName: string;
  ticketPrice: number;
}> {
  const event = await getLatestEvent();

  if (event._id !== request.eventId) {
    throw new Error("This booking session is no longer valid. Please refresh and try again.");
  }

  if (event.isActive === false) {
    throw new Error("Booking is closed for this event.");
  }

  if (
    typeof event.availableTickets === "number" &&
    event.availableTickets < request.tickets
  ) {
    throw new Error("Tickets sold out");
  }

  const selectedTicket = getEventTicketTypes(event.bookingType).find(
    (ticketType) => ticketType.name === request.ticketType,
  );

  if (!selectedTicket || selectedTicket.price <= 0) {
    throw new Error("Selected ticket type is unavailable.");
  }

  const amount = toPaise(selectedTicket.price * request.tickets);

  return {
    eventName: event.eventName,
    ticketPrice: selectedTicket.price,
    order: {
      amount,
      currency: CURRENCY,
      receipt: createReceipt(event._id),
      notes: {
        eventId: event._id,
        eventName: event.eventName,
        ticketType: selectedTicket.name,
        tickets: String(request.tickets),
        customerName: request.fullName,
        customerEmail: request.email,
        customerMobile: request.mobile,
      },
    },
  };
}

export async function createRazorpayOrder(payload: RazorpayOrderPayload) {
  const { keyId } = getRazorpayEnv();

  const response = await fetch(RAZORPAY_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: getRazorpayAuthHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as RazorpayOrderApiResponse & {
    error?: { description?: string };
  };

  if (!response.ok || !data.id || data.amount !== payload.amount) {
    throw new Error(
      data.error?.description || "Unable to initialise secure payment.",
    );
  }

  return {
    id: data.id,
    amount: payload.amount,
    currency: CURRENCY,
    keyId,
  };
}

function getRazorpayAuthHeader() {
  const { keyId, keySecret } = getRazorpayEnv();
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export async function assertRazorpayOrderMatchesBooking({
  orderId,
  expectedOrder,
}: {
  orderId: string;
  expectedOrder: RazorpayOrderPayload;
}): Promise<VerifiedRazorpayOrder> {
  const response = await fetch(`${RAZORPAY_ORDERS_URL}/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: getRazorpayAuthHeader(),
    },
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as RazorpayOrderApiResponse & {
    error?: { description?: string };
  };

  if (
    !response.ok ||
    !data.id ||
    typeof data.amount !== "number" ||
    !data.receipt
  ) {
    throw new Error(
      data.error?.description || "Unable to verify payment order details.",
    );
  }

  const notes = data.notes ?? {};
  const matchesBooking =
    data.amount === expectedOrder.amount &&
    data.currency === expectedOrder.currency &&
    notes.eventId === expectedOrder.notes.eventId &&
    notes.ticketType === expectedOrder.notes.ticketType &&
    notes.tickets === expectedOrder.notes.tickets;

  if (!matchesBooking) {
    throw new Error("Payment order does not match the booking details.");
  }

  return {
    id: data.id,
    amount: data.amount,
    currency: CURRENCY,
    receipt: data.receipt,
    status: data.status ?? "attempted",
    notes,
  };
}

export async function fetchRazorpayPayment(
  paymentId: string,
): Promise<RazorpayPaymentDetails> {
  const response = await fetch(`${RAZORPAY_PAYMENTS_URL}/${paymentId}`, {
    method: "GET",
    headers: {
      Authorization: getRazorpayAuthHeader(),
    },
    cache: "no-store",
  });

  const data = (await response.json().catch(() => ({}))) as RazorpayPaymentDetails & {
    error?: { description?: string };
  };

  if (!response.ok || !data.id) {
    throw new Error(
      data.error?.description || "Unable to verify payment details.",
    );
  }

  return data;
}

export function verifyRazorpaySignature({
  orderId,
  paymentId,
  signature,
}: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const { keySecret } = getRazorpayEnv();
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const actual = Buffer.from(signature, "hex");

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
