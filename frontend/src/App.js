

// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Chat from './pages/Chat';
import ProductDetail from './pages/ProductDetail'; // Import the new product detail page
import './App.css';

function App() {
  const [cart, setCart] = useState([]); // Shared cart state

  // Function to add a product to the cart
  const handleAddToCart = (product) => {
    axios.post('http://localhost:5000/cart', product).then((response) => setCart(response.data.cart));
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = (sku) => {
    axios.delete('http://localhost:5000/cart', { data: { sku } }).then((response) => setCart(response.data.cart));
  };

  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/chat">Chat</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home handleAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/product/:sku" element={<ProductDetail />} /> {/* Add route for product details */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
