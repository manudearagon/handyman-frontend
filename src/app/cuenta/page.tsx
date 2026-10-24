import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { logoutAction } from "@/app/actions";
import { ApiError, getMe } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

export const metadata: Metadata = { title: "Mi cuenta | Handyman" };

const ROLE_LABELS = {
  CLIENT: "Cliente",
  PROFESSIONAL: "Profesional",
  ADMIN: "Administrador",
} as const;

async function AccountDetails() {
  const token = await getSessionToken();
  if (!token) redirect("/ingresar");

  let user;
  try {
    user = await getMe(token);
  } catch (error) {
    // Token vencido o inválido: se vuelve a pedir el login.
    if (error instanceof ApiError && error.status === 401) redirect("/ingresar");
    throw error;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold">Hola, {user.fullName}</h1>
      <dl className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-slate-500">Email</dt>
          <dd className="font-medium">{user.email}</dd>
        </div>
        <div>
          <dt className="text-sm text-slate-500">Tipo de cuenta</dt>
          <dd className="font-medium">{ROLE_LABELS[user.role]}</dd>
        </div>
        {user.phone && (
          <div>
            <dt className="text-sm text-slate-500">Teléfono</dt>
            <dd className="font-medium">{user.phone}</dd>
          </div>
        )}
      </dl>
      <form action={logoutAction} className="mt-6">
        <button type="submit" className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:border-orange-500">
          Cerrar sesión
        </button>
      </form>
    </>
  );
}

export default function AccountPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <Suspense fallback={<p className="text-slate-500">Cargando tu cuenta...</p>}>
        <AccountDetails />
      </Suspense>
    </main>
  );
}
