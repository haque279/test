const journalReducer = (state, action) => {
  switch (action.type) {
    case "ALL_JOURNAL":
      return action.payload;
    case "ADD_JOURNAL":
      return { ...state, client: action.payload };

    default:
      return state;
  }
};

export default journalReducer;
