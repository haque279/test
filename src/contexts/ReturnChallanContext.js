import React, { useEffect, createContext, useReducer, useState } from "react";
import _ from "lodash";
import challanReducer from "../reducers/challanReducer";
import returnChallanReducer from "../reducers/returnChallanReducer";

export const ReturnChallanContext = createContext();

const ReturnChallanContextProvider = (props) => {
  const [refresh, setrefresh] = useState(false);
  const [returnChallan, dispatch] = useReducer(returnChallanReducer, {}, () => {
    const localData = localStorage.getItem("returnChallan");
    return localData
      ? JSON.parse(localData)
      : { products: [], cart: [], party: {}, date: "" };
  });
  const add = (data) => {
    let id = data.id;
    console.log("remove id", id);
    console.log("returnChallan.products", returnChallan.products);
    data.discountType = 1;
    data.quantity = 1;
    data.discount = 0;
    dispatch({
      type: "ADD",
      payload: data,
    });
    let newArray = _.remove(returnChallan.products, (e) => e.id !== id);
    console.log("product. fillter", newArray);

    dispatch({
      type: "REMOVE_PRODUCT",
      payload: newArray,
    });
  };

  const cancel = () => {
    dispatch({
      type: "CANCEL",
      payload: [],
    });
  };

  const fetchProducts = (data) => {
    dispatch({
      type: "FETCH_PRODUCT",
      payload: data,
    });
  };

  const remove = (item) => {
    let id = item.id;
    let NewProduct = returnChallan.cart.filter((e) => e.id === id);
    let newData = returnChallan.cart.filter((e) => e.id !== id);
    dispatch({
      type: "REMOVE",
      payload: newData,
    });

    addProduct(NewProduct);
    setrefresh(!refresh);
  };

  const removeProduct = (id) => {
    let newData = returnChallan.products.filter((e) => e.id !== id);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: newData,
    });
  };

  const addProduct = (item) => {
    console.log("items one", item);
    dispatch({
      type: "ADD_PRODUCT",
      payload: item[0],
    });
  };

  const getInvoiceNo = (data) => {
    console.log("invoice no", data);
    dispatch({
      type: "INVOICE",
      payload: data,
    });
    setrefresh(!refresh);
  };
  const getDate = (data) => {
    dispatch({
      type: "GET_DATE",
      payload: data,
    });
    setrefresh(!refresh);
  };
  const getStoredParty = (data) => {
    console.log("party", data);
    dispatch({
      type: "GET_PARTY",
      payload: data,
    });
    setrefresh(!refresh);
  };

  const update = (id, quantity, discount, discountType) => {
    console.log("all", id, quantity, discount);
    const filtered = returnChallan.cart.map((e) => {
      if (e.id === id) {
        e.quantity = parseInt(quantity);
        e.discount = parseInt(discount);
        e.discountType = parseInt(discountType);
      }
      return e;
    });

    console.log("my row", filtered);
    dispatch({
      type: "UPDATE",
      payload: filtered,
    });
  };

  useEffect(() => {
    localStorage.setItem("returnChallan", JSON.stringify(returnChallan));
  }, [fetchProducts, refresh, add, remove, removeProduct, cancel]);
  return (
    <ReturnChallanContext.Provider
      value={{
        returnChallan,
        add,
        cancel,
        fetchProducts,
        remove,
        removeProduct,
        update,
        getInvoiceNo,
        getDate,
        getStoredParty,
      }}
    >
      {props.children}
    </ReturnChallanContext.Provider>
  );
};

export default ReturnChallanContextProvider;
