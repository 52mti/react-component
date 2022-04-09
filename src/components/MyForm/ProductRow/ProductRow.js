import React from "react";
import styles from "./ProductRow.module.css";

const ProductRow = ({ product }) => {
  return (
    <tr className={styles.row}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

export default ProductRow;
