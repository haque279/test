import React, { useEffect, createContext, useReducer, useState } from "react";
import _ from "lodash";
import challanReducer from "../reducers/challanReducer";

export const ChallanContext = createContext();

const ChallanContextProvider = (props) => {
  const [refresh, setrefresh] = useState(false);
  const [arrayList, setArrayList] = useState([]);
  const [challan, dispatch] = useReducer(challanReducer, {}, () => {
    const localData = localStorage.getItem("challan");
    return localData
      ? JSON.parse(localData)
      : { products: [], cart: [], party: {}, date: "" };
  });

  const add = async (data) => {
    let id = data.id;

    await arrayList.push(...challan.cart);
    console.log("array list", arrayList);

    console.log("my data", data);
    console.log("my cart", challan.cart);

    if (data && data.id && id) {
      let test = challan.cart.filter((e) => e.id === id);
      console.log("test", challan.cart);
      setrefresh(!refresh);

      let check = arrayList.filter((e) => e.id === id);

      if (check.length === 0) {
        data.discountType = 1;
        data.quantity = 1;

        let taka = data.uN_Rat * data.quantity;
        if (data.discountType === 1) {
          let pDiscount = (data.dIS / 100) * taka;
          data.total = taka - pDiscount;
          data.lineTotal = taka;
          data.lineDiscount = pDiscount;
          console.log("total", data.total);
        } else {
          let takadiscount = taka - data.dIS * data.quantity;
          data.total = takadiscount;
          data.lineDiscount = data.dIS * data.quantity;
        }

        dispatch({
          type: "ADD",
          payload: data,
        });

        arrayList.push(data);
        // setArrayList((oldArray) => [...oldArray, data]);
        // console.log("arraylist", arrayList);
      } else {
        console.log("duplicate found");
      }
      // setrefresh(!refresh);
    } else {
      console.log("error");
    }
  };

  const update = (id, quantity, discount, discountType) => {
    console.log("all", id, quantity, discount);
    const filtered = challan.cart.map((e) => {
      if (e.id === id) {
        e.quantity = parseInt(quantity);
        e.dIS = parseInt(discount);
        e.discountType = parseInt(discountType);

        let grossAmt = e.uN_Rat * e.quantity;
        if (e.discountType === 1) {
          let disAmt = e.dIS * grossAmt * 0.01;
          e.total = grossAmt - disAmt;
          e.lineTotal = grossAmt;
          e.lineDiscount = disAmt;
          console.log("LineAmount", e.total);
        } else {
          let takadiscount = grossAmt - e.dIS * e.quantity;
          e.total = takadiscount;
          e.lineDiscount = e.dIS * e.quantity;
        }
      }
      return e;
    });

    console.log("my row", filtered);
    dispatch({
      type: "UPDATE",
      payload: filtered,
    });
  };

  const cancel = () => {
    setArrayList((oldArray) => [null]);
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
    let newData = challan.cart.filter((e) => e.id !== id);
    dispatch({
      type: "REMOVE",
      payload: newData,
    });

    setrefresh(!refresh);
  };

  const removeProduct = (id) => {
    let newData = challan.products.filter((e) => e.id !== id);
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

  useEffect(() => {
    localStorage.setItem("challan", JSON.stringify(challan));
  }, [
    fetchProducts,
    add,
    remove,
    removeProduct,
    cancel,
    refresh,
    challan.cart,
  ]);
  return (
    <ChallanContext.Provider
      value={{
        challan,
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
    </ChallanContext.Provider>
  );
};

export default ChallanContextProvider;
