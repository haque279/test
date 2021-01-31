import React, { createContext, useReducer, useEffect } from "react";
import fieldReducer from "../reducers/fieldReducer";

export const FieldContext = createContext();
const FieldContextProvider = (props) => {
  const [fields, dispatch] = useReducer(fieldReducer, {});
  const setFields = (fieldKey, fieldValue) => {
    const test = {fieldKey: fieldValue}
    dispatch({
      type: "ADD_FIELD",
      payload: test,
    });
    console.log({fieldKey: fieldValue})
    // console.log(fieldKey, fieldValue);
  };
  const sendFields = () => {
    console.log("fields", fields);
  };
  useEffect(() => {
    console.log("effect fields", fields);
  }, [setFields]);
  return (
    <FieldContext.Provider value={{ fields, setFields, sendFields }}>
      {props.children}
    </FieldContext.Provider>
  );
};

export default FieldContextProvider;
