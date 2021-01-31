import React, { createContext, useReducer, useEffect } from "react";
import cartReducer from "../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  const addToCart = (data) => {
    dispatch({
      type: "ADD",
      payload: data,
    });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [addToCart]);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
