import { requestAdminBackend, refreshAgainstBackend } from "./backend";
import {
  getAdminAuthStateFromCookies,
  createSignedAdminSession,
} from "./session";
import {
  setAdminAuthCookiesServerSide,
  clearAdminAuthCookiesServerSide,
} from "./cookies";

export async function authorizedAdminRequest(
  path: string,
  options: { method?: string; body?: any; search?: string } = {},
) {
  let authState = await getAdminAuthStateFromCookies();

  // Proactive Refresh: If token is missing but refresh token exists, refresh now
  if (!authState.accessToken && authState.refreshToken) {
    const refreshResult = await refreshAgainstBackend(authState);
    if (refreshResult.ok) {
      const newAuth = refreshResult.auth;
      const signedSession = await createSignedAdminSession(newAuth.session);

      await setAdminAuthCookiesServerSide(newAuth, signedSession);

      authState = {
        accessToken: newAuth.accessToken,
        refreshToken: newAuth.refreshToken ?? authState.refreshToken,
        session: newAuth.session,
      };
    }
  }

  // 1. Attempt the request
  let response = await requestAdminBackend(path, {
    method: options.method ?? "GET",
    body: options.body,
    search: options.search,
    accessToken: authState.accessToken,
  });

  // 2. Reactive Refresh: If 401, try to refresh and retry once
  if (response.status === 401 && authState.refreshToken) {
    const refreshResult = await refreshAgainstBackend(authState);

    if (refreshResult.ok) {
      const newAuth = refreshResult.auth;
      const signedSession = await createSignedAdminSession(newAuth.session);

      // Persist new tokens to cookies for future requests.
      await setAdminAuthCookiesServerSide(newAuth, signedSession);

      // Retry the original request with the new token
      response = await requestAdminBackend(path, {
        method: options.method ?? "GET",
        body: options.body,
        search: options.search,
        accessToken: newAuth.accessToken,
      });
    } else {
      await clearAdminAuthCookiesServerSide();
    }
  }

  return response;
}
