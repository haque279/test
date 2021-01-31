const fieldReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FIELD':
    return state, action.payload

    default:
      return state;
  }
};

export default fieldReducer;
