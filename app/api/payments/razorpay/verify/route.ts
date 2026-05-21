import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import {
  BookingPaymentPayload,
  submitBooking,
} from "@/_features/bookings/services/booking.service";
import {
  assertRazorpayOrderMatchesBooking,
  buildRazorpayOrderPayload,
  fetchRazorpayPayment,
  validateOrderRequest,
  verifyRazorpaySignature,
} from "@/_features/payments/razorpay/server";

export const runtime = "nodejs";

const verifySchema = z.object({
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
  booking: z.unknown(),
});

function mapRazorpayPaymentStatus(
  status?: string,
): BookingPaymentPayload["status"] {
  if (status === "failed") {
    return "failed";
  }

  if (status === "refunded") {
    return "refunded";
  }

  return "paid";
}

export async function POST(request: Request) {
  try {
    const body = verifySchema.parse(await request.json());
    const booking = validateOrderRequest(body.booking);

    const isValid = verifyRazorpaySignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed." },
        { status: 400 },
      );
    }

    const { order } = await buildRazorpayOrderPayload(booking);
    const verifiedOrder = await assertRazorpayOrderMatchesBooking({
      orderId: body.razorpay_order_id,
      expectedOrder: order,
    });
    const paymentDetails = await fetchRazorpayPayment(
      body.razorpay_payment_id,
    );

    const payment: BookingPaymentPayload = {
      provider: "razorpay",
      orderId: verifiedOrder.id,
      eventId: booking.eventId,
      paymentId: body.razorpay_payment_id,
      amount: verifiedOrder.amount,
      currency: verifiedOrder.currency,
      receipt: verifiedOrder.receipt,
      status: mapRazorpayPaymentStatus(paymentDetails.status),
      phone: Number(booking.mobile),
      notes: verifiedOrder.notes,
      method: paymentDetails.method,
      email: paymentDetails.email || booking.email,
      razorpaySignature: body.razorpay_signature,
      paidAt: paymentDetails.created_at
        ? new Date(paymentDetails.created_at * 1000).toISOString()
        : new Date().toISOString(),
    };

    const bookingResult = await submitBooking(
      booking,
      booking.eventId,
      payment,
    );

    if (!bookingResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            bookingResult.error ||
            "Payment succeeded, but booking confirmation failed. Please contact support with your payment id.",
          paymentId: body.razorpay_payment_id,
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentId: body.razorpay_payment_id,
      },
    });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? "Payment verification payload is invalid."
        : error instanceof Error
          ? error.message
          : "Payment verification failed.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 },
    );
  }
}
