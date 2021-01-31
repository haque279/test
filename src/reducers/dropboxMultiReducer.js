const dropboxMultiReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_MULTI":
      return { ...state, checkMulti: action.payload };
    default:
      return state;
  }
};

export default dropboxMultiReducer;
