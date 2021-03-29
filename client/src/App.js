import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CartScreen from "./screens/CartScreen/CartScreen";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen/ShippingScreen";
import LoginScreen from "./screens/UserScreen/LoginScreen";
import RegisterScreen from "./screens/UserScreen/RegisterScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/product/:id" component={ProductScreen} />
        <Route path="/cart/:productId?" component={CartScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/shipping" component={ShippingScreen} />
        <Route path="/payment" component={PaymentScreen} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
