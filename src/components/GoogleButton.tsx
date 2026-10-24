"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { googleLoginAction } from "@/app/actions";

type GoogleCredentialResponse = { credential: string };

type GoogleAccountsId = {
  initialize(options: { client_id: string; callback: (response: GoogleCredentialResponse) => void }): void;
  renderButton(
    element: HTMLElement,
    options: { theme?: string; size?: string; text?: string; width?: number; locale?: string },
  ): void;
};

declare global {
  interface Window {
    google?: { accounts: { id: GoogleAccountsId } };
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

/**
 * Botón "Continuar con Google" (Google Identity Services). Google devuelve un ID token que se manda
 * al backend a través de una Server Action. No se muestra si falta NEXT_PUBLIC_GOOGLE_CLIENT_ID.
 */
export function GoogleButton({ accountType = "CLIENT" }: { accountType?: "CLIENT" | "PROFESSIONAL" }) {
  const container = useRef<HTMLDivElement>(null);
  const accountTypeRef = useRef(accountType);
  const [scriptReady, setScriptReady] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    accountTypeRef.current = accountType;
  }, [accountType]);

  const handleCredential = useCallback(async ({ credential }: GoogleCredentialResponse) => {
    setError(undefined);
    const result = await googleLoginAction(credential, accountTypeRef.current);
    if (result?.error) setError(result.error);
  }, []);

  useEffect(() => {
    if (!CLIENT_ID || !container.current || !window.google) return;
    window.google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleCredential });
    window.google.accounts.id.renderButton(container.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      width: 320,
      locale: "es",
    });
  }, [scriptReady, handleCredential]);

  if (!CLIENT_ID) return null;

  return (
    <div className="space-y-2">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={container} className="flex justify-center" />
      {error && <p className="text-center text-sm text-red-600">{error}</p>}
      <div className="flex items-center gap-3 py-2 text-xs uppercase text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />o con tu email<span className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
}
