import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;

    const searchBooks = async () => {
      const finalResults = [await BooksAPI.getAll(), await BooksAPI.search(query.trim().toLowerCase())];

      if (finalResults) {
        if (mounted) {
          if (finalResults[1].error !== undefined || !Array.isArray(finalResults[1])) {
            setBooks([]);
          } else {
            let filtered = finalResults[1].filter((book) => book.imageLinks !== undefined);
            setBooks(attachShelf(filtered, finalResults[0]));
          }
        }
      }
    }

    if (query.trim() === "") {
      setBooks([]);
    } else {
      searchBooks();
    }

    return (() => {
      mounted = false;
    });
  }, [query]);

  const attachShelf = (books, myReads) => {
    return books.map((book) => {
      let shelf = "none";
      for (let myRead of myReads) {
        if (myRead.id === book.id) {
          shelf = myRead.shelf;
          break;
        }
      }
      return { ...book, shelf: shelf };
    });
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleMove = (book, shelf) => {
    book.shelf = shelf;

    const update = async () => {
      await BooksAPI.update(book, shelf);
    }

    update();
    setBooks([...books]);
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
          <BooksGrid books={books} handleMove={handleMove} />
        </div>
      </div>
    </div>
  );
}

export default SearchBooks;