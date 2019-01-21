const initialState = {
  isLoading: true,
  results: []
};

function suppliersReducers(state = initialState, action) {
  switch (action.type) {
    case "ALL_SUPPLIERS_PENDING":
      return {
        isLoading: true
      };

    case "ALL_SUPPLIERS_FULFILLED":
      return {
        isLoading: false,
        results: action.payload.data
      };

    case "ALL_SUPPLIERS_REJECTED":
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

export default suppliersReducers;
