const gridReducer = (state, action) => {
  switch (action.type) {
    case "GRID_STORE":
      return { ...state, data: action.payload };
    case "SET_TOTAL_NO":
      return { ...state, totalNo: action.payload };
    case "SET_ACTIVE_PAGE":
      return { ...state, activePage: action.payload };
    case "SET_PAGE_SIZE":
      return { ...state, pageSize: action.payload };
    case "CHECK_UPDATE":
      return { ...state, pageReload: action.payload };
    case "GRID_TABLE_CODE":
      return { ...state, gridTableCode: action.payload };
    case "RESET_STATE":
      return {
        ...state,
        pageSize: action.payload.pageSize,
        activePage: action.payload.activePage,
      };
    default:
      return state;
  }
};

export default gridReducer;
