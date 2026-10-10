export type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
};

const API = process.env.API_URL ?? "http://localhost:8000";

export async function getNews(opts: { category?: string; q?: string }): Promise<Article[]> {
  const url = opts.q
    ? `${API}/api/search?q=${encodeURIComponent(opts.q)}`
    : `${API}/api/news?category=${opts.category ?? "general"}`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}