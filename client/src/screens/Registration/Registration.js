import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { isEmail, isEmpty, equals } from "validator";
import { registerAction } from "../../redux/actions/userActions";
import { showLoading } from "../../helpers/loading";
import Meta from "../../components/Meta/Meta";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "green",
    "&.MuiButtonBase-root": {
      color: "green",
    },
  },
  span: {
    PrivateTabIndicator: {
      backgroundColor: "black",
    },
  },
  topSpacing: {
    marginTop: "1rem",
  },
}));

const Registration = ({ location, history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect =
    location.search && location.search.split("=")[1] !== "/"
      ? location.search.split("=")[1]
      : "/";

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    //check for loggedIn user
    if (userInfo) {
      history.push(redirect);
    }
  }, [redirect, history, userInfo]);

  //submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const userData = { name, email, password };

    //validate form data
    if (isEmpty(name) || isEmpty(password) || isEmpty(email)) {
      setMessage("All fields are required");
    } else if (!isEmail(email)) {
      setMessage("Please provide a valid email");
    } else if (!equals(password, confirmPassword)) {
      setMessage("Passwords do not match");
    } else {
      // dispatch register action
      dispatch(registerAction(userData));
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="User Signup" {...a11yProps(0)} />
            <Tab label="Farmer Signup" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            {/* user signup */}
            <form className={classes.root} noValidate autoComplete="off">
              {message && <div className="alert alert-danger">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {loading && showLoading}
              <TextField
                name="name"
                value={name}
                id="name"
                label="Name"
                fullWidth
              />
              <TextField
                name="email"
                value={email}
                id="email"
                label="Email"
                fullWidth
              />
              <TextField
                name="password"
                value={password}
                id="password"
                label="Password"
                fullWidth
              />
              <Button
                className={classes.topSpacing}
                variant="contained"
                color="primary"
                fullWidth
              >
                Primary
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* farmer signup */}
            <form>
              {message && <div className="alert alert-danger">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}
              {loading && showLoading}
              <TextField
                id="standard-basic"
                label="Password"
                fullWidth
                centered
              />
              <TextField
                id="standard-basic"
                label="Standard"
                fullWidth
                centered
              />
              <TextField
                id="standard-basic"
                label="Standard"
                fullWidth
                centered
              />
              <TextField
                id="standard-basic"
                label="Standard"
                fullWidth
                centered
              />
              <TextField
                id="standard-basic"
                label="Standard"
                fullWidth
                centered
              />
              <TextField
                id="standard-basic"
                label="Standard"
                fullWidth
                centered
              />{" "}
              <Button
                className={classes.topSpacing}
                variant="contained"
                color="primary"
                fullWidth
              >
                Primary
              </Button>
            </form>
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Registration;
