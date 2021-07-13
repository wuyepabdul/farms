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
  ORDER_LIST_MY_RESET,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_OUT_FOR_DELIVERY_SUCCESS,
  ORDER_OUT_FOR_DELIVERY_RESET,
  ORDER_OUT_FOR_DELIVERY_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_RESET,
  ORDER_OUT_FOR_DELIVERY_REQUEST,
  ORDER_VERIFY_TRANSACTION_SUCCESS,
  ORDER_VERIFY_TRANSACTION_FAIL,
  ORDER_VERIFY_TRANSACTION_REQUEST,
} from "../constants/orderConstants";

// create an order reducer
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// get order details reducer
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// pay for an order reducer
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// update order to out for delivery reducer
export const orderOutForDeliveryReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_OUT_FOR_DELIVERY_REQUEST:
      return { loading: true };
    case ORDER_OUT_FOR_DELIVERY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_OUT_FOR_DELIVERY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_OUT_FOR_DELIVERY_RESET:
      return {};
    default:
      return state;
  }
};

// update order to delivered reducer
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

//  list all my orders reducer
export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

// list all created orders reducer
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ALL_REQUEST:
      return { ...state, loading: true };
    case ORDER_LIST_ALL_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// verify transaction
export const verifyOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_VERIFY_TRANSACTION_REQUEST:
      return { loading: true };
    case ORDER_VERIFY_TRANSACTION_SUCCESS:
      return { loading: false, verifyData: action.payload };
    case ORDER_VERIFY_TRANSACTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
