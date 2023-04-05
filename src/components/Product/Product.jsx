import React from 'react';
import './Product.css'
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
 import { faDollar } from "@fortawesome/free-solid-svg-icons";
 import { faStar } from "@fortawesome/free-solid-svg-icons";
const Product = (props) => {
    const { name, img, quantity, stock, shipping, price, seller, ratings } =
    props.product;
  const handleAddToCart = props.handleAddToCart;
  // console.log(props.product);

    return (
      <div className="product">
        <img src={img} alt="" />
        <div className="product-info">
          <h5 className="product-name">{name}</h5>
          <p>
            Price : $
            {price}
          </p>
          <p>Manufacturer : {seller}</p>
          <p>
            Rating : {ratings} <i class="fa-solid fa-star "></i>
          </p>
          <p>Shipping : {shipping}</p>
          <p>Stock : {stock}</p>
        </div>
        <button
          onClick={() => handleAddToCart(props.product)}
          className="btn-cart"
        >
          Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
        </button>
      </div>
    );
};

export default Product;