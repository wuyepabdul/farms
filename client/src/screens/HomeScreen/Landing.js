import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Product from "../../components/Product/Product";
import Meta from "../../components/Meta/Meta";
import CarouselSlide from "../../components/Carousel/CarouselSlide";
import { useDispatch, useSelector } from "react-redux";
import { listProductsAction } from "../../redux/actions/productActions";
import { showLoading } from "../../helpers/loading";
import { showErrorMessage } from "../../helpers/message";
import Paginate from "../../components/Paginate/Paginate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Landing = ({ match }) => {
  const classes = useStyles();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(listProductsAction(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div className={classes.root}>
      <Meta />
      {!keyword && <CarouselSlide />}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
