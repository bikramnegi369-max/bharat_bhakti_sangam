import { adminLoginSchema } from "@/_schemas/adminLogin.schema";
import { NextResponse } from "next/server";
import { setAdminAuthCookies } from "@/_features/admin-auth/server/cookies";
import { loginAgainstBackend } from "@/_features/admin-auth/server/backend";
import {
  createSignedAdminSession,
  toPublicSession,
} from "@/_features/admin-auth/server/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = adminLoginSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message:
            parsedBody.error.issues[0]?.message ??
            "Please enter valid admin credentials.",
        },
        { status: 400 },
      );
    }

    const result = await loginAgainstBackend(parsedBody.data);

    if (!result.ok) {
      return NextResponse.json(
        {
          message: result.message,
        },
        { status: result.status },
      );
    }

    const signedSession = await createSignedAdminSession(result.auth.session);
    const response = NextResponse.json(
      {
        session: toPublicSession(result.auth.session),
      },
      { status: result.status },
    );

    setAdminAuthCookies(response, result.auth, signedSession);

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Unable to complete admin login.",
      },
      { status: 500 },
    );
  }
}
