import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { isEmail, isEmpty, equals } from "validator";
import FormContainer from "../../components/FormContainer/FormContainer";
import { registerAction } from "../../redux/actions/userActions";
import { showLoading } from "../../helpers/loading";
import Meta from "../../components/Meta/Meta";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect =
    location.search && location.search.split("=")[1] !== "/"
      ? location.search.split("=")[1]
      : "/";

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    //check for loggedIn user
    if (userInfo) {
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    //validate form data
    if (isEmpty(name) || isEmpty(password) || isEmpty(email)) {
      setMessage("All fields are required");
    } else if (!isEmail(email)) {
      setMessage("Please provide a valid email");
    } else if (!equals(password, confirmPassword)) {
      setMessage("Passwords do not match");
    } else {
      // dispatch register action
      dispatch(registerAction(userData));
    }
  };

  return (
    <FormContainer className="container">
      <Meta title={"Create your Farms Online account"} />
      <h1> Sign Up</h1>
      {message && <div className="alert alert-danger">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && showLoading}
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
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          {" "}
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
