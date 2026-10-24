import { cookies } from "next/headers";
import type { AuthResponse } from "@/lib/api";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export async function createSession(auth: AuthResponse) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, auth.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(auth.expiresAt),
  });
}

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
