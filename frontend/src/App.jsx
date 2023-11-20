import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
