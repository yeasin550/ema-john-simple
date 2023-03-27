import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
    // const cart = props.cart;  // option -1
    // const { cart } = props; // option -2
    console.log(cart)
    let totalPrice = 0;
    let totalShipping = 0;
    for (const product of cart) {
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
      <div className="cart">
        <h3>Order Summary</h3>
        <p>Selected Items: {cart.length}</p>
        <p>
          Total Price: <i class="fa-solid fa-dollar-sign"></i> {totalPrice}
        </p>
        <p>Total Shipping Charge: {totalShipping} </p>
        <p>
          Tax: <i class="fa-solid fa-dollar-sign"></i> {tax.toFixed(2)}
        </p>
        <h3>
          Grand Total: <i class="fa-solid fa-dollar-sign fa-flip"></i>
          {grandTotal.toFixed(2)}
        </h3>
        <div className="button-container">
          <button className="button-1">Clear Cart</button> <br />
          <button className="button-2">Review Order</button>
        </div>
      </div>
    );
};

export default Cart;