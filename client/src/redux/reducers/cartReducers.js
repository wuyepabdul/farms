import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

// cart reducer
export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      // check if item is already in cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // return new item if cart item is same with new item
        // else
        // return cart item
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // return new item if item is not in cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    default:
      return state;
  }
};
