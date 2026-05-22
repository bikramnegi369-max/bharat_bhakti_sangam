import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { reserveBookingTickets } from "@/_features/bookings/services/booking.service";
import {
  buildRazorpayOrderPayload,
  createRazorpayOrder,
  validateOrderRequest,
} from "@/_features/payments/razorpay/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = validateOrderRequest(body);

    await buildRazorpayOrderPayload(booking, { skipCapacityCheck: true });

    const reservation = await reserveBookingTickets(booking, booking.eventId);

    if (!reservation.success || !reservation.data) {
      throw new Error(reservation.error || "Unable to reserve tickets.");
    }

    const reservedBooking = {
      ...booking,
      reservationId: reservation.data.reservationId,
    };
    const { order, eventName } =
      await buildRazorpayOrderPayload(reservedBooking);
    const razorpayOrder = await createRazorpayOrder(order);

    return NextResponse.json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        keyId: razorpayOrder.keyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        eventName,
        ticketType: booking.ticketType,
        tickets: booking.tickets,
        reservationId: reservation.data.reservationId,
        reservationExpiresAt: reservation.data.expiresAt,
      },
    });
  } catch (error) {
    const message =
      error instanceof ZodError
        ? "Please check your booking details."
        : error instanceof Error
          ? error.message
          : "Unable to initialise secure payment.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 },
    );
  }
}
