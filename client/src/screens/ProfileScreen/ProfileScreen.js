import React, { useEffect, useState } from "react";
import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage, showSuccessMessage } from "../../helpers/message";
import {
  getUserDetailsAction,
  updateUserProfileAction,
} from "../../redux/actions/userActions";
import { isEmail, isEmpty } from "validator";
import { listMyOrdersAction } from "../../redux/actions/orderActions";
import Meta from "../../components/Meta/Meta";

const ProfileScreen = ({ history }) => {
  const [userProfileData, setUserProfileData] = useState({
    name: "",
    email: "",
    message: "",
    errorMessage: "",
    successMessage: "",
  });

  const {
    name,
    email,
    errorMessage,
    message,
    successMessage,
  } = userProfileData;
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (user.name === undefined || !user.name) {
        dispatch(getUserDetailsAction(userInfo._id));
        dispatch(listMyOrdersAction());
      } else {
        setUserProfileData({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleChange = (e) => {
    setUserProfileData({
      ...userProfileData,
      [e.target.name]: e.target.value,
      errorMessage: "",
      successMessage: false,
      message: "",
    });
  };

  // update profile submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update action
    const userData = { id: user._id, name, email };
    if (isEmpty(name) || isEmpty(email)) {
      setUserProfileData({
        ...userProfileData,
        errorMessage: "Fields cannot be empty",
      });
    } else if (!isEmail(email)) {
      setUserProfileData({
        ...userProfileData,
        errorMessage: "Pleae enter a valid email",
      });
    } else if (success) {
      setUserProfileData({
        ...userProfileData,
        successMessage: "Profile successfully updated",
      });
    } else if (error) {
      setUserProfileData({
        ...userProfileData,
        message: error,
      });
    } else {
      dispatch(updateUserProfileAction(userData));
    }
  };

  return (
    <div className="container">
      <Meta title={`Profile ${user.name}`} />
      <Row>
        <Col md={3}>
          <h2> User Profile</h2>
          {errorMessage && showErrorMessage(errorMessage)}
          {message && showErrorMessage(message)}
          {successMessage && showSuccessMessage("Profile Successfully Updated")}
          {loading && showLoading()}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                onChange={handleChange}
                value={name}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                onChange={handleChange}
                value={email}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="outline-success ">
              Update
            </Button>
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? (
            showLoading()
          ) : errorOrders ? (
            showErrorMessage(errorOrders)
          ) : (
            <Table striped hover bordered responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>OUT FOR DELIVERY</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {console.log("order", order)}
                      {order.outForDelivery ? (
                        order.outForDeliveryAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <Button className="btn-sm" variant="outline-success">
                          Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;
