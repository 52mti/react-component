import React from "react";
import styles from "./Overlay.module.css";

const Overlay = ({ open, onClose }) => {
  if (!open) return null;
  return <div className={styles.overlay} onClick={onClose}></div>;
};

export default Overlay;
