const initialState = {
  isLoading: true,
  results: [],
  data: {}
};

function productReducers(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return {
        isLoading: true
      };

    case "GET_PRODUCT_FULFILLED":
      return {
        isLoading: false,
        data: action.payload.data
      };

    case "GET_PRODUCT_REJECTED":
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

export default productReducers;
