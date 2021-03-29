import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

//action to add item to cart
export const addToCartAction = (productId, qty) => async (
  dispatch,
  getState
) => {
  try {
    // send get request to server
    const { data } = await axios.get(`/api/products/${productId}`);

    //dispatch product item
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    //set local storage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("addToCartAction Error,", error.message);
  }
};

// action to remove an item from cart
export const removeFromCartAction = (productId) => async (
  dispatch,
  getState
) => {
  try {
    // remove item from cart
    dispatch({ type: REMOVE_FROM_CART, payload: productId });

    //update localStorage
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("removeFromCartAction Error", error.message);
  }
};

// action to save shipping information
export const saveShippingAddressAction = (formData) => (dispatch) => {
  try {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: formData });

    // set local storage
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
  } catch (error) {
    console.log("saveShippingAddress error", error.message);
  }
};

// action to save payment method
export const savePaymentMethodAction = (data) => (dispatch) => {
  try {
    dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });

    //set local storage
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {
    console.error("savePaymentMethod error", error.message);
  }
};
