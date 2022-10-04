import { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

const ListBooks = ({ books, setBooks, moveBook }) => {

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, [setBooks]);

  return (
    <div className="app">
      <div className="list-books">
        {/** book title */}
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        {/** book content */}
        <div className="list-books-content">
          <div>
            <BookShelf
              title={"Currently Reading"}
              books={books.filter(book => book.shelf === "currentlyReading")}
              moveBook={moveBook} />
            <BookShelf
              title={"Want to Read"}
              books={books.filter(book => book.shelf === "wantToRead")}
              moveBook={moveBook} />
            <BookShelf
              title={"Read"}
              books={books.filter(book => book.shelf === "read")}
              moveBook={moveBook} />
          </div>
        </div>

        {/** book search */}
        <div className="open-search">
          <Link to="/search" >
            Add a book
          </Link>
        </div>
      </div>
    </div>
  );
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  setBooks: PropTypes.func.isRequired,
  moveBook: PropTypes.func.isRequired,
};

export default ListBooks;