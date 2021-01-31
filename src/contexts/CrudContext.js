import React, { createContext, useReducer, useEffect } from "react";
import crudReducer from "../reducers/crudReducer";

export const CrudContext = createContext();
const CrudContextProvider = (props) => {
  const [crud, dispatch] = useReducer(crudReducer, {}, () => {
    const localData = localStorage.getItem("crud");
    return localData ? JSON.parse(localData) : {};
  });

  const setCrudColumn = (column) => {
    console.log("crud columns:", column);

    dispatch({
      type: "SET_COLUMNS",
      payload:  column ,
    });
  };
  const setError = (error) => {
    dispatch({
      type: "SET_ERROR",
      payload: error,
    });
  };

  useEffect(() => {
    localStorage.setItem("crud", JSON.stringify(crud));
  }, [setCrudColumn]);
  return (
    <CrudContext.Provider value={{ crud, setCrudColumn, setError }}>
      {props.children}
    </CrudContext.Provider>
  );
};

export default CrudContextProvider;
