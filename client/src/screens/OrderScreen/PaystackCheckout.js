import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PaystackButton } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showLoading } from "../../helpers/loading";
import {
  showErrorMessage,
  showPendingMessage,
  showSuccessMessage,
} from "../../helpers/message";
import {
  deliveredAction,
  getOrderDetailsAction,
  outForDeliveryAction,
  payOrderAction,
} from "../../redux/actions/orderActions";
import Meta from "../../components/Meta/Meta";

const PaystackCheckout = ({ match, history }) => {
  const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
  const orderId = match.params.id;
  const dispatch = useDispatch();

  // set paystack user data component states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);

  // get order details from store
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  //get order delivered details from store
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const orderOutForDelivery = useSelector((state) => state.orderOutForDelivery);
  const { loading: loadingOutForDelivery, success: successOutForDelivery } =
    orderOutForDelivery;

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

    if (!order || (order && order._id !== orderId)) {
      dispatch(getOrderDetailsAction(orderId));
    } else {
      //we have order at this point
      //check if order is not paid
      if (!order.isPaid) {
        setName(order.user.name);
        setEmail(order.user.email);
        setAmount(order.totalPrice);
      }
    }
  }, [orderId, order, dispatch, successPay, successOutForDelivery, userInfo]);

  //submit payment using paypal
  const successPaymentHandler = (e) => {
    e.preventDefault();
    dispatch(payOrderAction(orderId));
  };

  //update delivered handler
  const deliverHandler = () => {
    dispatch(deliveredAction(order));
  };

  //update out for delivery handler
  const outForDeliveryHandler = () => {
    dispatch(outForDeliveryAction(order));
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () =>
      alert("Thanks for doing business with us! Come back soon!!"),
    onClose: () => alert("Wait! Don't leave :("),
  };

  return loading ? (
    showLoading()
  ) : error ? (
    showErrorMessage(error)
  ) : (
    <div className="container">
      {console.log("amount", amount)}
      {console.log("name", name)}
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

                  <PaystackButton {...componentProps} />
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
export default PaystackCheckout;
