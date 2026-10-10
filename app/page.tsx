import Link from "next/link";
import { getNews } from "@/lib/news";

const CATEGORIES = [
  { id: "general", label: "ראשי" },
  { id: "nation", label: "ישראל" },
  { id: "world", label: "עולם" },
  { id: "business", label: "כלכלה" },
  { id: "technology", label: "טכנולוגיה" },
  { id: "sports", label: "ספורט" },
  { id: "entertainment", label: "בידור" },
  { id: "science", label: "מדע" },
  { id: "health", label: "בריאות" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category = "general", q } = await searchParams;

  let articles: Awaited<ReturnType<typeof getNews>> = [];
  let failed = false;
  try {
    articles = await getNews({ category, q });
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="bg-gradient-to-l from-fuchsia-600 via-violet-600 to-cyan-500 px-6 py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">דיילי פולס</h1>
        <p className="mt-2 text-white/80">כותרות חדשות, ישירות מה-API</p>

        <form action="/" className="mx-auto mt-6 flex max-w-md gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="חיפוש חדשות..."
            className="flex-1 rounded-full bg-white/15 px-5 py-2 text-white placeholder-white/60 outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-white"
          />
          <button className="rounded-full bg-white px-5 py-2 font-bold text-violet-700 transition hover:bg-fuchsia-100">
            חפש
          </button>
        </form>
      </header>

      <nav className="sticky top-0 z-10 flex gap-2 overflow-x-auto border-b border-white/10 bg-slate-950/90 px-6 py-3 backdrop-blur">
        {CATEGORIES.map((c) => {
          const active = !q && c.id === category;
          return (
            <Link
              key={c.id}
              href={`/?category=${c.id}`}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                active
                  ? "bg-fuchsia-600 text-white"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      {q && (
        <p className="mx-auto max-w-6xl px-6 pt-6 text-slate-400">
          תוצאות עבור: <span className="font-bold text-cyan-400">{q}</span>
        </p>
      )}

      {failed && (
        <p className="p-10 text-center text-red-400">
          לא הצלחנו לטעון חדשות. בדוק שהשרת רץ על פורט 8000.
        </p>
      )}

      {!failed && articles.length === 0 && (
        <p className="p-10 text-center text-slate-400">לא נמצאו כתבות.</p>
      )}

      <section className="mx-auto grid max-w-6xl gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <a
            key={a.url}
            href={a.url}
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:-translate-y-1 hover:border-fuchsia-500/60 hover:shadow-lg hover:shadow-fuchsia-500/20"
          >
            {a.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={a.image} alt="" className="h-44 w-full object-cover" />
            )}
            <div className="p-4">
              <span className="text-xs font-semibold text-cyan-400">{a.source.name}</span>
              <h2 className="mt-1 text-lg font-bold leading-snug group-hover:text-fuchsia-300">
                {a.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{a.description}</p>
              <time className="mt-3 block text-xs text-slate-500">
                {new Date(a.publishedAt).toLocaleString("he-IL")}
              </time>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}