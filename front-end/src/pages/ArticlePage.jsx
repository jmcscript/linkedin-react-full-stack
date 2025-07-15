import { useParams } from 'react-router-dom';
import articles from '../article-content';

export default function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((entry) => entry.name === name);

  return (
    <>
      <h1>{article.title}</h1>
      {article.content.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}
