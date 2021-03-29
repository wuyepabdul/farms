import axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productConstants";

/* list all products action */
export const listProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("listProductsAction error");
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

/* list a single product details action */
export const listProductDetailsAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("ListProductDetailsAction error", error.message);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
