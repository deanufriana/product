import axios from "axios";
import ip from "../config";
export const ALL_SUPPLIERS = () => {
  return {
    type: "ALL_SUPPLIERS",
    payload: axios.get(`${ip}/suppliers`)
  };
};
