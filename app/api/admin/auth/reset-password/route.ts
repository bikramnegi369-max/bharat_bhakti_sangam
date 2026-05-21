import { NextResponse } from "next/server";
import { adminResetPasswordSchema } from "@/_schemas/adminResetPassword.schema";
import { resetPasswordAgainstBackend } from "@/_features/admin-auth/server/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { token, password } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "A valid reset token is required." },
        { status: 400 },
      );
    }

    const result = await resetPasswordAgainstBackend(token, password);

    if (!result.ok) {
      return NextResponse.json(
        { message: result.message },
        { status: result.status },
      );
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unable to complete password reset." },
      { status: 500 },
    );
  }
}
