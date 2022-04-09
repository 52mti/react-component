import React from "react";
import classes from "./Button.module.css";

const Button = ({ type, children, className, onClick }) => {
  return (
    <button
      type={type ? type : "button"}
      className={`${className ? classes[className] : ""} ${classes.btn}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;
