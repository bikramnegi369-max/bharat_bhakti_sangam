import { NextResponse } from "next/server";
import { adminResetPasswordSchema } from "@/_schemas/adminResetPassword.schema";
import { resetPasswordAgainstBackend } from "@/_features/admin-auth/server/backend";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract token from raw body since it's not in the form-focused Zod schema
    const { token } = body;

    // Validate password using pick() to ignore the missing confirmPassword field in the API request
    const parsedBody = adminResetPasswordSchema
      .pick({ password: true })
      .safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message:
            parsedBody.error.issues[0]?.message ?? "Invalid password data.",
        },
        { status: 400 },
      );
    }

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "A valid reset token is required." },
        { status: 400 },
      );
    }

    const { password } = parsedBody.data;
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
