import React, { createContext, useReducer, useEffect } from "react";
import amountReducer from "../reducers/amountReducer";

export const AmountContext = createContext();
const AmountContextProvider = (props) => {
  const [amount, dispatch] = useReducer(amountReducer, {}, () => {
    const localData = localStorage.getItem("amount");
    return localData ? JSON.parse(localData) : {};
  });

  const totalAmount = (data) => {
    console.log("data", data);
    let intTotalAmount = parseInt(0);
    if (amount.totalAmount) {
      // let intTotalAmount = parseInt(amount.totalAmount);
    }
    let intData = parseInt(data);
    let newTotal = intTotalAmount + intData;

    console.log("test amount", newTotal);
    dispatch({
      type: "TOTAL_AMOUNT",
      payload: newTotal,
    });
  };

  const getChallanSubTotal = () => {
    
  }

  useEffect(() => {
    localStorage.setItem("amount", JSON.stringify(amount));
  }, [totalAmount]);

  return (
    <AmountContext.Provider value={{ amount, totalAmount }}>
      {props.children}
    </AmountContext.Provider>
  );
};

export default AmountContextProvider;
