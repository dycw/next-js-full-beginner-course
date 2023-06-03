import { NewsArticle } from "../models/NewsArticles";
import { Card } from "react-bootstrap";

type NewsArticleEntryProps = {
  article: NewsArticle;
};

export default function NewsArticleEntry({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;
  return (
    <a href={url}>
      <Card className="h-100">
        <Card.Img variant="top" src={validImageUrl}></Card.Img>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
