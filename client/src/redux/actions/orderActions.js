import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";

// create an order action
export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    // get logged in user info
    const {
      userLogin: { userInfo },
    } = getState();

    // to send content type and set headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // send request to server
    const { data } = await axios.post("/api/orders", order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    //handle error
    console.log("createOrderAction error", error.message);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get order getails action
export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    // configure headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    //handle error
    console.log("getOrderDetailsAction error", error.message);
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get order getails action
export const payOrderAction = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    // configure headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    //handle error
    console.log("payOrderAction", error.message);
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
