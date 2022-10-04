import { useState } from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";

const SearchBooks = ({ booksOnShelf, moveBook }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = (query) => {
    setQuery(query);

    if (query === undefined || query.trim().length === 0) {
      setBooks([]);
    } else {
      BooksAPI.search(query.trim().toLowerCase()).then((foundBooks) => {
        if (foundBooks.error !== undefined || !Array.isArray(foundBooks)) {
          setBooks([]);
        } else {
          let filtered = foundBooks.filter((book) => book.imageLinks !== undefined);
          setBooks(attachShelf(filtered, booksOnShelf));
        }
      });
    }
  };

  const attachShelf = (books, booksOnShelf) => {
    return books.map((book) => {
      let shelf = "none";
      for (let bookOnShelf of booksOnShelf) {
        if (bookOnShelf.id === book.id) {
          shelf = bookOnShelf.shelf;
          break;
        }
      }
      return { ...book, shelf: shelf };
    });
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid books={books} moveBook={moveBook} />
        </div>
      </div>
    </div>
  );
}

export default SearchBooks;