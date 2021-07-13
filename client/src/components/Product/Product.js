import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating.js";
import "./product.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: "2rem",
  },
  textColor: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "green",
      textDecoration: "none",
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<strong>{product.name}</strong>}
          subheader="September 14, 2016"
        />
        <Link className={classes.textColor} to={`/product/${product._id}`}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
        </Link>

        <CardContent>
          <Link className={classes.textColor} to={`/product/${product._id}`}>
            <Typography gutterBottom variant="h6" component="h2">
              {product.name}
            </Typography>
          </Link>

          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Product;
