import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-orange-600">
          Handyman
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/ingresar" className="text-slate-700 hover:text-orange-600">
            Ingresar
          </Link>
          <Link href="/registro" className="rounded-md bg-orange-600 px-3 py-1.5 text-white hover:bg-orange-700">
            Crear cuenta
          </Link>
        </nav>
      </div>
    </header>
  );
}
