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
    const savedCart = [];
    //  step 1;
    for (const id in storedCard) {
      // console.log(id)
      //  steps 2 get the product by id
      const addedProduct = products.find(product => product.id === id)
      // console.log(addedProduct);
      if (addedProduct) {
        // step -3 get quantity of the product
        const quantity = storedCard[id];
        addedProduct.quantity = quantity;
        // step - 4 add the added product to the saved cart  
        savedCart.push(addedProduct);
      }

    }
    console.log(storedCard);
    // step-5 set the card
    setCart(savedCart);
  }, [products])
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