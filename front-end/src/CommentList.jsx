import PropTypes from 'prop-types';

function CommentList({ comments }) {
  return (
    <>
      <h3>Comments</h3>
      {comments.map(({ postedBy, text }, index) => (
        <div key={postedBy + index}>
          <h4>{postedBy}</h4>
          <p>{text}</p>
        </div>
      ))}
    </>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      postedBy: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
};

export default CommentList;
