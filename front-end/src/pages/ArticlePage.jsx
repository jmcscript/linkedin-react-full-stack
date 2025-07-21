import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom';
import CommentList from '../CommentList';
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
        <CommentList comments={comments} />
      </>
    );
  }
}

async function loader({ params }) {
  const response = await axios.get(`/api/articles/${params.name}`);
  const { upvotes, comments } = response.data;
  return { upvotes, comments };
}

ArticlePage.loader = loader;

export default ArticlePage;
