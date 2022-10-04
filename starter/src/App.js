import { useState } from "react";
import { Route, Routes } from "react-router-dom"
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";

function App() {

  const [books, setBooks] = useState([]);

  const moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf);

    book.shelf = shelf;
    if (includes(books, book)) {
      setBooks([...books]);
    } else {
      setBooks([...books, book]);
    }
  };

  const includes = (books, book) => {
    let include = false;
    for (let bk of books) {
      if (bk.id === book.id) {
        include = true;
        break;
      }
    }

    return include;
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <ListBooks books={books} setBooks={setBooks} moveBook={moveBook} />
        }
      />
      <Route
        path="/search"
        element={
          <SearchBooks booksOnShelf={books} moveBook={moveBook} />
        }
      />
    </Routes>
  );
}

export default App;