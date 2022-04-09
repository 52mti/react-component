import React, { useReducer } from "react";
import classes from "./Calculator.module.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const current = Number.parseFloat(currentOperand);
  const prev = Number.parseFloat(previousOperand);
  if (isNaN(current) || isNaN(prev)) return "";

  switch (operation) {
    case "+":
      return (prev + current).toString(10);

    case "-":
      return (prev - current).toString(10);

    case "*":
      return (prev * current).toString(10);

    case "÷":
      return (prev / current).toString(10);
  }
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us");

const formatOperand = (operand) => {
  if (!operand) return;
  const [integer, decimal] = operand.split(".");
  if (!decimal) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      // 不能全是0
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      // 只能有一个'.'
      if (payload.digit === "." && state.currentOperand?.includes("."))
        return state;
      // 整数不能0开头
      if (state.currentOperand === "0" && payload.digit !== ".")
        return {
          ...state,
          currentOperand: payload.digit,
        };
      // 清空上次计算的结果
      if (state.overwrite)
        return {
          ...state,
          previousOperand: null,
          currentOperand: payload.digit,
          overwrite: false,
        };

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      // 不能是连续操作符
      if (!state.currentOperand && !state.previousOperand) return state;
      // 不能操作符开头
      if (!state.previousOperand)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      // 更改操作符
      if (!state.currentOperand)
        return {
          ...state,
          operation: payload.operation,
        };
      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (!state.currentOperand) return state; //当前操作数不能为空
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      if (state.currentOperand.length === 1)
        return {
          ...state,
          currentOperand: null,
        };

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case ACTIONS.EVALUATE:
      if (!state.operation || !state.currentOperand) return state; //必须要有操作符和操作数

      return {
        ...state,
        currentOperand: evaluate(state),
        operation: null,
        previousOperand: null,
        overwrite: true,
      };
  }
}

const Calculator = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className={classes.grid}>
      <div className={classes.output}>
        <div className={classes.previous}>
          {formatOperand(previousOperand)}
          {operation}
        </div>
        <div className={classes.current}>{formatOperand(currentOperand)}</div>
      </div>

      <button
        className={classes["span-two"]}
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton dispatch={dispatch} operation="÷" />

      <DigitButton dispatch={dispatch} digit="1" />
      <DigitButton dispatch={dispatch} digit="2" />
      <DigitButton dispatch={dispatch} digit="3" />
      <OperationButton dispatch={dispatch} operation="*" />

      <DigitButton dispatch={dispatch} digit="4" />
      <DigitButton dispatch={dispatch} digit="5" />
      <DigitButton dispatch={dispatch} digit="6" />
      <OperationButton dispatch={dispatch} operation="+" />

      <DigitButton dispatch={dispatch} digit="7" />
      <DigitButton dispatch={dispatch} digit="8" />
      <DigitButton dispatch={dispatch} digit="9" />
      <OperationButton dispatch={dispatch} operation="-" />

      <DigitButton dispatch={dispatch} digit="." />
      <DigitButton dispatch={dispatch} digit="0" />
      <button
        className={classes["span-two"]}
        onClick={() => {
          dispatch({ type: ACTIONS.EVALUATE });
        }}
      >
        =
      </button>
    </div>
  );
};

export default Calculator;
