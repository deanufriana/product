import { combineReducers } from "redux";
import productReducers from "./productReducers";
import productsReducers from "./productsReducers";
import suppliersReducers from "./suppliersReducers";


const reducers = combineReducers({
  productsReducers,
  productReducers,
  suppliersReducers
});

export default reducers;
