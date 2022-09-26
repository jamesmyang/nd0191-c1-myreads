import "./App.css";
import { useState } from "react";
import SearchBooks from "./SearchBooks";
import ListBooks from "./ListBooks";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const handleShowSearchpage = () => {
    setShowSearchpage(!showSearchPage);
  }

  return (
    <div className="app">
      {
        showSearchPage ? (
          <SearchBooks handleShowSearchpage={handleShowSearchpage} />
        ) : (
          <ListBooks handleShowSearchpage={handleShowSearchpage} />
        )
      }
    </div >
  );
}

export default App;