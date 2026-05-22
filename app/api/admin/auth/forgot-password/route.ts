import { NextResponse } from "next/server";
import { adminForgotPasswordSchema } from "@/_schemas/adminForgotPassword.schema";
import { requestPasswordResetAgainstBackend } from "@/_features/admin-auth/server/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = adminForgotPasswordSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message:
            parsedBody.error.issues[0]?.message ?? "Invalid email address.",
        },
        { status: 400 },
      );
    }

    const { email } = parsedBody.data;
    const result = await requestPasswordResetAgainstBackend(email);

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    console.error("[ADMIN_AUTH_FORGOT_PASSWORD_ERROR]:", error);
    return NextResponse.json(
      {
        message: "Unable to complete the password reset request at this time.",
      },
      { status: 500 },
    );
  }
}
