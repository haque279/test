const crudReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLUMNS":
      return { ...state, columns: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default crudReducer;
