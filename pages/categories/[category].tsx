import { NewsArticle, NewsResponse } from "../../models/NewsArticles";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Alert } from "react-bootstrap";

type CategoryNewsPageProps = {
  newsArticles: NewsArticle[];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const paths = categories.map((category) => ({
    params: { category },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({
  params,
}) => {
  const category = params?.category?.toString()!;
  const apiKey = process.env.NEWS_API_KEY!;
  const searchParams = new URLSearchParams({ country: "us", category, apiKey });
  const url = `https://newsapi.org/v2/top-headlines?${searchParams.toString()}`;
  const response = await fetch(url);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60,
  };
};

export default function CategoryNewsPage({
  newsArticles,
}: CategoryNewsPageProps) {
  const router = useRouter();
  const category = router.query.category?.toString();
  const title = `Category: ${category}`;
  const headTitle = `${title} - NextJS News App`;

  return (
    <>
      <Head>
        <title key="title">{headTitle}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        <Alert>
          This is page uses <strong>getStaticProps</strong> for very high page
          loading speed and <strong>incremental static regeneration</strong> to
          show data not older than <strong>5 minutes</strong>.
        </Alert>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
