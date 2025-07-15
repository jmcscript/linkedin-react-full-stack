import entries from '../article-content';
import FavoriteArticleList from '../FavoriteArticleList';

export default function ArticleListPage() {
  return (
    <>
      <h1>Article List</h1>
      <FavoriteArticleList entries={entries} />
    </>
  );
}
