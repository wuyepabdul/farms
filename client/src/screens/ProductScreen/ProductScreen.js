import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage, showPendingMessage } from "../../helpers/message";
import {
  listProductDetailsAction,
  createProductReviewAction,
} from "../../redux/actions/productActions";
import "./productScreen.css";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../redux/constants/productConstants";
import Meta from "../../components/Meta/Meta";

const ProductScreen = ({ history, match }) => {
  //component states
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // product details from redux state
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  //userInfo from redux state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //prouct create review from redux
  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview;

  const dispatch = useDispatch();

  /* runs first on page load */
  useEffect(() => {
    if (successReview) {
      alert("Review created");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetailsAction(match.params.id));
  }, [history, dispatch, errorReview, successReview, match]);

  /* add to cart handler */
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  // create review handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReviewAction(match.params.id, { rating, comment }));
  };

  return (
    <div className="container">
      <Meta title={product.name} />
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {
        <>
          {loading ? (
            showLoading()
          ) : error ? (
            showErrorMessage(error)
          ) : (
            <>
              <Row>
                <Col md={3}>
                  <Image
                    className="productImage"
                    src={product.image}
                    alt={product.name}
                    fluid
                  />{" "}
                  {/* the fluid attribute keeps the image within its conatiner */}
                </Col>
                <Col md={6}>
                  <ListGroup variant="flush">
                    {" "}
                    {/* variant='flush'  takes away the spacing (border) */}
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {product.rating !== undefined && (
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      )}
                    </ListGroup.Item>
                    <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                    <ListGroup.Item>
                      Description:{product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out Of Stock"}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item>
                          <Row>
                            <Col>Qty</Col>
                            <Col>
                              <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </Form.Control>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      )}

                      <ListGroup.Item>
                        <button
                          onClick={addToCartHandler}
                          className="btn btn-success"
                          type="button"
                          disabled={product.countInStock === 0}
                        >
                          Add to cart
                        </button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={8}>
                  <h2> Reviews </h2>
                  {product.reviews.length === 0 ? (
                    showPendingMessage("No Reviews")
                  ) : (
                    <ListGroup variant="flush">
                      {product.reviews.map((review) => (
                        <ListGroup.Item key={review._id}>
                          <strong> {review.name} </strong>
                          <Rating value={review.rating} />
                          <p>{review.createdAt} </p>
                          <p>{review.comment} </p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                  <h2>Write a review</h2>
                  {loadingReview && showLoading()}
                  {errorReview && showErrorMessage(errorReview)}
                  {userInfo ? (
                    <ListGroup.Item>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5- Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="success">
                          Submit
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  ) : (
                    <div className="alert alert-info">
                      {" "}
                      Please <Link to="/login">Sign In</Link> to write a review{" "}
                    </div>
                  )}
                </Col>
              </Row>
            </>
          )}
        </>
      }
    </div>
  );
};

export default ProductScreen;
