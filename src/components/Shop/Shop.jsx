import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
    useEffect(() => {
        fetch("products.json")
            .then((res) => res.json())
            .then((data) => {
                 setProducts(data);
                //  console.log(data)
            });
    }, [])
  useEffect(() => {
    const storedCard = getShoppingCart()
    console.log(storedCard);
  }, [])
   const handleAddToCart = (product) => {
    //  console.log(product);
     const newCart = [...cart, product]
     setCart(newCart)
      addToDb(product.id)
   };
    return (
      <div className="shop-container">
        <div className="products-container">
          {/* <h3>Products are coming : {products.length}</h3> */}
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart}></Cart>
        </div>
      </div>
    );
};

export default Shop;