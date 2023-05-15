import React from 'react';
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import './ReviewItem.css'
const ReviewItem = ({ product, handleRemoveFromCart }) => {
  const { _id, img, name, price, quantity } = product;
  return (
    <div className="review-item">
      <img src={img} alt="" />
      <div className="review-detail">
        <p className="product-title">{name}</p>
        <p>
          Price : <span className="price">${price}</span>
        </p>
        <p>
          Order Quantity : <span className="price">${quantity}</span>
        </p>
      </div>
      <button onClick={() => handleRemoveFromCart(_id)} className="btn-delete">
        <FontAwesomeIcon className="delete-icon" icon={faTrashAlt} />
      </button>
    </div>
  );
};

export default ReviewItem;