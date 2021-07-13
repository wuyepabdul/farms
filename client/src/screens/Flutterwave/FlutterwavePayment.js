import React, { useEffect, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetailsAction,
  payOrderAction,
} from "../../redux/actions/orderActions";
import { getAllTransactions, verifyTransaction } from "../../api/flutterwave";

const FlutterwavePayment = ({ totalAmount, name, email, phonenumber }) => {
  const dispatch = useDispatch();

  // get order details from store
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const config = {
    public_key: `${process.env.REACT_APP_FLUTTER_PUBLIC}`,
    tx_ref: Date.now(),
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      name,
      email,
      phonenumber: "07064586146",
    },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo:
        "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <h1>Hello Test user</h1>

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
              console.log(response);
              closePaymentModal(); // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default FlutterwavePayment;
