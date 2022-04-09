import React from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ open, children }) => {
  if (!open) return null;
  return (
    <>
      <div className={styles.modal}>
        {children}
        <div className={styles.amount}>
          Total Amount <span className={styles.price}></span>
        </div>
        <Button>Close</Button>
        <Button>Order</Button>
      </div>
    </>
  );
};

export default Modal;
