export type AdminUser = {
  id: string;
  email?: string | null;
  name?: string | null;
};

export type StoredAdminSession = {
  user: AdminUser;
  issuedAt: number;
  expiresAt: number;
};

export type PublicAdminSession = StoredAdminSession;

export type NormalizedAuthResult = {
  accessToken: string;
  refreshToken?: string | null;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  session: StoredAdminSession;
};

export type AdminLoginFormValues = {
  email: string;
  password: string;
};
