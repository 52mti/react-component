import React, { useState } from "react";
import styles from "./FilterableProductTable.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ProductTable from "../ProductTable/ProductTable";

const FilterableProductTable = () => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [filteredText, setFilteredText] = useState("");

  return (
    <div className={styles.container}>
      <SearchBar
        onInStockChange={() => setInStockOnly(!inStockOnly)}
        onFilterTextChange={(text) => setFilteredText(text)}
      />
      <ProductTable inStockOnly={inStockOnly} filteredText={filteredText} />
    </div>
  );
};

export default FilterableProductTable;
