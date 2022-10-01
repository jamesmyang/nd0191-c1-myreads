import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

const ListBooks = () => {
  const [reading, setReading] = useState([]);
  const [want, setWant] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getBooks = async () => {
      const books = await BooksAPI.getAll();      

      if (books) {
        if (mounted) {
          resort(books);
        }
      }
    };

    getBooks();

    return () => {
      mounted = false;
    };
  }, []);

  const handleMove = (book, shelf) => {
    book.shelf = shelf;

    const update = async () => {
      await BooksAPI.update(book, shelf);
    }

    update();
    resort(reading.concat(want).concat(read));
  };

  const resort = (books) => {
    setReading(books.filter(book => book.imageLinks.thumbnail !== undefined && book.shelf === "currentlyReading"));
    setWant(books.filter(book => book.imageLinks.thumbnail !== undefined && book.shelf === "wantToRead"));
    setRead(books.filter(book => book.imageLinks.thumbnail !== undefined && book.shelf === "read"));
  }

  return (
    <div className="list-books">
      {/** book title */}
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      {/** book content */}
      <div className="list-books-content">
        <div>
          <BookShelf title={"Currently Reading"} books={reading} handleMove={handleMove} />
          <BookShelf title={"Want to Read"} books={want} handleMove={handleMove} />
          <BookShelf title={"Read"} books={read} handleMove={handleMove} />
        </div>
      </div>

      {/** book search */}
      <div className="open-search">
        <Link to="/search" >
          Add a book
        </Link>
      </div>
    </div>
  );
}

export default ListBooks;