# Razorpay Payment Integration Guide

This document explains how Razorpay payments work in this Next.js app, why each file exists, and what happens from the moment a user clicks the booking button until the ticket is created in the backend.

The current implementation uses Razorpay Standard Checkout with a secure server-side order and verification flow.

## Big Picture

The booking form does not create a ticket immediately.

Instead, the flow is:

1. User fills the booking form.
2. The browser asks this Next.js app to create a Razorpay order.
3. The Next.js server calculates the correct amount from the latest event data.
4. The Next.js server creates an order with Razorpay.
5. The browser opens Razorpay Checkout using the returned order id.
6. The user completes payment in Razorpay.
7. Razorpay returns payment ids and a signature to the browser.
8. The browser sends those details back to this Next.js app.
9. The Next.js server verifies the Razorpay signature.
10. The Next.js server fetches the Razorpay order and checks that the amount and notes match the booking.
11. Only after verification succeeds, the Next.js server calls the Express backend to create the ticket.

This keeps sensitive payment logic on the server and prevents the frontend from deciding the payment amount.

## Important Files

### Booking Form UI

`app/_features/bookings/components/BookingForm.tsx`

This is the visible booking form. It shows:

- Customer name, email, and phone fields.
- Ticket/pass selection.
- Ticket count.
- Total amount.
- Payment button.

The button text changes to show the amount, for example:

```text
Pay ₹999
```

This is only for user experience. The final trusted amount is recalculated on the server.

### Booking Page

`app/(marketing)/booking/BookingPageClient.tsx`

This component passes event details and ticket types into the booking form and hook.

It also tracks successful bookings using analytics events after the booking status becomes `success`.

### Booking Hook

`app/_hooks/useBookingForm.ts`

This hook controls the full browser-side payment flow.

When the form is submitted, it:

1. Loads Razorpay Checkout script from:

```text
https://checkout.razorpay.com/v1/checkout.js
```

2. Calls:

```text
POST /api/payments/razorpay/order
```

3. Opens Razorpay Checkout.

4. Receives Razorpay success response:

```ts
{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
```

5. Sends that response to:

```text
POST /api/payments/razorpay/verify
```

6. Shows success or error UI.

The hook never sees `RAZORPAY_KEY_SECRET`.

### Razorpay Env Helper

`app/_features/payments/razorpay/env.ts`

This file reads Razorpay credentials from environment variables:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

It imports `server-only`, which means Next.js will prevent this file from being imported into client components.

`RAZORPAY_KEY_SECRET` must never be exposed to the browser.

### Razorpay Server Logic

`app/_features/payments/razorpay/server.ts`

This is the main secure payment logic.

It does four important jobs:

1. Validates booking data.
2. Calculates the trusted amount.
3. Creates and fetches Razorpay orders.
4. Verifies Razorpay signatures.

It also imports `server-only`.

## API Routes

### Create Razorpay Order

`app/api/payments/razorpay/order/route.ts`

Endpoint:

```text
POST /api/payments/razorpay/order
```

The browser sends booking details:

```ts
{
  fullName: string;
  email: string;
  mobile: string;
  tickets: number;
  ticketType: string;
  eventId: string;
}
```

The route then:

1. Validates the request using the booking schema.
2. Loads the latest event from the backend API.
3. Checks that the event id matches the booking request.
4. Checks that booking is active.
5. Checks ticket availability.
6. Finds the selected ticket type.
7. Calculates amount in paise.
8. Creates a Razorpay order.

Razorpay expects the amount in the smallest currency unit.

For INR:

```text
₹500 = 50000 paise
```

The route returns:

```ts
{
  success: true,
  data: {
    orderId: string;
    keyId: string;
    amount: number;
    currency: "INR";
    eventName: string;
    ticketType: string;
    tickets: number;
  }
}
```

`keyId` is safe to send to the browser. Razorpay Checkout needs it.

`keySecret` is not sent to the browser.

### Verify Razorpay Payment

`app/api/payments/razorpay/verify/route.ts`

Endpoint:

```text
POST /api/payments/razorpay/verify
```

The browser sends:

```ts
{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  booking: {
    fullName: string;
    email: string;
    mobile: string;
    tickets: number;
    ticketType: string;
    eventId: string;
  }
}
```

This route:

1. Validates the request shape.
2. Validates the booking data again.
3. Verifies the Razorpay signature.
4. Rebuilds the expected order details from trusted latest event data.
5. Fetches the Razorpay order from Razorpay.
6. Checks that the Razorpay order amount, currency, event id, ticket type, and ticket count match the booking.
7. Calls the existing Express backend booking API.

If all checks pass, the user sees the booking success screen.

## How Signature Verification Works

After a successful payment, Razorpay sends:

