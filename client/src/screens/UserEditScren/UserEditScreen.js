import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../redux/constants/userConstants";
import {
  getUserDetailsAction,
  updateUserAction,
} from "../../redux/actions/userActions";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import FormContainer from "../../components/FormContainer/FormContainer";
import Meta from "../../components/Meta/Meta";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetailsAction(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  // update user details submit handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAction({ _id: userId, name, email, isAdmin }));
  };

  return (
    <div className="container">
      <Meta title={"Admin User Edit"} />
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1> Edit User</h1>
        {loadingUpdate && showLoading}
        {errorUpdate && showErrorMessage(errorUpdate)}
        {loading ? (
          showLoading()
        ) : error ? (
          showErrorMessage(error)
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="success">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEditScreen;
