import React from "react";
import { PaystackButton } from "react-paystack";

function PaystackBtn() {
  const config = {
    reference: new Date().getTime(),
    email: "abdul@gmail.com",
    amount: 20000,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };
  // you can call this function anything
  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };

  return (
    <div>
      <PaystackButton {...componentProps} />
    </div>
  );
}

export default PaystackBtn;
