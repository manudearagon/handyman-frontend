export function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="flex flex-1 items-start justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">{title}</h1>
        {children}
      </div>
    </main>
  );
}

export const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500";

export const buttonClass =
  "w-full rounded-md bg-orange-600 px-4 py-2 font-medium text-white hover:bg-orange-700 disabled:opacity-60";
