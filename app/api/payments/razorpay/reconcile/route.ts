import { NextResponse } from "next/server";
import { z, ZodError } from "zod";
import {
  BookingPaymentPayload,
  submitBooking,
} from "@/_features/bookings/services/booking.service";
import {
  assertRazorpayPaymentMatchesOrder,
  assertRazorpayOrderMatchesBooking,
  buildRazorpayOrderPayload,
  fetchCapturedRazorpayPaymentForOrder,
  validateOrderRequest,
} from "@/_features/payments/razorpay/server";

export const runtime = "nodejs";

const reconcileSchema = z.object({
  razorpay_order_id: z.string().min(1),
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
    const body = reconcileSchema.parse(await request.json());
    const booking = validateOrderRequest(body.booking);

    if (!booking.reservationId) {
      return NextResponse.json(
        { success: false, error: "Reservation is required." },
        { status: 400 },
      );
    }

    const { order } = await buildRazorpayOrderPayload(booking);
    const verifiedOrder = await assertRazorpayOrderMatchesBooking({
      orderId: body.razorpay_order_id,
      expectedOrder: order,
    });
    const paymentDetails = await fetchCapturedRazorpayPaymentForOrder(
      verifiedOrder.id,
    );

    if (!paymentDetails) {
      return NextResponse.json(
        { success: false, error: "Payment is still pending." },
        { status: 202 },
      );
    }

    assertRazorpayPaymentMatchesOrder({
      payment: paymentDetails,
      expectedOrder: verifiedOrder,
    });

    const payment: BookingPaymentPayload = {
      provider: "razorpay",
      orderId: verifiedOrder.id,
      eventId: booking.eventId,
      paymentId: paymentDetails.id,
      amount: verifiedOrder.amount,
      currency: verifiedOrder.currency,
      receipt: verifiedOrder.receipt,
      status: mapRazorpayPaymentStatus(paymentDetails.status),
      phone: Number(booking.mobile),
      notes: verifiedOrder.notes,
      method: paymentDetails.method,
      email: paymentDetails.email || booking.email,
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
          paymentId: paymentDetails.id,
        },
        { status: 409 },
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        paymentId: paymentDetails.id,
      },
    });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? "Payment reconciliation payload is invalid."
        : error instanceof Error
          ? error.message
          : "Unable to check payment status.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 },
    );
  }
}
