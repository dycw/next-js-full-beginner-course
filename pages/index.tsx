import NewsArticleGrid from "../components/NewsArticleGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetServerSideProps } from "next";
import Head from "next/head";

type BreakingNewsPageProps = {
  newsArticles: NewsArticle[];
};

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const apiKey = process.env.NEWS_API_KEY;
  if (apiKey === undefined) {
    throw Error("apiKey is undefined");
  }
  const params = new URLSearchParams({ country: "us", apiKey });
  const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
  const response = await fetch(url);
  const newsResponse: NewsResponse = await response.json();
  return { props: { newsArticles: newsResponse.articles } };
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Breaking News - Next JS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
