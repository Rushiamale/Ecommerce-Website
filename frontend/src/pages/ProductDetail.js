// pages/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams to access the SKU from the URL
import axios from 'axios';

function ProductDetail() {
  const { sku } = useParams(); // Get SKU or title from URL params
  const [product, setProduct] = useState(null);

  // Fetch product details based on SKU
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${sku}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetail();
  }, [sku]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{product.Title}</h1>
      <img src={product['Image Src']} alt={product.Title} />
      <p>{product.Body}</p>
      <p>Price: ${product['Variant Price']}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
