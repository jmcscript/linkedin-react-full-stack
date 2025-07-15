import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function FavoriteArticleList({ entries }) {
  return (
    <>
      {entries.map((entry) => (
        <section key={entry.name}>
          <Link to={'/articles/' + entry.name}>
            <h3>{entry.title}</h3>
            <p>{entry.content[0].substring(0, 100) + '...'}</p>
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
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};

export default FavoriteArticleList;
