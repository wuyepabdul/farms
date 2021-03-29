import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import {
  getOrderDetailsAction,
  payOrderAction,
} from "../../redux/actions/orderActions";
import { ORDER_PAY_RESET } from "../../redux/constants/orderConstants";

// import Meta from "../../components/Meta/Meta";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
    // dynamically add paypal script
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      // when script loads, set sdkReady
      script.onload = () => {
        setSdkReady(true);
      };
      // add script to body
      document.body.appendChild(script);
    };
    // show order when is paid or not paid
    if (!order || successPay) {
      // reset payment to prevent infinite loop
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetailsAction(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, orderId, order]);

  //submit payment using paypal
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrderAction(orderId, paymentResult));
  };

  return loading ? (
    showLoading()
  ) : error ? (
    showErrorMessage(error)
  ) : (
    <div className="container">
      {" "}
      {/* <Meta /> */}
      <h1>Order {order._id}</h1>{" "}
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {console.log("orderDetails", orderDetails)}
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
              {order.isDelivered ? (
                <div className="alert alert-success">
                  {" "}
                  Delivered At : {order.deliveredAt}{" "}
                </div>
              ) : (
                showErrorMessage("Not Delivered")
              )}
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
              {!order.isPaid && (
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
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block">
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

export default OrderScreen;
