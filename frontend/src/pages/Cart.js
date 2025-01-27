
import React from 'react';

function Cart({ cart, handleRemoveFromCart }) {
  return (
    <div>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.sku}>
            <div className="cart-item-info">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <button onClick={() => handleRemoveFromCart(item.sku)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
