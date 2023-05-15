import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
const Orders = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemoveFromCart = (id) => {
    const remaining = cart.filter(product => product._id !== id);
    setCart(remaining)
    removeFromDb(id)
  }
  const handleClearCart = () => {
    setCart([])
    deleteShoppingCart()
    }
  
  // console.log(savedCart)
  
    return (
      <div className="shop-container">
        <div className="review-container">
          {cart.map((product) => (
            <ReviewItem
              key={product._id}
              handleRemoveFromCart={handleRemoveFromCart}
              product={product}
            ></ReviewItem>
          ))}
        </div>
        <div className="cart-container">
          <Cart handleClearCart={handleClearCart} cart={cart}>
            <Link className="proceed-link" to="/checkout">
              <button className="button-clear">Proceed Checkout</button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Orders;