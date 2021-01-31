const emSalaryReducer = (state, action) => {
  switch (action.type) {
    case "GET_ALL":
      return { ...state, salary: action.payload };
    case "GET_ADVANCE":
      return { ...state, advance: action.payload };
    case "GET_DEDUCTION":
      return { ...state, deduction: action.payload };
    default:
      return state;
  }
};

export default emSalaryReducer;
