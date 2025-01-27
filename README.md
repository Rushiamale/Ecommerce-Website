
---

# Full-Stack E-Commerce Application

This project is a full-stack e-commerce platform that allows users to search for products, add items to their cart, view product details, and interact with a chatbot.

## Features

- **Product Search**: Search products by SKU or Title.
- **Add to Cart**: Add products to the cart and view them.
- **Product Details**: View detailed information for each product.
- **Chatbot**: Ask a chatbot questions regarding products and queries like shipping, return policies, etc.

## Technologies

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Styling**: CSS

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rushiamale/Ecommerce-Website.git
cd Ecommerce-Website
```

### 2. Install dependencies

#### Frontend (Client)
1. Navigate to the `client` directory:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```

#### Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```

### 3. Run the application

#### Start the Backend:
1. Navigate to the `server` folder and run:
   ```bash
   node server.js
   ```

   The server will be running on `http://localhost:5000`.

#### Start the Frontend:
1. Navigate to the `client` folder and run:
   ```bash
   npm start
   ```

   The client will be running on `http://localhost:3000`.

## API Endpoints

### **GET** `/products`
- Fetch all products from the database.

### **GET** `/products/:sku`
- Fetch product details by SKU or Title.

### **GET** `/search`
- Search products by SKU or Title based on a query parameter.

### **POST** `/cart`
- Add a product to the shopping cart.

### **DELETE** `/cart`
- Remove a product from the shopping cart.

### **POST** `/chat`
- Interact with the chatbot. Send queries related to products.

## Frontend Pages

- **Home Page**: Displays a list of products with an option to search and add them to the cart.
- **Cart Page**: Shows the items added to the cart, with an option to remove them.
- **Product Detail Page**: Displays detailed information of a specific product.
- **Chat Page**: Allows users to interact with the chatbot for queries.



