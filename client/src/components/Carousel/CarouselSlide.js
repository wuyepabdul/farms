import React from "react";
import { Carousel, Col, Image, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import products from "../../products";
import "./carouselSlide.css";

const CarouselSlide = () => {
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

        <Col sm={7}>
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
        </Col>
        <Col sm={2}>Adverts</Col>
      </Row>
    </div>
  );
};

export default CarouselSlide;
