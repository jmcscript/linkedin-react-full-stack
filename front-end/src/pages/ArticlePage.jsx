import { useParams, useLoaderData } from 'react-router-dom';
import articles from '../article-content';
import axios from 'axios';

export default function ArticlePage() {
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
        {comments.map(({ postedBy, text }, index) => (
          <blockquote key={postedBy + index}>
            <h3>{postedBy}</h3>
            <p>{text}</p>
          </blockquote>
        ))}
      </>
    );
  }
}

export async function loader({ params }) {
  const response = await axios.get(`/api/articles/${params.name}`);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}
