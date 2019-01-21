import axios from "axios";
import ip from "../config";
export const ALL_PRODUCTS = () => {
  return {
    type: "ALL_PRODUCTS",
    payload: axios.get(`${ip}/products`)
  };
};

export const GET_PRODUCT = id => {
  return {
    type: "GET_PRODUCT",
    payload: axios.get(`${ip}/product/${id}`)
  };
};
