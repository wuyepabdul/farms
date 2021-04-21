import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { savePaymentMethodAction } from "../../redux/actions/cartActions";
import Meta from "../../components/Meta/Meta";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethodAction(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <div className="container">
      <Meta title={"Payment Method"} />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
          <h1>Payment Method</h1>{" "}
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>

            <Col>
              <Form.Check
                type="radio"
                label="Paypal or Credit/Debit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                disabled
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default PaymentScreen;
