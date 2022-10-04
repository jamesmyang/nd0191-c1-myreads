import PropTypes from "prop-types";
import BooksGrid from "./BooksGrid";

const BookShelf = ({ title, books, moveBook }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} moveBook={moveBook} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default BookShelf;