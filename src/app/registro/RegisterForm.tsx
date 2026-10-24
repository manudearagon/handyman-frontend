"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions";
import { buttonClass, inputClass } from "@/components/AuthCard";

export function RegisterForm({ defaultType }: { defaultType: "CLIENT" | "PROFESSIONAL" }) {
  const [state, action, pending] = useActionState(registerAction, undefined);

  return (
    <form action={action} className="space-y-4">
      <fieldset>
        <legend className="text-sm font-medium text-slate-700">¿Qué querés hacer?</legend>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-3 py-2 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
            <input type="radio" name="accountType" value="CLIENT" defaultChecked={defaultType === "CLIENT"} />
            Contratar
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 px-3 py-2 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50">
            <input
              type="radio"
              name="accountType"
              value="PROFESSIONAL"
              defaultChecked={defaultType === "PROFESSIONAL"}
            />
            Ofrecer servicios
          </label>
        </div>
      </fieldset>
      <label className="block text-sm font-medium text-slate-700">
        Nombre y apellido
        <input name="fullName" required maxLength={120} autoComplete="name" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Email
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Teléfono (opcional)
        <input name="phone" type="tel" maxLength={30} autoComplete="tel" className={inputClass} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Contraseña
        <input
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={72}
          autoComplete="new-password"
          className={inputClass}
        />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}
