import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_OUT_FOR_DELIVERY_REQUEST,
  ORDER_OUT_FOR_DELIVERY_SUCCESS,
  ORDER_OUT_FOR_DELIVERY_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_VERIFY_TRANSACTION_REQUEST,
  ORDER_VERIFY_TRANSACTION_SUCCESS,
  ORDER_VERIFY_TRANSACTION_FAIL,
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

// update order to paid action
export const payOrderAction = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    // get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    //send request to server
    const { data } = await axios({
      method: "put",
      url: `/api/orders/${orderId}/pay`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

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

// verify transaction

export const verifyTransactionAction =
  (trans_ref) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_VERIFY_TRANSACTION_REQUEST });

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
      const { data } = await axios.get(
        `/api/orders/verifyPayment/${trans_ref}`,
        config
      );

      dispatch({ type: ORDER_VERIFY_TRANSACTION_SUCCESS, payload: data });
    } catch (error) {
      //handle error
      console.log("verify payment error", error.message);
      dispatch({
        type: ORDER_VERIFY_TRANSACTION_FAIL,
        payload:
          error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//update order to outForDelivery action
export const outForDeliveryAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_OUT_FOR_DELIVERY_REQUEST });

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

    //send request
    const { data } = await axios.put(
      `/api/admin/orders/${order._id}/outForDelivery`,
      {},
      config
    );

    dispatch({ type: ORDER_OUT_FOR_DELIVERY_SUCCESS, payload: data });
  } catch (error) {
    console.error("outForDeliveryAction error", error.message);
    dispatch({
      type: ORDER_OUT_FOR_DELIVERY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//update order to delivered action
export const deliveredAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    //get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    //set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request
    const { data } = await axios.put(
      `/api/admin/orders/${order._id}/delivered`,
      {},
      config
    );

    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// list all my orders action
export const listMyOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    //get loggedIn user info
    const {
      userLogin: { userInfo },
    } = getState();

    //config headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request to server
    const { data } = await axios.get("/api/orders/myorders", config);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    //handle error
    console.log("listMyOrdersAction error", error.message);
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// list all created orders action
export const listAllOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ALL_REQUEST });

    // get loggedIn User details
    const {
      userLogin: { userInfo },
    } = getState();

    //set headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    //send request
    const { data } = await axios.get("/api/admin/orders", config);
    dispatch({ type: ORDER_LIST_ALL_SUCCESS, payload: data });
  } catch (error) {
    console.log("listAllOrdersAction error", error.message);
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
