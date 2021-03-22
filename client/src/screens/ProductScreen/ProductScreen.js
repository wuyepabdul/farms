import React, { useEffect, useState } from "react";
import { Row, Col, Form, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/Rating/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, []);

  /* const addToCartHandler = () => {
    history.push(`/cart/${match.params.productId}?qty=${qty}`);
  };

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
          <Row>
            <Col md={3}>
              <Image src={product.image} alt={product.name} fluid />{" "}
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
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
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
        </>
      }
    </div>
  );
};

export default ProductScreen;
