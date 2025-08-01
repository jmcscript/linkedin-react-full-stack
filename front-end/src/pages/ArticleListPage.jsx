import { useLoaderData } from 'react-router-dom';
import FavoriteArticleList from '../FavoriteArticleList';

import axios from 'axios';

function ArticleListPage() {
  const entries = useLoaderData();

  return (
    <>
      <h1>Article List</h1>
      <FavoriteArticleList entries={entries} />
    </>
  );
}

async function loader() {
  const response = await axios.get('/api/articles');
  return response.data;
}

ArticleListPage.loader = loader;

export default ArticleListPage;
