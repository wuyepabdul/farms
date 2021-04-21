import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import Paginate from "../components/Paginate";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import {
  createProductAction,
  deleteProductAction,
  listProductsAction,
} from "../../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../redux/constants/productConstants";
import Paginate from "../../components/Paginate/Paginate";
import Meta from "../../components/Meta/Meta";

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    console.log("userInfo", userInfo.isAdmin);

    if (!userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProductsAction("", pageNumber));
    }
  }, [
    history,
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProductAction(userId));
    }
  };

  const createProductHandler = () => {
    // dispatch createProduct action
    dispatch(createProductAction());
  };

  return (
    <div className="container">
      <Meta title={"All Products"} />
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3 " onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && showLoading()}
      {errorDelete && showErrorMessage(errorDelete)}
      {loadingCreate && showLoading()}
      {errorCreate && showErrorMessage(errorCreate)}
      {loading ? (
        showLoading()
      ) : error ? (
        showErrorMessage(error)
      ) : (
        <Fragment>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {" "}
                    <Link to={`/admin/product/${product._id}/edit`}>
                      {" "}
                      <Button variant="info" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>{" "}
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />
        </Fragment>
      )}
    </div>
  );
};

export default ProductListScreen;
