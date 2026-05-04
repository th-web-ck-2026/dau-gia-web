import { cookies } from "./cookie";

export const isAccessTokenExpired = (bufferMinutes: number = 5): boolean => {
  const expiresAt = cookies.get("token_expires_at");
  if (!expiresAt) return true;

  const expirationTime = parseInt(expiresAt, 10);
  if (isNaN(expirationTime)) return true;

  const bufferMs = bufferMinutes * 60 * 1000;
  return Date.now() >= expirationTime - bufferMs;
};

export const isRefreshTokenExpired = (): boolean => {
  const refreshExpiresAt = cookies.get("refresh_token_expires_at");
  if (!refreshExpiresAt) return true;

  const expirationTime = parseInt(refreshExpiresAt, 10);
  if (isNaN(expirationTime)) return true;

  return Date.now() >= expirationTime;
};

export const getAccessTokenTimeRemaining = (): number => {
  const expiresAt = cookies.get("token_expires_at");
  if (!expiresAt) return 0;

  const expirationTime = parseInt(expiresAt, 10);
  if (isNaN(expirationTime)) return 0;

  const remaining = Math.floor((expirationTime - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

export const getRefreshTokenTimeRemaining = (): number => {
  const refreshExpiresAt = cookies.get("refresh_token_expires_at");
  if (!refreshExpiresAt) return 0;

  const expirationTime = parseInt(refreshExpiresAt, 10);
  if (isNaN(expirationTime)) return 0;

  const remaining = Math.floor((expirationTime - Date.now()) / 1000);
  return remaining > 0 ? remaining : 0;
};

export const getSessionState = (): string | null => {
  return cookies.get("session_state") || null;
};
