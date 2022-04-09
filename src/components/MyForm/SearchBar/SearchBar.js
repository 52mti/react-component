import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onInStockChange, onFilterTextChange }) => {
  const handleInStockChange = (e) => onInStockChange(e.target.value);
  const handleFilterTextChange = (e) => onFilterTextChange(e.target.value);

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleFilterTextChange}
      ></input>
      <p>
        <input type="checkbox" onClick={handleInStockChange}></input>
        Only show products in stock
      </p>
    </form>
  );
};

export default SearchBar;
