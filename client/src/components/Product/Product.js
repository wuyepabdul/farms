import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating.js";
import "./product.css";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-2  card">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className="card-img " />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="product-link">
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
