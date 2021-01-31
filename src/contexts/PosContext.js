import React, { useEffect, createContext, useReducer, useState } from "react";
import posReducer from "../reducers/posReducer";
import _ from "lodash";

export const PosContest = createContext();

const PosContestProvider = (props) => {
  const [refresh, setrefresh] = useState(false);
  const [pos, dispatch] = useReducer(posReducer, {}, () => {
    const localData = localStorage.getItem("pos");
    return localData ? JSON.parse(localData) : { products: [], cart: [] };
  });
  const add = (data) => {
    let id = data.id;
    data.discountType = 1;
    data.quantity = 1;
    data.discount = 0;
    dispatch({
      type: "ADD",
      payload: data,
    });
    removeProduct(id);
    // setrefresh(!refresh);
  };

  const cancel = () => {
    console.log("cancel");
    dispatch({
      type: "CANCEL",
      payload: [],
    });
    setrefresh(!refresh);
  };

  const fetchProducts = (data) => {
    dispatch({
      type: "FETCH_PRODUCT",
      payload: data,
    });
  };

  const remove = (item) => {
    let id = item.id;
    let NewProduct = pos.cart.filter((e) => e.id === id);
    let newData = pos.cart.filter((e) => e.id !== id);
    dispatch({
      type: "REMOVE",
      payload: newData,
    });

    addProduct(NewProduct);
    setrefresh(!refresh);
  };

  const removeProduct = (id) => {
    // let newArray = pos.products.filter((e) => e.id !== id);
    console.log(typeof id);
    let newArray = _.remove(pos.products, (e) => e.id !== id);
    console.log("product. fillter", newArray);
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: newArray,
    });
  };

  const addProduct = (item) => {
    console.log("items one", item);
    dispatch({
      type: "ADD_PRODUCT",
      payload: item[0],
    });
  };

  const update = (id, quantity, discount, discountType) => {
    console.log("all", id, quantity, discount);
    const filtered = pos.cart.map((e) => {
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
    localStorage.setItem("pos", JSON.stringify(pos));
  }, [fetchProducts, refresh, add, remove, removeProduct]);
  return (
    <PosContest.Provider
      value={{ pos, add, cancel, fetchProducts, remove, removeProduct, update }}
    >
      {props.children}
    </PosContest.Provider>
  );
};

export default PosContestProvider;
