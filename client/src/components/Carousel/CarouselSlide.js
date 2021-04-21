import React, { useEffect } from "react";
import { Carousel, Col, Image, Nav, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import { listTopProductsAction } from "../../redux/actions/productActions";
import "./carouselSlide.css";

const CarouselSlide = () => {
  //get products from redux store
  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTopProductsAction());
  }, [dispatch]);

  return (
    <div>
      <h4>Top Products</h4>
      <Row>
        <Col sm={2}>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="first">Category</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Col sm={8}>
          {loading ? (
            showLoading()
          ) : error ? (
            showErrorMessage(error)
          ) : (
            <Carousel pause="hover" className=" bg-dark">
              {products.map((product) => (
                <Carousel.Item key={product._id}>
                  <Link to={`/product/${product._id}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fluid
                      className="carousel-image"
                    />
                    <Carousel.Caption className="carousel-caption">
                      <h2>
                        {" "}
                        {product.name} (${product.price} )
                      </h2>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>
        <Col sm={2}>Adverts</Col>
      </Row>
    </div>
  );
};

export default CarouselSlide;
