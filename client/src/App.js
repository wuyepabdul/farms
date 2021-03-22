import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProductScreen from "./screens/ProductScreen/ProductScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/product/:id" component={ProductScreen} />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
