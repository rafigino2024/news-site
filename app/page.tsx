import { getTopHeadlines } from "@/lib/news";

export default async function Home() {
  const articles = await getTopHeadlines();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-fuchsia-600 via-violet-600 to-cyan-500 py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Daily Pulse</h1>
        <p className="mt-2 text-white/80">Top headlines, live from the API</p>
      </header>

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
              <span className="text-xs font-semibold uppercase text-cyan-400">
                {a.source.name}
              </span>
              <h2 className="mt-1 text-lg font-bold leading-snug group-hover:text-fuchsia-300">
                {a.title}
              </h2>
              <p className="mt-2 line-clamp-3 text-sm text-slate-400">{a.description}</p>
              <time className="mt-3 block text-xs text-slate-500">
                {new Date(a.publishedAt).toLocaleString()}
              </time>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}