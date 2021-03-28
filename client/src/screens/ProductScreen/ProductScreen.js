import React, { useEffect, useState } from "react";
import { Row, Col, Form, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import { listProductDetailsAction } from "../../redux/actions/productActions";
import "./productScreen.css";

const ProductScreen = ({ history, match }) => {
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  /* runs first on page load */
  useEffect(() => {
    dispatch(listProductDetailsAction(match.params.id));
  }, [history, dispatch, match]);

  /* add to cart handler */
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  /* 

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReviewAction(match.params.productId, { rating, comment })
    );
  }; */
  return (
    <div className="container">
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
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
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
          )}
        </>
      }
    </div>
  );
};

export default ProductScreen;
