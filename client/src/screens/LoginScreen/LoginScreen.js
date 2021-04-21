import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../helpers/loading";
import FormContainer from "../../components/FormContainer/FormContainer";
import { loginAction } from "../../redux/actions/userActions";
import { isEmpty, isEmail } from "validator";
import { showErrorMessage } from "../../helpers/message";
import Meta from "../../components/Meta/Meta";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect =
    location.search && location.search.split("=")[1] !== "/"
      ? location.search.split("=")[1]
      : "/";

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  //submit handler to register user
  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { email, password };

    // validate form data

    if (isEmpty(email) || isEmpty(password)) {
      setMessage("All fields are required");
    } else if (!isEmail(email)) {
      setMessage("Please provide a valid email");
    } else {
      dispatch(loginAction(userData));
    }
  };
  return (
    <FormContainer>
      <Meta title={"Login Page"} />
      <h1>Sign In</h1>

      {error && showErrorMessage(error)}
      {message && showErrorMessage(message)}
      {loading && showLoading()}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Login
        </Button>
        <Row>
          <Col>
            {" "}
            Don't Have an Account?{" "}
            <Link
              to={
                redirect === "/"
                  ? `/register?redirect=/register`
                  : `/register?redirect=${redirect}`
              }
            >
              Register
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
