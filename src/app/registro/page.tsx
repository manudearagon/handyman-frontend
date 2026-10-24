import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthCard } from "@/components/AuthCard";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Crear cuenta | Handyman" };

async function RegisterFormForType({ searchParams }: { searchParams: PageProps<"/registro">["searchParams"] }) {
  const { tipo } = await searchParams;
  return <RegisterForm defaultType={tipo === "profesional" ? "PROFESSIONAL" : "CLIENT"} />;
}

export default function RegisterPage({ searchParams }: PageProps<"/registro">) {
  return (
    <AuthCard title="Crear cuenta">
      <Suspense fallback={<p className="text-slate-500">Cargando...</p>}>
        <RegisterFormForType searchParams={searchParams} />
      </Suspense>
      <p className="mt-4 text-center text-sm text-slate-600">
        ¿Ya tenés cuenta?{" "}
        <Link href="/ingresar" className="font-medium text-orange-600 hover:underline">
          Ingresá
        </Link>
      </p>
    </AuthCard>
  );
}
