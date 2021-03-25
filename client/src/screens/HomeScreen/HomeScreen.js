import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./home.css";
import Product from "../../components/Product/Product";
import CarouselSlide from "../../components/Carousel/CarouselSlide";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../../redux/actions/productActions";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";

const HomeScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductsAction());
  }, [dispatch]);

  return (
    <div className="container">
      <CarouselSlide />
      <h1>Latest Products</h1>
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
