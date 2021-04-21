import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

// list all products action
export const listProductsAction = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
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

// list top products
export const listTopProductsAction = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    console.log("list top products action error", error.message);
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// list a single product details action
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

// create a product action
export const createProductAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    // set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.post(`/api/admin/products`, {}, config);
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("createProductAction error", error.message);
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//edit a product action

// create a product action
export const updateProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    // set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.put(
      `/api/admin/products/${product._id}`,
      product,
      config
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("updateProductAction error", error.message);
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete a product action
export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    //get loggedIn User info
    const {
      userLogin: { userInfo },
    } = getState();

    //set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.delete(`/api/admin/products/${id}`, config);
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    // handle error
    console.log("deleteProductAction error", error.message);
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create a review action
export const createProductReviewAction = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      config
    );
    dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
