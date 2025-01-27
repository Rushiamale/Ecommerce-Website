// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb://127.0.0.1:27017/orderingDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

// Define proM Oduct schema and model
const productSchema = new mongoose.Schema({
  Handle: String,
  Title: String,
  Body: String,
  Vendor: String,
  Type: String,
  Tags: String,
  "Option1 Name": String,
  "Option1 Value": String,
  "Variant SKU": String,
  "Variant Price": Number,
  "Image Src": String,
});

const Product = mongoose.model('Product', productSchema);

// In-memory shopping cart
let shoppingCart = [];

// Routes
// Fetch all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});



// Add item to cart
app.post('/cart', (req, res) => {
  const { sku, title, image, price } = req.body;
  const item = shoppingCart.find((item) => item.sku === sku);
  if (!item) shoppingCart.push({ sku, title, image, price });
  res.json({ message: 'Item added to cart', cart: shoppingCart });
});


// Remove item from cart
app.delete('/cart', (req, res) => {
  const { sku } = req.body;
  shoppingCart = shoppingCart.filter((item) => item.sku !== sku);
  res.json({ message: 'Item removed from cart', cart: shoppingCart });
});

//Search products by SKU or Title
app.get('/search', async (req, res) => {
  const { query } = req.query;
  const results = await Product.find({
    $or: [{ "Variant SKU": { $regex: query, $options: 'i' } }, { Title: { $regex: query, $options: 'i' } }],
  
  });
  res.json(results);
});


// Fetch product by SKU or Title
app.get('/products/:sku', async (req, res) => {
  const { sku } = req.params;
  const product = await Product.findOne({
    $or: [{ "Variant SKU": sku }, { Title: sku }],
  });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Chat interface for queries
app.post('/chat', async (req, res) => {
  const { query } = req.body;
  const results = await Product.find({
    $or: [{ "Variant SKU": { $regex: query, $options: 'i' } }, { Title: { $regex: query, $options: 'i' } }],
  });
  res.json({ message: 'Query results', results });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
