import { Slider } from '@mui/material';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Amazon from "./components/amazon";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import ProductDetails from "./components/ProductDetails";
import list from './data';

const App = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState(list);

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].amount += d;

    if (arr[ind].amount === 0) arr[ind].amount = 1;
    setCart([...arr]);
  };

  return (
    <BrowserRouter>
      <Navbar setShow={setShow} size={cart.length} />
      <Routes>
        <Route exact path="/" element={
          show ? (
            <Amazon handleClick={handleClick} products={products} />
          ) : (
            <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
          )
        } />
        <Route path="/product/:id" element={<ProductDetails handleClick={handleClick} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} handleChange={handleChange} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;