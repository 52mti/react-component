import React, { useEffect } from "react";
import styles from "./ProductTable.module.css";
import ProductCategoryRow from "../ProductCategoryRow/ProductCategoryRow";
import ProductRow from "../ProductRow/ProductRow";

const products = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  {
    // prettier-ignore
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
  },
];

const ProductTable = ({ inStockOnly, filteredText }) => {
  // let products = [];
  // useEffect(async () => {
  //   const res = await fetch("http://127.0.0.1:8000");
  //   const data = res.json();
  //   products = data;
  // }, []);

  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.indexOf(filteredText) === -1) return;
    if (inStockOnly && !product.stocked) return;

    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategoryRow
          key={product.category}
          category={product.category}
        />
      );
    }
    rows.push(<ProductRow key={product.name} product={product} />);
  });

  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default ProductTable;
