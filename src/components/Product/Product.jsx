import React from 'react';
import './Product.css'
const Product = (props) => {
    const { name, img, quantity, shipping, price } = props.product;
    console.log(props.product);
    return (
      <div className="product">
            <img src={img} alt="" />
            <h5>{ name}</h5>
      </div>
    );
};

export default Product;