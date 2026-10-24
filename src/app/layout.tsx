import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handyman | Gasistas, electricistas y técnicos en Córdoba",
  description:
    "Encontrá gasistas matriculados, electricistas, técnicos de aire acondicionado y más profesionales verificados en Córdoba.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
