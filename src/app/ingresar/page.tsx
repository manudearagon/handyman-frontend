import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/AuthCard";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Ingresar | Handyman" };

export default function LoginPage() {
  return (
    <AuthCard title="Ingresar">
      <LoginForm />
      <p className="mt-4 text-center text-sm text-slate-600">
        ¿No tenés cuenta?{" "}
        <Link href="/registro" className="font-medium text-orange-600 hover:underline">
          Creá una
        </Link>
      </p>
    </AuthCard>
  );
}
