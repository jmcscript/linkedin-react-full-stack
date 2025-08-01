import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Content body contains paragraph tags that must be removed to render correctly.
const stripHtml = function (str) {
  const stripRegEx = /<\/?p>/gi;
  return str.replace(stripRegEx, '');
};

function FavoriteArticleList({ entries }) {
  return (
    <>
      {entries.map((entry) => (
        <section key={entry.name}>
          <Link to={'/articles/' + entry.name}>
            <h3>{entry.title}</h3>
            <p>{stripHtml(entry.body).substring(0, 100) + '...'}</p>
          </Link>
        </section>
      ))}
    </>
  );
}

FavoriteArticleList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FavoriteArticleList;
