import { NewsResponse } from "@/models/NewsArticles";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query.q?.toString();

  if (!searchQuery) {
    return res.status(400).json({ error: "Please provide a search query" });
  }

  const apiKey = process.env.NEWS_API_KEY!;
  const params = new URLSearchParams({ q: searchQuery, apiKey });
  const url = `https://newsapi.org/v2/everything?${params.toString()}`;
  const response = await fetch(url);
  const newsResponse: NewsResponse = await response.json();
  return res.status(200).json(newsResponse.articles);
}
