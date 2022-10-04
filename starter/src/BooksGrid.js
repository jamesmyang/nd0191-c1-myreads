import PropTypes from "prop-types"
import Book from "./Book";

const BooksGrid = ({ books, moveBook }) => {

  return (
    <ol className="books-grid">
      {
        books.length === 0 ? "Not found" :
          books.map((book, index) => (
            <li key={index}> <Book book={book} moveBook={moveBook} /> </li>
          ))
      }
    </ol>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default BooksGrid;

