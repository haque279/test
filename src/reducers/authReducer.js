const authReducer = (state, action) => {
  switch (action.type) {
    case "CHECK_PHONE":
      return {
        ...state,
        checkPhone: { check: action.payload.check, otp: action.payload.otp },
      };
    case "LOGIN":
      return { ...state, auth: action.payload };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
