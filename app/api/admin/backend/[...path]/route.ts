import { NextRequest, NextResponse } from "next/server";
import {
  clearAdminAuthCookies,
  setAdminAuthCookies,
} from "@/_features/admin-auth/server/cookies";
import {
  proxyBackendResponseBody,
  refreshAgainstBackend,
  requestAdminBackend,
} from "@/_features/admin-auth/server/backend";
import {
  createSignedAdminSession,
  getAdminAuthStateFromCookies,
} from "@/_features/admin-auth/server/session";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

function isSafeMethod(method: string): boolean {
  return method === "GET" || method === "HEAD" || method === "OPTIONS";
}

function isSameOriginRequest(request: NextRequest): boolean {
  const origin = request.headers.get("origin");

  if (!origin) {
    return true;
  }

  return origin === request.nextUrl.origin;
}

function createForwardHeaders(request: NextRequest): Headers {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const accept = request.headers.get("accept");

  if (contentType) {
    headers.set("Content-Type", contentType);
  }

  if (accept) {
    headers.set("Accept", accept);
  }

  return headers;
}

async function readRequestBody(
  request: NextRequest,
): Promise<BodyInit | undefined> {
  if (request.method === "GET" || request.method === "HEAD") {
    return undefined;
  }

  const contentType = request.headers.get("content-type") ?? "";

  if (
    contentType.includes("application/json") ||
    contentType.includes("text/plain") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    return request.text();
  }

  return request.arrayBuffer();
}

function createResponseHeaders(sourceHeaders: Headers): Headers {
  const headers = new Headers();

  // Define a more robust list of headers to proxy back to the client
  const headerWhitelist = [
    "content-type",
    "cache-control",
    "etag",
    "last-modified",
    "location",
    "link",
    "x-total-count",
    "content-disposition",
  ];

  for (const header of headerWhitelist) {
    const value = sourceHeaders.get(header);
    if (value) {
      headers.set(header, value);
    }
  }
  return headers;
}

function createBackendCommunicationErrorResponse(error: unknown) {
  const isTimeout =
    error instanceof Error &&
    (error.name === "AbortError" || error.message.includes("timed out"));

  return NextResponse.json(
    {
      message: isTimeout
        ? "Backend request timed out."
        : "Failed to communicate with backend.",
    },
    { status: isTimeout ? 504 : 502 },
  );
}

async function handleProxy(request: NextRequest, context: RouteContext) {
  if (!isSafeMethod(request.method) && !isSameOriginRequest(request)) {
    return NextResponse.json(
      {
        message: "Cross-site admin requests are not allowed.",
      },
      { status: 403 },
    );
  }

  const { path } = await context.params;
  const authState = await getAdminAuthStateFromCookies();
  let activeAuth = authState;
  let refreshedAuth = null;

  if (
    (!activeAuth.accessToken || !activeAuth.session) &&
    activeAuth.refreshToken
  ) {
    let refreshResult;
    try {
      refreshResult = await refreshAgainstBackend(activeAuth);
    } catch (error) {
      const isTimeout =
        error instanceof Error &&
        (error.name === "AbortError" || error.message.includes("timed out"));

      return NextResponse.json(
        {
          message: isTimeout
            ? "Admin backend authentication timed out."
            : "Unable to verify admin authentication right now.",
        },
        { status: isTimeout ? 504 : 503 },
      );
    }

    if (refreshResult.ok) {
      refreshedAuth = refreshResult.auth;
      activeAuth = {
        accessToken: refreshResult.auth.accessToken,
        refreshToken:
          refreshResult.auth.refreshToken ?? activeAuth.refreshToken,
        session: refreshResult.auth.session,
      };
    }
  }

  if (!activeAuth.accessToken || !activeAuth.session) {
    const response = NextResponse.json(
      {
        message: "Unauthorized. Please sign in again.",
      },
      { status: 401 },
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const pathname = `/${path.join("/")}`;
  const requestBody = await readRequestBody(request);
  const forwardedHeaders = createForwardHeaders(request);

  let backendResponse;
  try {
    backendResponse = await requestAdminBackend(pathname, {
      method: request.method,
      search: request.nextUrl.search,
      body: requestBody,
      headers: forwardedHeaders,
      accessToken: activeAuth.accessToken,
    });
  } catch (error) {
    return createBackendCommunicationErrorResponse(error);
  }

  if (backendResponse.status === 401 && activeAuth.refreshToken) {
    let refreshResult;
    try {
      refreshResult = await refreshAgainstBackend(activeAuth);
    } catch (error) {
      const isTimeout =
        error instanceof Error &&
        (error.name === "AbortError" || error.message.includes("timed out"));

      return NextResponse.json(
        {
          message: isTimeout
            ? "Admin backend authentication timed out."
            : "Unable to refresh admin authentication right now.",
        },
        { status: isTimeout ? 504 : 503 },
      );
    }

    if (!refreshResult.ok) {
      const response = NextResponse.json(
        {
          message: refreshResult.message,
        },
        { status: refreshResult.status },
      );

      clearAdminAuthCookies(response);
      return response;
    }

    refreshedAuth = refreshResult.auth;
    activeAuth = {
      accessToken: refreshResult.auth.accessToken,
      refreshToken: refreshResult.auth.refreshToken ?? activeAuth.refreshToken,
      session: refreshResult.auth.session,
    };

    try {
      backendResponse = await requestAdminBackend(pathname, {
        method: request.method,
        search: request.nextUrl.search,
        body: requestBody,
        headers: forwardedHeaders,
        accessToken: activeAuth.accessToken,
      });
    } catch (error) {
      return createBackendCommunicationErrorResponse(error);
    }
  }

  const responseBody = await proxyBackendResponseBody(backendResponse);
  const response = new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: createResponseHeaders(backendResponse.headers),
  });

  if (backendResponse.status === 401) {
    // If the backend specifically says 401, we MUST clear cookies
    // to prevent the Middleware from looping the user back here.
    clearAdminAuthCookies(response);
  } else if (refreshedAuth) {
    const signedSession = await createSignedAdminSession(refreshedAuth.session);
    setAdminAuthCookies(response, refreshedAuth, signedSession);
  }
  return response;
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
