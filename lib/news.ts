export type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url: string };
};

export async function getTopHeadlines(category = "general"): Promise<Article[]> {
  const url =
    `https://gnews.io/api/v4/top-headlines?category=${category}` +
    `&lang=en&max=12&apikey=${process.env.GNEWS_API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 600 } }); // cache 10 min
  if (!res.ok) throw new Error(`News API error: ${res.status}`);

  const data = await res.json();
  return data.articles;
}