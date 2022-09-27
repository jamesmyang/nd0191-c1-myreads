import Book from "./Book";

const BooksGrid = ({ books, handleMove }) => {

  return (
    <ol className="books-grid">
      {
        books.map((book, index) => {
          return <li key={index}> <Book book={book} handleMove={handleMove} /> </li>;
        })
      }
    </ol>
  );
};

export default BooksGrid;

