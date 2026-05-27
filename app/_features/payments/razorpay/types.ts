import { BookingFormData } from "@/_schemas/booking.schema";

export type RazorpayOrderRequest = BookingFormData & {
  eventId: string;
  reservationId?: string;
};

export type RazorpayOrderResponse = {
  orderId: string;
  keyId: string;
  amount: number;
  currency: "INR";
  eventName: string;
  ticketType: string;
  tickets: number;
  reservationId: string;
  reservationExpiresAt?: string;
};

export type RazorpayVerifyRequest = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  booking: RazorpayOrderRequest;
};

export type RazorpayCheckoutSuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayCheckoutFailureResponse = {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

export type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: "INR";
  name: string;
  description: string;
  image?: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
  handler: (response: RazorpayCheckoutSuccessResponse) => void;
};

export type RazorpayCheckoutInstance = {
  open: () => void;
  close?: () => void;
  on: (
    eventName: "payment.failed",
    handler: (response: RazorpayCheckoutFailureResponse) => void,
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (
      options: RazorpayCheckoutOptions,
    ) => RazorpayCheckoutInstance;
  }
}
