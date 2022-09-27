import { useState } from "react";
import { Route, Routes } from "react-router-dom"
import "./App.css";
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";

function App() {

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ListBooks />
          }
        />
        <Route
          path="/search"
          element={
            <SearchBooks />
          }
        />
      </Routes>
    </div >
  );
}

export default App;