```ts
razorpay_order_id
razorpay_payment_id
razorpay_signature
```

The server creates its own signature using:

```text
order_id + "|" + payment_id
```

and signs it with:

```text
RAZORPAY_KEY_SECRET
```

using HMAC SHA256.

If the generated signature matches `razorpay_signature`, the payment response is authentic.

In this app, signature comparison uses `crypto.timingSafeEqual` to avoid timing-based comparison leaks.

## Why The Amount Is Recalculated Server-Side

Never trust prices from the frontend.

A user can edit browser JavaScript, request payloads, or form values.

So even though the UI shows a price, the server recalculates the amount by:

1. Fetching the latest event.
2. Finding the selected ticket type.
3. Multiplying ticket price by ticket count.
4. Converting the result to paise.

This prevents a user from paying a lower amount by changing frontend data.

## Why The Razorpay Order Is Fetched Again

Signature verification proves that Razorpay returned a valid payment response for an order and payment.

But the app also fetches the Razorpay order and compares it with expected booking data.

This protects against cases where someone tries to reuse a valid order created for a different amount or ticket type.

The server checks:

- Amount
- Currency
- Event id
- Ticket type
- Ticket count

## Express Backend Integration

The final ticket is created by the existing booking service:

`app/_features/bookings/services/booking.service.ts`

That function calls:

```text
<NEXT_PUBLIC_API_URL>/booking/create-ticket
```

with:

```ts
{
  username: payload.fullName;
  eventId: eventId;
  email: payload.email;
  totalTicket: payload.tickets;
  phone: payload.mobile;
}
```

This call only happens after Razorpay verification succeeds.

## Payment Data Sent To The Express Backend

After Razorpay verification succeeds, the Next.js verify route sends payment metadata to the Express backend along with the booking details.

The backend receives:

```ts
{
  username: string;
  eventId: string;
  email: string;
  totalTicket: number;
  phone: string;
  payment: {
    provider: "razorpay";
    orderId: string;
    eventId: string;
    paymentId: string;
    amount: number;
    currency: "INR";
    receipt: string;
    status: "created" | "attempted" | "paid" | "failed" | "refunded";
    phone: number;
    notes: Record<string, string>;
    method?: string;
    email?: string;
    razorpaySignature: string;
    paidAt?: string;
  }
}
```

This matches the important fields from your Mongoose payment schema:

```ts
{
  orderId: string;
  eventId: ObjectId;
  paymentId: string;
  amount: number;
  currency: "INR";
  receipt: string;
  status: "created" | "attempted" | "paid" | "failed" | "refunded";
  phone: number;
  notes: object;
  method?: string;
  email?: string;
  razorpaySignature: string;
  paidAt?: Date;
}
```

The `amount` value is the Razorpay amount in paise.

For example:

```text
₹500 = 50000
```

The backend should either save `payment.amount` as paise or convert it intentionally before saving. Avoid silently mixing rupees and paise.

The `receipt` is the actual receipt returned by Razorpay for the order. The verification route fetches the Razorpay order again and forwards the fetched receipt to the backend.

## Backend Payment Schema

Your Express backend can save the payment data using this Mongoose schema:

```ts
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "events",
    },
    paymentId: {
      type: String,
      default: null,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    receipt: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "attempted", "paid", "failed", "refunded"],
      default: "created",
    },
    phone: {
      type: Number,
      required: true,
    },
    notes: {
      type: Object,
      default: {},
    },
    method: String,
    email: String,
    razorpaySignature: String,
    paidAt: Date,
    webhookLogs: [
      {
        event: String,
        payload: Object,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
```

### How The Payload Maps To This Schema

The Next.js app sends `payment` inside the booking request. The backend should use that object to create or update a `Payment` document.

Field mapping:

```ts
{
  orderId: payment.orderId,
  eventId: payment.eventId,
  paymentId: payment.paymentId,
  amount: payment.amount,
  currency: payment.currency,
  receipt: payment.receipt,
  status: payment.status,
  phone: payment.phone,
  notes: payment.notes,
  method: payment.method,
  email: payment.email,
  razorpaySignature: payment.razorpaySignature,
  paidAt: payment.paidAt ? new Date(payment.paidAt) : undefined,
}
```

### Why `orderId` Is Unique

`orderId` is marked as `unique: true`.

That is good for production because it prevents the same Razorpay order from creating duplicate payment records. The backend should handle duplicate-key errors gracefully. If the same `orderId` is received again, the backend can fetch or update the existing payment record instead of creating a duplicate.

### Recommended Backend Save Flow

When `/booking/create-ticket` receives a request with `payment`, the backend should:

