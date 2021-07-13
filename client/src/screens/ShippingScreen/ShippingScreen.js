import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "validator";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import FormContainer from "../../components/FormContainer/FormContainer";
import { showErrorMessage } from "../../helpers/message";
import { saveShippingAddressAction } from "../../redux/actions/cartActions";
import Meta from "../../components/Meta/Meta";

const ShippingScreen = ({ history }) => {
  // get shipping info from store
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [shippingDetails, setShippingDetails] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
    errorMessage: "",
  });

  const { address, city, postalCode, country, errorMessage } = shippingDetails;

  // get userInfo from store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo === null) {
      history.push("/login");
    }
  }, [history, userInfo]);
  // handle field change
  const handleChange = (e) => {
    setShippingDetails({
      ...shippingDetails,
      [e.target.name]: e.target.value,
      errorMessage: "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // validate form data
    if (
      isEmpty(address) ||
      isEmpty(city) ||
      isEmpty(postalCode) ||
      isEmpty(country)
    ) {
      setShippingDetails({
        ...shippingDetails,
        errorMessage: "All fields are required",
      });
    } else {
      const formData = { address, city, postalCode, country };
      dispatch(saveShippingAddressAction(formData));
      history.push("/payment");
    }
  };

  return (
    <div>
      <FormContainer className="container">
        <Meta title={"Shipping Details"} />
        <CheckoutSteps step1 step2 />
        <Form onSubmit={submitHandler}>
          <h1>Shipping</h1>
          {errorMessage && showErrorMessage(errorMessage)}
          <Form.Group controlId="address">
            <Form.Label>Address </Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter Address "
              value={address}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City </Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter City "
              value={city}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code </Form.Label>
            <Form.Control
              type="text"
              name="postalCode"
              placeholder="Enter Postal Code "
              value={postalCode}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country </Form.Label>
            <Form.Control
              type="text"
              name="country"
              placeholder="Enter Country "
              value={country}
              onChange={handleChange}
              required
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="success">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
