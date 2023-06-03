import placeholderImage from "../assets/images/newsarticle_placeholder.jpg";
import { NewsArticle } from "../models/NewsArticles";
import styles from "../styles/NewsArticleEntry.module.css";
import Image from "next/image";
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
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt=""
          className={`card-img-top ${styles.image}`}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
}
