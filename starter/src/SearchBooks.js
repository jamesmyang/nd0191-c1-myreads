import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BooksGrid from "./BooksGrid";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  const handleMove = (book, shelf) => {
    book.shelf = shelf;

    const update = async () => {
      await BooksAPI.update(book, shelf);
    }

    update();
    setBooks([...books]);
  };

  useEffect(() => {
    let mounted = true;

    const searchBooks = async () => {
      console.log(query.trim().toLowerCase());
      const books = await BooksAPI.search(query.trim().toLowerCase());

      if (books) {
        console.log(books);
        if (mounted) {
          books.length > 0 ?
            setBooks(books.filter((book) => book.imageLinks !== undefined)) :
            setBooks([]);
        }
      }
    };

    if (query.trim() === "") {
      setBooks([]);
    } else {
      searchBooks();
    }

    return (() => {
      mounted = false;
    });
  }, [query]);

  const handleSearch = (query) => {
    setQuery(query);
  };

  return (
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
        <ol className="books-grid"></ol>
        <BooksGrid books={books} handleMove={handleMove} />
      </div>
    </div>
  );
}

export default SearchBooks;