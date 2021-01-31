import React, { createContext, useReducer, useEffect } from "react";
import journalReducer from "../reducers/journalReducer";
import axios from "axios";

export const JournalContext = createContext();

const JournalContextProvider = (props) => {
  const [journal, dispatch] = useReducer(journalReducer, [], () => {
    const localData = localStorage.getItem("journal");
    return localData ? JSON.parse(localData) : [];
  });

  const addJournal = (data) => {
    console.log("journal context", data);
    dispatch({
      type: "ADD_JOURNAL",
      payload: data,
    });
  };

  const allJournal = (data) => {
    dispatch({
      type: "ALL_JOURNAL",
      payload: data,
    });
  };
  const testing = () => {
    console.log("none");
  };

  useEffect(() => {
    localStorage.setItem("journal", JSON.stringify(journal));
  }, [allJournal]);
  return (
    <JournalContext.Provider
      value={{ journal, addJournal, allJournal, testing }}
    >
      {props.children}
    </JournalContext.Provider>
  );
};

export default JournalContextProvider;