1. Validate the booking fields.
2. Validate `payment.orderId`, `payment.paymentId`, `payment.amount`, and `payment.status`.
3. Create or upsert the `Payment` record by `orderId`.
4. Create the booking/ticket record.
5. Link the booking record to the payment record if your booking schema supports it.

Example backend idea:

```ts
const paymentDoc = await Payment.findOneAndUpdate(
  { orderId: payment.orderId },
  {
    $set: {
      eventId: payment.eventId,
      paymentId: payment.paymentId,
      amount: payment.amount,
      currency: payment.currency,
      receipt: payment.receipt,
      status: payment.status,
      phone: payment.phone,
      notes: payment.notes,
      method: payment.method,
      email: payment.email,
      razorpaySignature: payment.razorpaySignature,
      paidAt: payment.paidAt ? new Date(payment.paidAt) : undefined,
    },
  },
  {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  },
);
```

### Important Backend Notes

The backend should not trust payment data from an unauthenticated public client by itself.

In this project, the payment object is sent by the Next.js verify route only after:

- Razorpay signature verification succeeds.
- Razorpay order details are fetched from Razorpay.
- Amount, currency, event id, ticket type, and ticket count are matched.
- Razorpay payment details are fetched from Razorpay.

That makes the Next.js verify route the trusted payment gate before the Express backend saves the payment.

For even stronger production reliability, add Razorpay webhooks to the backend later. Webhooks let the backend update `status`, `paidAt`, refunds, and `webhookLogs` even if the user closes the browser after payment.

## Environment Variables

Development:

`.env.development`

Production:

`.env.production`

Required:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Also required for the existing backend calls:

```env
NEXT_PUBLIC_API_URL=
```

Do not prefix the secret with `NEXT_PUBLIC_`.

Bad:

```env
NEXT_PUBLIC_RAZORPAY_KEY_SECRET=
```

Good:

```env
RAZORPAY_KEY_SECRET=
```

Only variables prefixed with `NEXT_PUBLIC_` are meant to be exposed to browser code.

## Content Security Policy

The app has a Content Security Policy in:

`next.config.ts`

Razorpay Checkout needs permission to load scripts and frames.

The CSP allows:

```text
script-src https://checkout.razorpay.com
connect-src https://*.razorpay.com
img-src https://*.razorpay.com
frame-src https://*.razorpay.com
```

If Checkout does not open and the console shows a CSP error, check this file first.

After changing `next.config.ts`, restart the dev server.

## Testing Locally

1. Add Razorpay test credentials to `.env.development`.
2. Restart the Next.js dev server.
3. Open the booking page.
4. Fill the form.
5. Click the payment button.
6. Complete payment in Razorpay test mode.
7. Confirm that the success screen appears.
8. Confirm that the ticket was created in the backend.

## Common Errors

### Razorpay credentials are not configured

Cause:

```env
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
```

are missing.

Fix:

Add them to the correct env file and restart the server.

### Loading checkout.js violates CSP

Cause:

Razorpay is missing from `script-src`.

Fix:

Update `next.config.ts` and restart the server.

### Payment verification failed

Possible causes:

- Invalid signature.
- Wrong Razorpay secret.
- Test key and live key mismatch.
- Tampered payment response.

Fix:

Confirm that the key id and secret are from the same Razorpay mode.

### Payment order does not match the booking details

Possible causes:

- User changed booking data after order creation.
- Ticket price changed between order creation and verification.
- Wrong order id was submitted.

Fix:

Ask the user to retry the booking with fresh event data.

### Payment succeeded, but booking confirmation failed

This means Razorpay payment verification passed, but the Express backend rejected ticket creation.

Possible causes:

- Tickets sold out after payment.
- Phone number already used.
- Backend API error.

The error includes the payment id when available. Use it to manually reconcile the payment in Razorpay Dashboard.

## Production Recommendations

Before going live:

1. Store Razorpay payment metadata in the Express backend.
2. Add Razorpay webhooks for payment capture/refund reconciliation.
3. Make booking creation idempotent using `razorpay_payment_id`.
4. Ensure Razorpay Dashboard auto-capture settings are correct.
5. Use live Razorpay keys only in production.
6. Keep test keys out of production.
7. Monitor failed verification and booking-confirmation errors.
8. Add admin tooling to search bookings by Razorpay payment id.

## Mental Model For Beginners

Think of the frontend as the cashier screen.

It can show the user what they are buying, but it is not trusted to decide the final price.

Think of the Next.js API routes as the payment counter.

They talk to Razorpay, verify payment, and only then tell the backend to issue the ticket.

Think of the Express backend as the ticket printer.

It should create tickets only when the payment counter says the payment is verified.

## Source References

Razorpay Standard Checkout:

```text
https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps/
```

Razorpay Orders API:

```text
https://razorpay.com/docs/api/orders/
```
