import { useState } from 'react';
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom';
import CommentList from '../CommentList';
import articles from '../article-content';

function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  // const [comments, setComments] = useState(initialComments);

  const article = articles.find((entry) => entry.name === name);

  async function onUpvoteClick() {
    const response = await axios.post(`/api/articles/${name}/upvote`);
    const { upvotes } = response.data;
    setUpvotes(upvotes);
  }

  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        <button onClick={onUpvoteClick}>Upvote ({upvotes})</button>
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
