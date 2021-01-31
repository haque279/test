import React, { createContext, useReducer, useEffect } from "react";
import emSalaryReducer from "../reducers/emSalaryReducer";
import axios from "axios";

export const EMSalaryContext = createContext();

const EMSalaryContextProvider = (props) => {
  const [emSalary, dispatch] = useReducer(emSalaryReducer, {}, () => {
    // const localData = localStorage.getItem("emSalary");
    // return localData ? JSON.parse(localData) : {};
  });

  const getEMSalary = (data) => {
    dispatch({
      type: "GET_ALL",
      payload: data,
    });
    console.log("con console", data);
  };

  const getAdvance = (data) => {
    dispatch({
      type: "GET_ADVANCE",
      payload: data,
    });
  };

  const getDeduction = (data) => {
    dispatch({
      type: "GET_DEDUCTION",
      payload: data,
    });
  };

  useEffect(() => {
    // localStorage.setItem("emSalary", JSON.stringify(emSalary));
  }, [getEMSalary]);
  return (
    <EMSalaryContext.Provider
      value={{ emSalary, getEMSalary, getAdvance, getDeduction }}
    >
      {props.children}
    </EMSalaryContext.Provider>
  );
};

export default EMSalaryContextProvider;
