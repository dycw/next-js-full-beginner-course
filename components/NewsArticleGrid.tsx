import { NewsArticle } from "../models/NewsArticles";
import NewsArticleEntry from "./NewsArticleEntry";
import { Col, Row } from "react-bootstrap";

type NewsArticleGridProps = {
  articles: NewsArticle[];
};

export default function NewsArticleGrid({ articles }: NewsArticleGridProps) {
  return (
    <Row xs={1} sm={2} xl={3} className="g-4">
      {articles.map((article) => (
        <Col key={article.url}>
          <NewsArticleEntry article={article} />
        </Col>
      ))}
    </Row>
  );
}
