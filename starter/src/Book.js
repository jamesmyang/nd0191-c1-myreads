import PropTypes from "prop-types"

const Book = ({ book, moveBook }) => {

  const handleChange = (event) => {
    moveBook(book, event.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage:
              `url(${book.imageLinks.thumbnail})`,
          }}
        >
        </div>
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={handleChange}>
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {
          book.authors !== undefined ?
            book.authors.map((author, index) => (
              <div key={index}>{author}</div>
            )) :
            <div></div>
        }
      </div>
    </div >
  );
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default Book;