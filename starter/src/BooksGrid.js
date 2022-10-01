import PropTypes from "prop-types"
import Book from "./Book";

const BooksGrid = ({ books, handleMove }) => {

  return (
    <ol className="books-grid">
      {
        books.length === 0 ? "Not found" :
          books.map((book, index) => (
            <li key={index}> <Book book={book} handleMove={handleMove} /> </li>
          ))
      }
    </ol>
  );
};

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  handleMove: PropTypes.func.isRequired,
};

export default BooksGrid;

