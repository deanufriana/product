const initialState = {
  isLoading: true,
  results: [],
  data: {}
};

function productsReducers(state = initialState, action) {
  switch (action.type) {
    case "ALL_PRODUCTS_PENDING":
      return {
        isLoading: true
      };

    case "ALL_PRODUCTS_FULFILLED":
      return {
        isLoading: false,
        results: action.payload.data
      };

    case "ALL_PRODUCTS_REJECTED":
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

export default productsReducers;
