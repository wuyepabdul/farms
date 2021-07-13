import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import OrderScreen from "./screens/OrderScreen/OrderScreen";
import OrderScreenBackup from "./screens/OrderScreen/OrderScreenBackup";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceorderScreen/PlaceorderScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import UserListScreen from "./screens/UserListScreen/UserListScreen";
import UserEditScreen from "./screens/UserEditScren/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen/OrderListScreen";
import Navbar from "./components/Header/Navbar";
import Landing from "./screens/HomeScreen/Landing";
import Registration from "./screens/Registration/Registration";
import PaystackCheckout from "./screens/OrderScreen/PaystackCheckout";
import PaystackBtn from "./screens/Paystack/PaystackBtn";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/landing" component={Landing} />
        <Route exact path="/reg" component={Registration} />
        <Route exact path="/" component={HomeScreen} />

        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/admin/userList" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/placeorder" component={PlaceOrderScreen} />
        <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
        <Route path="/admin/productlist" component={ProductListScreen} exact />
        <Route
          path="/admin/productlist/:pageNumber"
          component={ProductListScreen}
          exact
        />
        {/* <Route path="/order/:id" component={OrderScreenBackup} /> */}
        <Route path="/order/:id" component={OrderScreen} />
        <Route path="/admin/orderlist" component={OrderListScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:productId?" component={CartScreen} />
        <Route path="/search/:keyword" component={HomeScreen} exact />
        <Route path="/page/:pageNumber" component={HomeScreen} exact />
        <Route
          path="/search/:keyword/page/:pageNumber"
          component={HomeScreen}
          exact
        />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
