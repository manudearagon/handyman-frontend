"use server";

import { redirect } from "next/navigation";
import { ApiError, login, loginWithGoogle, register } from "@/lib/api";
import { createSession, deleteSession } from "@/lib/session";

export type FormState = { error?: string } | undefined;

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function registerAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const password = String(formData.get("password") ?? "");
  if (password.length < 8) {
    return { error: "La contraseña debe tener al menos 8 caracteres" };
  }
  const accountType = field(formData, "accountType") === "PROFESSIONAL" ? "PROFESSIONAL" : "CLIENT";
  try {
    const auth = await register({
      fullName: field(formData, "fullName"),
      email: field(formData, "email"),
      phone: field(formData, "phone") || undefined,
      password,
      accountType,
    });
    await createSession(auth);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "No pudimos crear la cuenta" };
  }
  redirect("/cuenta");
}

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const auth = await login({
      email: field(formData, "email"),
      password: String(formData.get("password") ?? ""),
    });
    await createSession(auth);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "No pudimos iniciar sesión" };
  }
  redirect("/cuenta");
}

export async function googleLoginAction(
  idToken: string,
  accountType: "CLIENT" | "PROFESSIONAL",
): Promise<FormState> {
  try {
    const auth = await loginWithGoogle({
      idToken,
      accountType: accountType === "PROFESSIONAL" ? "PROFESSIONAL" : "CLIENT",
    });
    await createSession(auth);
  } catch (error) {
    return { error: error instanceof ApiError ? error.message : "No pudimos ingresar con Google" };
  }
  redirect("/cuenta");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/");
}
