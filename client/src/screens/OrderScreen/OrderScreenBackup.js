import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { showLoading } from "../../helpers/loading";
import {
  showErrorMessage,
  showNoDataError,
  showPendingMessage,
  showSuccessMessage,
} from "../../helpers/message";
import {
  deliveredAction,
  getOrderDetailsAction,
  outForDeliveryAction,
  payOrderAction,
} from "../../redux/actions/orderActions";
import {
  ORDER_DELIVERED_RESET,
  ORDER_OUT_FOR_DELIVERY_RESET,
  ORDER_PAY_RESET,
} from "../../redux/constants/orderConstants";

import Meta from "../../components/Meta/Meta";

const OrderScreenBackup = ({ match, history }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  // get order details from store
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //get order delivered details from store
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderOutForDelivery = useSelector((state) => state.orderOutForDelivery);
  const {
    loading: loadingOutForDelivery,
    success: successOutForDelivery,
  } = orderOutForDelivery;

  // get loggedIn usr info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //get order payment info from store
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // make sure order is loaded
  if (!loading) {
    // calculating price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (userInfo === undefined) {
      history.push("/login");
    }
    const addPayPalScript = async () => {
      const {
        data: { clientId },
      } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script); // adds scripts as the last child in the body of our html
    };
    if (
      !order ||
      successPay ||
      successOutForDelivery ||
      (order && order._id !== orderId)
    ) {
      //prevents infinite ORDER_DETAILS_REQUEST and ORDER_DETAILS_SUCCESS loop in redux
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVERED_RESET });
      dispatch({ type: ORDER_OUT_FOR_DELIVERY_RESET });

      //order && order._id !== orderId means order exist but
      //order.id does not equal to orderID(url id)

      //this means if order is not loaded, load the order by dispatching
      // getOrderDetails action or if payment is successful dispatch getDetailsOrder

      dispatch(getOrderDetailsAction(orderId));
    } else {
      //we have order at this point
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          //we have an unpaid order and paypal is already loaded
          setSdkReady(true);
        }
      }
    }
  }, [
    orderId,
    order,
    sdkReady,
    dispatch,
    successPay,
    sdkReady,
    successOutForDelivery,
    userInfo,
  ]);

  //submit payment using paypal
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrderAction(orderId, paymentResult));
  };

  //updated delivered handler
  const deliverHandler = () => {
    dispatch(deliveredAction(order));
  };

  //updated out fo delivery handler
  const outForDeliveryHandler = () => {
    dispatch(outForDeliveryAction(order));
  };

  return loading ? (
    showLoading()
  ) : error ? (
    showErrorMessage(error)
  ) : (
    <div className="container">
      <Meta title={"Order Details"} />
      <h1>Order {order._id}</h1>{" "}
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>

              {order.outForDelivery && !order.isDelivered
                ? showPendingMessage(
                    `Out For Delivery at : ${order.outForDeliveryAt}`
                  )
                : order.isDelivered
                ? showSuccessMessage(`Delivered At : ${order.deliveredAt}`)
                : showErrorMessage("Not Delivered")}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              <div>
                {" "}
                {order.isPaid ? (
                  <div className="alert alert-success">
                    {" "}
                    Paid At : {order.paidAt}{" "}
                  </div>
                ) : (
                  showErrorMessage("Not Paid")
                )}
              </div>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <div className="alert alert-info">Order is empty</div>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && userInfo._id === order.user._id && (
                <ListGroup.Item>
                  {loadingPay && showLoading()}
                  {!sdkReady ? (
                    showLoading()
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingOutForDelivery && showLoading()}

              {userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered &&
                !order.outForDelivery && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={outForDeliveryHandler}
                    >
                      Mark as Out for Delivery
                    </Button>
                  </ListGroup.Item>
                )}
              {loadingDeliver && showLoading()}
              {userInfo.isAdmin &&
                order.isPaid &&
                order.outForDelivery &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverHandler}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreenBackup;
