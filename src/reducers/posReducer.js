const posReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCT":
      return { ...state, products: action.payload };
    case "ADD":
      return { ...state, cart: [...state.cart, action.payload] };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "CANCEL":
      return { ...state, cart: action.payload };
    case "UPDATE":
      return { ...state, cart: action.payload };
    case "REMOVE":
      return { ...state, cart: action.payload };
    case "REMOVE_PRODUCT":
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export default posReducer;
