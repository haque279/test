const amountReducer = (state, action) => {
  switch (action.type) {
    case 'TOTAL_AMOUNT' :
      return {...state, totalAmount: action.payload}
    default:
      return state;
  }
};

export default amountReducer;
