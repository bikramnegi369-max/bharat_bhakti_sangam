import { adminAuthConfig } from "../config";
import type {
  AdminLoginFormValues,
  NormalizedAuthResult,
  StoredAdminSession,
} from "../types";
import { buildAdminBackendUrl } from "./env";
import {
  getResponseMessage,
  isJsonLikeResponse,
  normalizeBackendAuthResponse,
} from "./normalize";

type AdminAuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  session: StoredAdminSession | null;
};

type AuthRequestFailure = {
  ok: false;
  status: number;
  message: string;
};

type AuthRequestSuccess = {
  ok: true;
  status: number;
  auth: NormalizedAuthResult;
};

export type AuthRequestResult = AuthRequestFailure | AuthRequestSuccess;

function createHeaders(
  headersInit?: HeadersInit,
  accessToken?: string | null,
): Headers {
  const headers = new Headers(headersInit);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
}

async function parseResponsePayload(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return null;
  }

  if (isJsonLikeResponse(response.headers)) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

export async function requestAdminBackend(
  pathname: string,
  options: {
    method?: string;
    search?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    accessToken?: string | null;
  } = {},
): Promise<Response> {
  const headers = createHeaders(options.headers, options.accessToken);

  return fetch(buildAdminBackendUrl(pathname, options.search), {
    method: options.method ?? "GET",
    body: options.body,
    cache: "no-store",
    credentials: "omit",
    headers,
  });
}

export async function loginAgainstBackend(
  values: AdminLoginFormValues,
): Promise<AuthRequestResult> {
  const response = await requestAdminBackend(
    adminAuthConfig.backend.loginPath,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminAuthConfig.backend.buildLoginPayload(values)),
    },
  );
  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: getResponseMessage(payload, "Unable to sign in."),
    };
  }

  const auth = normalizeBackendAuthResponse(payload);

  if (!auth) {
    return {
      ok: false,
      status: 500,
      message: "Backend auth response is missing required token data.",
    };
  }

  return {
    ok: true,
    status: response.status,
    auth,
  };
}

function buildRefreshRequest(state: AdminAuthState): {
  body?: string;
  headers?: HeadersInit;
} {
  if (!state.refreshToken) {
    return {};
  }

  return {
    body: JSON.stringify({
      refresh_token: state.refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

export async function refreshAgainstBackend(
  state: AdminAuthState,
): Promise<AuthRequestResult> {
  if (!state.refreshToken) {
    return {
      ok: false,
      status: 401,
      message: "Refresh token is missing.",
    };
  }

  const refreshRequest = buildRefreshRequest(state);
  const response = await requestAdminBackend(
    adminAuthConfig.backend.refreshPath,
    {
      method: "POST",
      headers: refreshRequest.headers,
      body: refreshRequest.body,
    },
  );
  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      message: getResponseMessage(payload, "Unable to refresh admin session."),
    };
  }

  const auth = normalizeBackendAuthResponse(payload, {
    fallbackUser: state.session?.user,
    fallbackRefreshToken: state.refreshToken,
  });

  if (!auth) {
    return {
      ok: false,
      status: 500,
      message: "Backend refresh response is missing required token data.",
    };
  }

  return {
    ok: true,
    status: response.status,
    auth,
  };
}

export async function logoutAgainstBackend(
  state: AdminAuthState,
): Promise<void> {
  const headers = new Headers();
  let body: string | undefined;

  if (state.accessToken) {
    headers.set("Authorization", `Bearer ${state.accessToken}`);
  }

  if (state.refreshToken) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify({
      refresh_token: state.refreshToken,
    });
  }

  try {
    await requestAdminBackend(adminAuthConfig.backend.logoutPath, {
      method: "POST",
      headers,
      body,
    });
  } catch (error) {
    // We still clear local cookies even if the backend logout request fails.
    console.error("Backend logout request failed:", error);
  }
}

export async function proxyBackendResponseBody(
  response: Response,
): Promise<string> {
  if (response.status === 204) {
    return "";
  }

  return response.text();
}
