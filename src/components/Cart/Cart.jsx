import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
    // const cart = props.cart;  // option -1
    // const { cart } = props; // option -2
    console.log(cart)
    let totalPrice = 0;
  let totalShipping = 0;
  let quantity = 0;
  for (const product of cart) {
    // step-1
    if (product.quantity === 0) {
      product.quantity = 1;
    }
    // step-2 short cut
    // product.quantity = product.quantity || 1;

        totalPrice = totalPrice + product.price * product.quantity;
      totalShipping = totalShipping + product.shipping;
      quantity = quantity + product.quantity;
    }
    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax;
    return (
      <div className="cart">
        <h3>Order Summary</h3>
        <p>Selected Items: {quantity}</p>
        <p>
          Total Price: $ {totalPrice}
        </p>
        <p>Total Shipping Charge: {totalShipping} </p>
        <p>
          Tax: $ {tax.toFixed(2)}
        </p>
        <h3>
          Grand Total: $
          {grandTotal.toFixed(2)}
        </h3>
        <div className="button-container">
          <button className="button-1">
            Clear Cart <i class="fa-solid fa-trash-can"></i>
          </button>
          <br />
          <button className="button-2">
            Review Order <i class="fa-solid fa-arrow-right fa-xl"></i>
          </button>
        </div>
      </div>
    );
};

export default Cart;