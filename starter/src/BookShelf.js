import BooksGrid from "./BooksGrid";

const BookShelf = ({ title, books, handleMove }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={books} handleMove={handleMove} />
      </div>
    </div>
  );
}

export default BookShelf;