import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";

const ListBooks = () => {
  const [myReads, setMyReads] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getBooks = async () => {
      const books = await BooksAPI.getAll();

      if (books) {
        if (mounted) {
          setMyReads(books);
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
    setMyReads([...myReads]);
  };

  return (
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
            books={myReads.filter(book => book.shelf === "currentlyReading")}
            handleMove={handleMove} />
          <BookShelf
            title={"Want to Read"}
            books={myReads.filter(book => book.shelf === "wantToRead")}
            handleMove={handleMove} />
          <BookShelf
            title={"Read"}
            books={myReads.filter(book => book.shelf === "read")}
            handleMove={handleMove} />
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