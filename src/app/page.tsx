import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { getCategories, type Category } from "@/lib/api";

async function loadCategories(): Promise<Category[] | null> {
  await connection();
  try {
    return await getCategories();
  } catch {
    return null;
  }
}

async function CategoryList() {
  const categories = await loadCategories();
  if (categories === null) {
    return <p className="mt-4 text-slate-600">No pudimos cargar los rubros. Probá de nuevo en un rato.</p>;
  }
  return (
    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <li key={category.id} className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="font-semibold text-slate-900">{category.name}</h3>
          {category.description && <p className="mt-1 text-sm text-slate-600">{category.description}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Profesionales de confianza para tu casa o tu edificio en Córdoba
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Gasistas matriculados, electricistas, técnicos de aire acondicionado y más. Verificados, con reseñas reales y
            pago seguro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registro"
              className="rounded-md bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700"
            >
              Necesito un profesional
            </Link>
            <Link
              href="/registro?tipo=profesional"
              className="rounded-md border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:border-orange-500"
            >
              Soy profesional
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Rubros</h2>
        <Suspense fallback={<p className="mt-4 text-slate-500">Cargando rubros...</p>}>
          <CategoryList />
        </Suspense>
      </section>
    </main>
  );
}
