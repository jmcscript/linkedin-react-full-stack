import axios from 'axios';
import { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import AddCommentForm from '../AddCommentForm';
import CommentList from '../CommentList';
import articles from '../article-content';
import useUser from '../hooks/useUser';

function ArticlePage() {
  const { name } = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [comments, setComments] = useState(initialComments);

  const { user } = useUser();

  const article = articles.find((entry) => entry.name === name);

  async function handleUpvoteClick() {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`/api/articles/${name}/upvote`, null, { headers });
    const { upvotes } = response.data;
    setUpvotes(upvotes);
  }

  async function handleAddComment({ nameText, commentText }) {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};

    const response = await axios.post(
      `/api/articles/${name}/comments`,
      {
        postedBy: nameText,
        text: commentText,
      },
      { headers },
    );
    const { comments } = response.data;
    setComments(comments);
  }

  if (article) {
    return (
      <>
        <h1>{article.title}</h1>
        {user && <button onClick={handleUpvoteClick}>Upvote ({upvotes})</button>}
        {article.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {user ? (
          <AddCommentForm onAddComment={handleAddComment} />
        ) : (
          <p>
            <em>Log in to add a comment</em>
          </p>
        )}
        {comments.length > 0 && <CommentList comments={comments} />}
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
