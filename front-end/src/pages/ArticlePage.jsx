import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';

function ArticlePage() {
  const { name } = useParams();
  const { upvotes, comments } = useLoaderData();

  const article = articles.find((entry) => entry.name === name);

  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        <p>This article has {upvotes} upvotes.</p>
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>Comments {comments.length}</h2>
        {comments.map((comment) => (
          <p key={comment}>{comment}</p>
        ))}
      </>
    );
  }
}

export default ArticlePage;
