import React from 'react';
import './Product.css'
const Product = (props) => {
    const { name, img, quantity, shipping, price, seller, ratings } =
      props.product;
    console.log(props.product);
    return (
      <div className="product">
        <img src={img} alt="" />
        <div className='product-info'>
          <h5 className="product-name">{name}</h5>
          <p>Price : ${price}</p>
          <p>Manufacturer : {seller}</p>
          <p>
            Rating : {ratings} <i class="fa-solid fa-star fa-spin"></i>
          </p>
        </div>
        <button className='btn-cart'>
          Add to Cart <i class="fa-solid fa-cart-plus fa-bounce"></i>
        </button>
      </div>
    );
};

export default Product;