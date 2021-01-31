import React, { createContext, useReducer, useEffect } from "react";
import dropboxMultiReducer from "../reducers/dropboxMultiReducer";

export const DropboxMultiContext = createContext();
const DropboxMultiContextProvider = (props) => {
  const [dropMulti, dispatch] = useReducer(dropboxMultiReducer, {}, () => {
    const localData = localStorage.getItem("dropMulti");
    return localData ? JSON.parse(localData) : {};
  });
  const checkMulti = (data) => {
    console.log("context", data);
    dispatch({
      type: "CHECK_MULTI",
      payload: data,
    });
  };
  useEffect(() => {
    localStorage.setItem("dropMulti", JSON.stringify(dropMulti));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkMulti]);
  return (
    <DropboxMultiContext.Provider value={{ dropMulti, checkMulti }}>
      {props.children}
    </DropboxMultiContext.Provider>
  );
};

export default DropboxMultiContextProvider;
