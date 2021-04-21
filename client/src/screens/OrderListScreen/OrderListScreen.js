import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listAllOrdersAction } from "../../redux/actions/orderActions";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import Meta from "../../components/Meta/Meta";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrdersAction());
    } else {
      history.push("/login");
    }
  }, [history, dispatch, userInfo]);

  return (
    <div className="container">
      <Meta title={"All Orders"} />
      <h1>Products</h1>
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {" "}
                  <Link to={`/order/${order._id}`}>
                    {" "}
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListScreen;
