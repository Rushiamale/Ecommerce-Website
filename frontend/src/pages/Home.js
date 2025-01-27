

// pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate after search

function Home({ handleAddToCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // useNavigate hook to navigate to product page

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = searchQuery.trim()
        ? await axios.get(`http://localhost:5000/search?query=${searchQuery}`)
        : await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products whenever the search query changes
  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  // Handle the search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/product/${searchQuery.trim()}`); // Navigate to the product page by SKU or Title
    }
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by SKU or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="products">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <div className="product" key={product.Handle}>
              <img src={product['Image Src']} alt={product.Title} />
              <h3>{product.Title}</h3>
              <p>{product.Body}</p>
              <p>Price: ${product['Variant Price']}</p> {/* Display Price */}
              <button
                // onClick={() =>
                //   handleAddToCart({ sku: product['Variant SKU'], title: product.Title })
                // }

                onClick={() =>
                    handleAddToCart({
                      sku: product['Variant SKU'],
                      title: product.Title,
                      image: product['Image Src'],
                      price: product['Variant Price'],
                    })
                  }

              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
