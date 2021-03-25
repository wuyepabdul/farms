import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCartAction = (productId, qty) => async (
  dispatch,
  getState
) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
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
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("addToCartAction Error,", error.message);
  }
};

export const removeFromCartAction = (productId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.log("removeFromCartAction Error", error.message);
  }
};
