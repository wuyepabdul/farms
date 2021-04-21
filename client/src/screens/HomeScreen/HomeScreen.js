import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./home.css";
import Product from "../../components/Product/Product";
import Meta from "../../components/Meta/Meta";
import CarouselSlide from "../../components/Carousel/CarouselSlide";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../../redux/actions/productActions";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import Paginate from "../../components/Paginate/Paginate";

const HomeScreen = ({ match }) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className="container">
      <Meta />
      {!keyword && <CarouselSlide />}
      <h1>Latest Products</h1>
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </div>
  );
};

export default HomeScreen;
