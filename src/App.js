import React, { useState } from 'react';

// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10.00 },
  { id: 2, name: "Product 2", price: 20.00 },
  { id: 3, name: "Product 3", price: 30.00 }
];

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Increment quantity if product already exists in cart
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Function to increase quantity of a product in the cart
  const increaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease quantity of a product in the cart
  const decreaseQuantity = (productId) => {
    setCart(cart.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cost
  const totalCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div>
      <h1>E-commerce Cart Management System</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <span>{product.name} - ${product.price.toFixed(2)}</span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name} - ${item.price.toFixed(2)} x {item.quantity}</span>
          <button onClick={() => increaseQuantity(item.id)}>+</button>
          <button onClick={() => decreaseQuantity(item.id)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <div>
        Total: ${totalCost.toFixed(2)}
      </div>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
