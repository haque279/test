import React, { createContext, useReducer, useEffect } from "react";
import gridReducer from "../reducers/gridReducer";

export const GridContext = createContext();

const initialData = { activePage: 1, pageSize: 10, data: [] };
const GridContextProvider = (props) => {
  const [grid, dispatch] = useReducer(gridReducer, initialData, () => {
    const localData = localStorage.getItem("grid");
    return localData ? JSON.parse(localData) : {};
  });
  const gridStore = (data) => {
    dispatch({
      type: "GRID_STORE",
      payload: data,
    });
  };
  const setTotalNo = (data) => {
    dispatch({
      type: "SET_TOTAL_NO",
      payload: data,
    });
  };

  const setActivePage = (data) => {
    console.log('set active page', data)
    dispatch({
      type: "SET_ACTIVE_PAGE",
      payload: data,
    });
  };

  const setPageSize = (data) => {
    dispatch({
      type: "SET_PAGE_SIZE",
      payload: data,
    });
  };

  const pageReload = (data) => {
    dispatch({
      type: "CHECK_UPDATE",
      payload: data,
    });
  };

  const resetState = () => {
    console.log('reset')
    dispatch({
      type: "RESET_STATE",
      payload: {
        pageSize: 10,
        activePage: 1,
      },
    });
  };

  const gridTableCode = (data) => {
    dispatch({
      type: "GRID_TABLE_CODE",
      payload: data,
    });
  };

  useEffect(() => {
    localStorage.setItem("grid", JSON.stringify(grid));
  }, [gridStore]);
  return (
    <GridContext.Provider
      value={{
        grid,
        gridStore,
        setTotalNo,
        setActivePage,
        setPageSize,
        pageReload,
        resetState,
        gridTableCode,
      }}
    >
      {props.children}
    </GridContext.Provider>
  );
};

export default GridContextProvider;
