"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions";
import { buttonClass, inputClass } from "@/components/AuthCard";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Contraseña
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
